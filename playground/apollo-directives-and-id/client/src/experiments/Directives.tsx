import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

// @include / @skip 은 "쿼리 문서"에서 쓰는 실행 directive.
//  - @include(if: $x): x 가 true 일 때만 그 필드를 포함
//  - @skip(if: $x):    x 가 true 일 때 그 필드를 제외
// 둘 다 변수(variables)로 on/off 를 제어한다. 스키마엔 선언이 필요 없다 (built-in).
//
// legacyName 은 서버에서 @deprecated 로 표시된 필드. 값은 정상이지만
// Devtools / introspection 에서 "폐기 예정"으로 보인다. (쿼리는 여전히 됨)
const QUERY = gql`
  query Authors($withBio: Boolean!, $skipLegacy: Boolean!) {
    authors {
      id
      name
      bio @include(if: $withBio)
      legacyName @skip(if: $skipLegacy)
    }
  }
`;

interface Author {
  id: string;
  name: string;
  bio?: string;
  legacyName?: string;
}

export function Directives() {
  const [withBio, setWithBio] = useState(false);
  const [skipLegacy, setSkipLegacy] = useState(true);

  const { data, loading } = useQuery<{ authors: Author[] }>(QUERY, {
    variables: { withBio, skipLegacy },
  });

  return (
    <section>
      <h2>실험 1 — @include / @skip / @deprecated</h2>
      <p className="hint">
        체크박스를 바꾸면 <strong>같은 쿼리</strong>가 변수만 달라져 나갑니다.
        네트워크 탭에서 실제로 전송되는 쿼리 필드가 달라지는 걸 확인하세요.
        <br />
        <code>bio</code> 는 <code>@include(if:)</code>, <code>legacyName</code>{" "}
        은 <code>@skip(if:)</code> 로 제어됩니다.
      </p>

      <label>
        <input
          type="checkbox"
          checked={withBio}
          onChange={(e) => setWithBio(e.target.checked)}
        />
        bio 포함 (@include)
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={skipLegacy}
          onChange={(e) => setSkipLegacy(e.target.checked)}
        />
        legacyName 건너뛰기 (@skip) — legacyName 은 서버에서 @deprecated 표시됨
      </label>

      {loading && <p>로딩…</p>}
      <pre>{JSON.stringify(data?.authors, null, 2)}</pre>
    </section>
  );
}
