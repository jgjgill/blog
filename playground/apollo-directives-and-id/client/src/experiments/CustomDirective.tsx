import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

// custom directive @uppercase 는 "서버 스키마"에 구현돼 있다.
// (server/src/index.js 의 upperCaseDirectiveTransformer 참고)
// Author.name 필드에 @uppercase 가 붙어 있어, 서버가 결과를 대문자로 변형해 내려준다.
// → 클라이언트는 아무 것도 안 해도 name 이 대문자로 온다. (directive 는 서버에서 실행)
const QUERY = gql`
  query AuthorsRaw {
    authors {
      id
      name # 서버 스키마에서 @uppercase 가 붙은 필드
    }
  }
`;

interface Author {
  id: string;
  name: string;
}

export function CustomDirective() {
  const { data, loading } = useQuery<{ authors: Author[] }>(QUERY);

  return (
    <section>
      <h2>실험 2 — custom directive @uppercase</h2>
      <p className="hint">
        쿼리에는 <code>name</code> 만 평범하게 요청했는데, 결과의 name 이{' '}
        <strong>대문자</strong>로 옵니다. <code>@uppercase</code> 는 서버 스키마의
        필드에 붙어 있고, <strong>서버가 실행</strong>해서 변형한 값을 내려주기
        때문입니다. (원본 데이터는 소문자 <code>jonggil</code> / <code>claude</code>)
      </p>

      {loading && <p>로딩…</p>}
      <pre>{JSON.stringify(data?.authors, null, 2)}</pre>
    </section>
  );
}
