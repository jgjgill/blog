# Apollo directives & ID — 직접 돌려보는 실험실

Apollo Client 의 **directives** 와, 캐시 정규화의 핵심인 **ID(캐시 키)** 를
백엔드(Apollo Server)부터 직접 구성하며 실행으로 이해하는 playground 입니다.

> 이 README 는 **실험 가이드**입니다.
> 각 실험을 직접 돌려보고, Devtools 의 캐시 칸이 어떻게 잡히는지 눈으로 확인하세요.

**한 줄 결론:** Apollo 에서 캐시 칸을 가르는 근거는 결국 **"쿼리에 드러난 인자"** 다.
구분값이 헤더처럼 쿼리에 안 드러나면 캐시가 충돌하고, 이때 클라이언트가
`@connection(key, filter)` 로 **캐시 ID 를 직접 구성**해 해결한다.

---

## 등장 directive 정리

| directive | 종류 | 무엇을 하나 |
|---|---|---|
| `@include(if:)` / `@skip(if:)` | built-in (실행) | 쿼리 문서에서 변수로 필드를 켜고/끈다 |
| `@deprecated(reason:)` | built-in (스키마) | 필드/인자에 "폐기 예정" 표시 (값은 정상) |
| `@uppercase` | **custom (스키마)** | 직접 만든 directive. 서버가 필드 결과를 변형 |
| `@connection(key, filter)` | built-in (캐시) | 클라이언트가 **캐시 칸 ID 를 직접 지정** |

### ID 가 왜 중요한가 (이 실험의 핵심 동기)

- **TanStack Query**: 캐시 key 를 **클라이언트가** 정한다 (`queryKey`). 주도권이 프론트에 있다.
- **Apollo**: 캐시 key 를 **백엔드 스키마의 ID/정규화**에서 내려받는 게 자연스럽다.
  → 백엔드가 ID 를 누락하거나, 구분값이 헤더로만 오면 **프론트가 캐시 키를 통제할 길이 약해진다.**
- 그 틈을 메우는 도구가 `@connection` 이다. (실험 3·4)

---

## 실행 환경

이 디렉토리는 저장소 루트 pnpm workspace 와 **격리**된 독립 workspace 입니다
(이유는 [`pnpm-workspace.yaml`](./pnpm-workspace.yaml) 주석 참고).
`server`(Apollo Server) 와 `client`(React + Apollo Client) 두 패키지로 구성됩니다.

```bash
cd playground/apollo-directives-and-id
pnpm install

# 터미널 1 — GraphQL 서버 (http://localhost:4000)
pnpm --filter apollo-directives-server dev

# 터미널 2 — React 클라이언트 (http://localhost:5173)
pnpm --filter apollo-directives-client dev
```

