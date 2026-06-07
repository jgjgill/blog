import { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

// 실험 4 — 해결.
// 헤더로만 구분되던 tab 을, 클라이언트가 @connection 의 key 에 직접 박아 칸 ID 에 주입한다.
//   @connection(key: "feed:popular")  → 칸 이름이 feed:popular 로 시작
//   @connection(key: "feed:recent")   → 칸 이름이 feed:recent 로 시작
// 그리고 filter:["offset","limit"] 로 페이지 인자를 칸 ID 에 포함시켜,
// 페이지별로 따로 보관되게 한다. (백엔드 스키마는 한 글자도 안 바꿈)
//
// 핵심: tab(쿼리에 없는 구분값)은 key 로, 페이지(쿼리에 있는 인자)는 filter 로 가른다.
const FEED_POPULAR = gql`
  query FeedPopular($offset: Int!, $limit: Int!) {
    feed(offset: $offset, limit: $limit)
      @connection(key: "feed:popular", filter: ["offset", "limit"]) {
      id
      title
    }
  }
`;

const FEED_RECENT = gql`
  query FeedRecent($offset: Int!, $limit: Int!) {
    feed(offset: $offset, limit: $limit)
      @connection(key: "feed:recent", filter: ["offset", "limit"]) {
      id
      title
    }
  }
`;

interface Post {
  id: string;
  title: string;
}

function FeedPanel({
  tab,
  query,
}: {
  tab: 'popular' | 'recent';
  query: typeof FEED_POPULAR;
}) {
  const [offset, setOffset] = useState(0);
  const { data, loading } = useQuery<{ feed: Post[] }>(query, {
    variables: { offset, limit: 2 },
    context: { tab },
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  return (
    <div>
      <h3>
        {tab} 탭 (key: feed:{tab})
      </h3>
      <button onClick={() => setOffset((o) => Math.max(0, o - 2))}>← 이전</button>
      <span> offset {offset} </span>
      <button onClick={() => setOffset((o) => o + 2)}>다음 →</button>
      {loading && <p>로딩…</p>}
      <ul>
        {data?.feed.map((p) => (
          <li key={p.id}>
            {p.id} · {p.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ConnectionFix() {
  return (
    <section>
      <h2>실험 4 — @connection(key, filter) 로 캐시 ID 직접 구성</h2>
      <p className="hint">
        실험 3 과 같은 상황이지만, 각 탭 쿼리의 feed 에{' '}
        <code>@connection(key:"feed:{'{'}tab{'}'}", filter:["offset","limit"])</code> 를
        붙였습니다.
        <br />
        이제 두 탭을 모두 offset 0 으로 둬도 <strong>서로 덮어쓰지 않습니다.</strong>{' '}
        칸 ID 가 <code>feed:popular(...)</code> / <code>feed:recent(...)</code> 로
        갈렸기 때문입니다.
        <br />
        👉 Devtools Cache 탭의 <code>ROOT_QUERY</code> 아래에{' '}
        <code>feed:popular({'{'}...{'}'})</code> 와{' '}
        <code>feed:recent({'{'}...{'}'})</code> 칸이 페이지별로 각각 생긴 것을
        확인하세요.
        <br />
        💡 정리: <strong>tab</strong>(쿼리에 없는 구분값)은 <code>key</code> 로,{' '}
        <strong>페이지</strong>(쿼리에 있는 인자)는 <code>filter</code> 로 칸을 가릅니다.
        백엔드가 안 내려준 캐시 ID 를 클라이언트가 직접 구성한 것입니다.
      </p>

      <div className="panel">
        <FeedPanel tab="popular" query={FEED_POPULAR} />
        <FeedPanel tab="recent" query={FEED_RECENT} />
      </div>
    </section>
  );
}
