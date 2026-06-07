// 실험용 더미 데이터.
//
// 핵심 시나리오 (실제 이슈 재현):
//   feed(offset, limit) 에는 페이지네이션 인자가 "쿼리에" 있다.
//   하지만 탭(popular/recent) 구분은 HTTP "헤더"(x-tab)로 들어와 쿼리에 안 드러난다.
//
//   → offset/limit 은 캐시 칸 ID 에 들어가지만, tab 은 안 들어간다.
//   → 같은 offset 의 popular 페이지와 recent 페이지가 같은 칸을 덮어쓴다. (실험 3)
//
//   해결: 클라이언트가 @connection(key:"feed:<tab>", filter:["offset","limit"]) 로
//   탭을 칸 ID 에 직접 주입하고, 페이지는 따로 보관되게 한다. (실험 4)

export const authors = [
  { id: 'a1', name: 'jonggil', bio: '프론트엔드' },
  { id: 'a2', name: 'claude', bio: 'AI' },
];

// tab 별 목록 (페이지네이션을 보여주기 위해 여러 개씩).
const POSTS = {
  popular: [
    { id: 'p1', title: '[인기] Apollo 캐시 정규화 입문', authorId: 'a1' },
    { id: 'p2', title: '[인기] directives 톺아보기', authorId: 'a1' },
    { id: 'p3', title: '[인기] @connection 실전', authorId: 'a2' },
    { id: 'p4', title: '[인기] filter 로 캐시 ID 구성하기', authorId: 'a1' },
  ],
  recent: [
    { id: 'r1', title: '[최신] ID 가 없으면 생기는 일', authorId: 'a2' },
    { id: 'r2', title: '[최신] TanStack Query vs Apollo', authorId: 'a2' },
    { id: 'r3', title: '[최신] storeFieldName 의 정체', authorId: 'a1' },
    { id: 'r4', title: '[최신] keyArgs 톺아보기', authorId: 'a2' },
  ],
};

// feed(offset, limit) + tab(헤더): tab 목록에서 offset~offset+limit 구간을 잘라 준다.
export function feed({ offset = 0, limit = 2, tab = 'popular' }) {
  const list = POSTS[tab] ?? POSTS.popular;
  return list.slice(offset, offset + limit);
}
