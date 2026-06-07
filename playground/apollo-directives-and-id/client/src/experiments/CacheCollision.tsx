import { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery, useApolloClient } from '@apollo/client/react';

// 실험 3 — 문제 재현.
// feed(offset, limit) 는 페이지네이션 인자가 "쿼리에" 있다 → 캐시 칸 ID 에 들어간다.
// 하지만 탭(popular/recent)은 헤더 x-tab 으로 들어가 쿼리에 안 드러난다 → 칸 ID 에 안 들어간다.
//
// 결과: 같은 offset 의 popular 페이지와 recent 페이지가
//       같은 칸 feed({offset,limit}) 을 가리켜 서로 덮어쓴다.
const FEED = gql`
  query Feed($offset: Int!, $limit: Int!) {
    feed(offset: $offset, limit: $limit) {
      id
      title
    }
  }
`;

interface Post {
  id: string;
  title: string;
}

function FeedPanel({ tab }: { tab: 'popular' | 'recent' }) {
  const [offset, setOffset] = useState(0);
  const { data, loading } = useQuery<{ feed: Post[] }>(FEED, {
    variables: { offset, limit: 2 },
    context: { tab }, // → x-tab 헤더로 나감 (쿼리엔 안 드러남)
    fetchPolicy: 'cache-first',
    notifyOnNetworkStatusChange: true,
  });

  return (
    <div>
      <h3>
        {tab} 탭 (헤더 x-tab: {tab})
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

export function CacheCollision() {
  const client = useApolloClient();

  return (
    <section>
      <h2>실험 3 — 헤더로만 구분되는 탭 → 캐시 덮어쓰기</h2>
      <p className="hint">
        두 탭 모두 <strong>같은 feed 쿼리</strong>를 보냅니다. 다른 것은 헤더{' '}
        <code>x-tab</code> 뿐이고, 이 값은 쿼리 문서에 안 드러납니다.
        <br />
        페이지 인자 <code>offset/limit</code> 은 쿼리에 있어 캐시 칸 ID 에 들어가지만,{' '}
        <strong>tab 은 헤더라 들어가지 않습니다.</strong>
        <br />
        👉 두 패널을 모두 <code>offset 0</code> 으로 두면, 같은 칸{' '}
        <code>feed({'{'}"offset":0,"limit":2{'}'})</code> 를 공유해 서로 덮어씁니다.
        한 패널을 다시 보면 다른 탭 내용으로 바뀌어 있습니다.
        <br />
        👉 Devtools Cache 탭에서 <code>ROOT_QUERY</code> 아래 offset 별 칸은 있어도{' '}
        tab 구분 칸은 <strong>없는 것</strong>을 확인하세요.
      </p>

      <button onClick={() => console.log(client.cache.extract())}>
        캐시 스냅샷 콘솔 출력
      </button>

      <div className="panel">
        <FeedPanel tab="popular" />
        <FeedPanel tab="recent" />
      </div>
    </section>
  );
}
