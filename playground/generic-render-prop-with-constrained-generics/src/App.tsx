import { ComponentType, useState } from "react";
import { Problem } from "./examples/01-problem";
import { ApproachUnion } from "./examples/02-approach-union";
import { ApproachSplit } from "./examples/03-approach-split";
import { ApproachRenderProp } from "./examples/04-approach-render-prop";

type ExampleKey =
  | "01-problem"
  | "02-union"
  | "03-split"
  | "04-render-prop";

const EXAMPLES: { key: ExampleKey; label: string; component: ComponentType }[] =
  [
    { key: "01-problem", label: "01 문제 상황", component: Problem },
    { key: "02-union", label: "02 1안: union 타입", component: ApproachUnion },
    { key: "03-split", label: "03 2안: 컴포넌트 분리", component: ApproachSplit },
    { key: "04-render-prop", label: "04 3안: Render Prop (채택)", component: ApproachRenderProp },
  ];

export default function App() {
  const [active, setActive] = useState<ExampleKey>("01-problem");
  const current = EXAMPLES.find((e) => e.key === active)!;

  return (
    <div>
      <h1>Generic Render Prop Playground</h1>
      <p className="info" style={{ marginBottom: "1rem" }}>
        서로 다른 타입, 하나의 컴포넌트 — 4가지 접근을 직접 비교하기
      </p>

      <nav>
        {EXAMPLES.map((ex) => (
          <button
            key={ex.key}
            className={active === ex.key ? "active" : ""}
            onClick={() => setActive(ex.key)}
            type="button"
          >
            {ex.label}
          </button>
        ))}
      </nav>

      <current.component />
    </div>
  );
}