> 💡 클라이언트를 열면 [**Apollo Client Devtools**](https://www.apollographql.com/docs/react/development-testing/developer-tooling)
> 의 **Cache** 탭을 함께 열어두세요. 실험의 핵심은 거의 다 "캐시 칸이 어떻게 잡히는가"입니다.

각 실험은 화면 상단 탭으로 전환합니다. 출력을 **먼저 예측**한 뒤 실행해서 맞춰보세요.

---

## 실험 1 — @include / @skip / @deprecated (쿼리 단계 directive)

화면: **실험 1** 탭. 체크박스 두 개.

### 확인하는 것

| 조작 | 무엇을 보나 |
|---|---|
| `bio 포함` 끄기 | `@include(if:false)` → 결과에서 `bio` 가 **빠진다** |
| `legacyName 건너뛰기` 켜기 | `@skip(if:true)` → 결과에서 `legacyName` 이 **빠진다** |

### 실행 명령 / 관찰 포인트

- 체크박스를 바꾸면 **같은 쿼리**가 variables 만 달라져 나갑니다. (네트워크 탭에서 확인)
- `@include`/`@skip` 은 **스키마에 선언이 필요 없는** built-in 실행 directive 입니다.
- `legacyName` 은 서버에서 `@deprecated` 로 표시돼 있습니다.
  쿼리는 **여전히 잘 되지만**, Devtools / introspection 에서 폐기 표시로 보입니다.
  (라이브러리의 `useQuery` 일부 오버로드에도 `@deprecated` 가 붙어 IDE 가 취소선을 보여주는 것과 같은 원리)

---

## 실험 2 — custom directive @uppercase (스키마에 직접 구현)

화면: **실험 2** 탭.

### 확인하는 것

| 요청한 것 | 받은 것 |
|---|---|
| `authors { name }` (평범하게) | name 이 **대문자** (`JONGGIL`, `CLAUDE`) |

### 실행 명령 / 관찰 포인트

- 원본 데이터는 소문자(`jonggil`)인데 결과가 대문자입니다.
- `@uppercase` 는 **서버 스키마의 필드**에 붙어 있고, **서버가 실행**해 변형합니다.
  → 구현은 [`server/src/index.js`](./server/src/index.js) 의 `upperCaseDirectiveTransformer`.
  SDL 의 `directive @uppercase on FIELD_DEFINITION` 는 "선언/표식"일 뿐,
  실제 동작은 `mapSchema` 로 스키마를 변형해 넣습니다.
- **핵심**: directive 는 마법이 아니라, 누군가(여기선 서버)가 그 표식을 보고 실행하는 코드일 뿐입니다.

---

## 실험 3 — 헤더로만 구분되는 탭 → 캐시 덮어쓰기 (핵심 문제)

화면: **실험 3** 탭. popular / recent 두 패널, 각각 페이지 이동 버튼.

> 실제 업무 상황: `feed` 에 **페이지네이션 인자(offset/limit)는 쿼리에** 있는데,
> 탭(popular/recent) 구분은 **HTTP 헤더(x-tab)** 로 들어가 쿼리에 안 드러난다.

### 확인하는 것

| 상황 | 캐시 칸 | 결과 |
|---|---|---|
| 두 패널 모두 `offset 0` | `feed({"offset":0,"limit":2})` **하나** | popular / recent 가 **서로 덮어씀** |

### 실행 명령 / 관찰 포인트

- 두 패널을 모두 `offset 0` 으로 둔 뒤, 한 패널을 다시 보세요.
  다른 탭 내용으로 **바뀌어 있습니다.** (뒤에 온 응답이 앞을 덮어씀)
- Devtools Cache 탭 `ROOT_QUERY`: **offset 별 칸은 있어도 tab 구분 칸은 없습니다.**
  → `offset/limit` 은 쿼리 인자라 칸 ID 에 들어가지만, **tab 은 헤더라 안 들어가기** 때문.
- **왜 이런가**: 만약 tab 이 variables(쿼리 인자)로 올라갔다면 Apollo 가 자동으로 칸을 갈라
  애초에 충돌이 안 났습니다. 구분이 **전송 계층(헤더)** 에 있어 캐시 계층이 못 본 것입니다.

---

## 실험 4 — @connection(key, filter) 로 캐시 ID 직접 구성 (해결)

화면: **실험 4** 탭. 실험 3 과 같은 화면이지만 쿼리에 `@connection` 이 붙어 있음.

```graphql
feed(offset: $offset, limit: $limit)
  @connection(key: "feed:popular", filter: ["offset", "limit"]) { ... }
```

### 확인하는 것

| 역할 | 도구 | 결과 칸 |
|---|---|---|
| **tab** (쿼리에 없는 구분값) | `key: "feed:popular"` / `"feed:recent"` | `feed:popular(...)` / `feed:recent(...)` 로 분리 |
| **페이지** (쿼리에 있는 인자) | `filter: ["offset","limit"]` | offset 별로 따로 보관 |

### 실행 명령 / 관찰 포인트

- 이제 두 패널을 모두 `offset 0` 으로 둬도 **서로 덮어쓰지 않습니다.**
- Devtools Cache 탭에 `feed:popular({...})`, `feed:recent({...})` 칸이 **페이지별로 각각** 생깁니다.
- **`filter` 의 의미**: "key 뒤에 어떤 인자들을 붙여 칸 ID 를 완성할지" 고르는 **화이트리스트**.
  - 페이지별로 따로 보관하려면 → `filter` 에 `offset/limit` 을 **넣는다** (이 실험)
  - 무한스크롤처럼 한 칸에 누적하려면 → `filter` 에서 페이지 인자를 **빼고** `merge` 함수를 짝으로 둔다
- **백엔드 스키마는 한 글자도 안 바꿨습니다.** 백엔드가 안 내려준 캐시 ID 를 **클라이언트가 직접 구성**한 것.

> ⚠️ 검증으로 확인한 함정: `@connection(key)` 는 **그 필드에 인자가 있을 때만** 칸 이름을 바꿉니다.
> 인자가 0개인 필드에 `@connection(key)` 만 주면 **무시**됩니다.
> (이 실험에선 `offset/limit` 인자가 있어 `@connection` 이 동작합니다.)
> 인자 없는 필드까지 가르려면 `InMemoryCache` 의 `typePolicies.keyArgs` 가 필요합니다.

---

## 한눈에 정리

```
캐시 칸을 가르는 근거 = 쿼리에 드러난 인자 (기본)
  ├ tab 이 variables 면?        → 자동으로 갈림 (문제 없음)
  ├ tab 이 헤더면?              → 칸 ID 에 안 들어감 → 충돌 (실험 3)
  └ @connection(key, filter)   → 클라이언트가 칸 ID 를 직접 구성 (실험 4)
                                  · key:    쿼리에 없는 구분값(tab)을 ID 에 주입
                                  · filter: 칸 ID 에 포함할 인자 화이트리스트

directive 는 마법이 아니다 — 누군가 그 표식을 보고 실행하는 코드다.
  ├ @include/@skip : Apollo 가 쿼리 단계에서 필드를 넣고 뺀다
  ├ @uppercase     : 서버가 스키마 변형으로 결과를 가공한다
  └ @connection    : 캐시가 storeFieldName(칸 ID)을 짓는 규칙을 바꾼다
```

**TanStack Query vs Apollo 한 줄**: TanStack 은 `queryKey` 로 캐시 주도권이 프론트에 있고,
Apollo 는 ID/정규화가 백엔드 스키마에서 내려온다. 그 주도권을 프론트로 되찾는 도구가
`@connection`(과 `typePolicies`)이다.