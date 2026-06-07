import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';

import { authors, feed } from './data.js';

// ---------------------------------------------------------------------------
// 스키마(SDL)
// ---------------------------------------------------------------------------
// 등장 directive 정리:
//  - @deprecated : built-in. 필드/인자에 "폐기 예정" 표시. introspection 에 노출됨.
//  - @skip / @include : built-in. "쿼리 문서 쪽"에서 쓰는 실행 directive (스키마엔 선언 불필요).
//  - @uppercase : 아래에서 직접 만든 custom schema directive. 필드 결과를 대문자로 변형.
const typeDefs = /* GraphQL */ `
  # custom directive 는 SDL 에 먼저 "선언" 해야 쓸 수 있다.
  directive @uppercase on FIELD_DEFINITION

  type Author {
    id: ID!
    name: String! @uppercase
    bio: String
    # 폐기 예정 필드 예시 — introspection/Devtools 에서 취소선으로 보인다.
    legacyName: String @deprecated(reason: "name 을 쓰세요")
  }

  type Post {
    id: ID!
    title: String!
    author: Author!
  }

  type Query {
    authors: [Author!]!
    # feed 에는 페이지네이션 인자(offset/limit)가 "쿼리에" 있다.
    # 반면 어떤 탭(popular/recent)인지는 HTTP 헤더 x-tab 으로 들어와 쿼리에 안 드러난다.
    # → offset/limit 은 캐시 칸 ID 에 들어가지만, tab 은 안 들어간다. 실험 3·4 의 핵심.
    feed(offset: Int = 0, limit: Int = 2): [Post!]!
  }
`;

// ---------------------------------------------------------------------------
// 리졸버
// ---------------------------------------------------------------------------
const resolvers = {
  Query: {
    authors: () => authors,
    // offset/limit 은 쿼리 인자로, tab 은 context(헤더)로 받아 목록을 자른다.
    feed: (_parent, { offset, limit }, context) =>
      feed({ offset, limit, tab: context.tab }),
  },
  Post: {
    author: (post) => authors.find((a) => a.id === post.authorId),
  },
  Author: {
    legacyName: (author) => author.name,
  },
};

// ---------------------------------------------------------------------------
// custom directive 구현: @uppercase
// ---------------------------------------------------------------------------
// SDL 의 @uppercase 는 "표식"일 뿐, 동작은 우리가 스키마를 변형(transform)해서 넣는다.
// mapSchema 로 모든 필드를 훑으며 @uppercase 가 붙은 필드의 resolve 를 감싼다.
function upperCaseDirectiveTransformer(schema) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, 'uppercase')?.[0];
      if (!directive) return fieldConfig;

      const { resolve = defaultFieldResolver } = fieldConfig;
      fieldConfig.resolve = async (source, args, context, info) => {
        const result = await resolve(source, args, context, info);
        return typeof result === 'string' ? result.toUpperCase() : result;
      };
      return fieldConfig;
    },
  });
}

let schema = makeExecutableSchema({ typeDefs, resolvers });
schema = upperCaseDirectiveTransformer(schema);

const server = new ApolloServer({ schema });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  // 요청마다 HTTP 헤더 x-tab 을 읽어 context.tab 으로 넘긴다.
  // 이 값은 GraphQL 쿼리 문서에 드러나지 않는, "전송 계층의 구분값"이다.
  context: async ({ req }) => ({ tab: req.headers['x-tab'] }),
});

console.log(`🚀  GraphQL 서버: ${url}`);
