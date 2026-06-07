import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';

// 서버로 보내는 HttpLink. 기본 엔드포인트는 standalone 서버.
const httpLink = new HttpLink({ uri: 'http://localhost:4000/' });

// operation 의 context.tab 값을 HTTP 헤더 x-tab 으로 실어보내는 링크.
// 각 실험에서 useQuery(..., { context: { tab: 'popular' } }) 처럼 넘기면
// 같은 쿼리라도 다른 헤더로 나가게 된다. (쿼리 문서는 동일!)
const tabHeaderLink = new SetContextLink((prevContext) => {
  const tab = prevContext.tab;
  return {
    headers: {
      ...prevContext.headers,
      ...(tab ? { 'x-tab': tab } : {}),
    },
  };
});

export function createClient() {
  return new ApolloClient({
    link: tabHeaderLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}
