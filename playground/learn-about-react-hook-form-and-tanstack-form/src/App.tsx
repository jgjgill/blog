import { ComponentType, useState } from "react";
import { RHFBasic } from "./examples/01-rhf-basic";
import { RHFWatch } from "./examples/02-rhf-watch";
import { ExternalStore } from "./examples/03-external-store";
import { TanStackBasic } from "./examples/04-tanstack-basic";
import { RenderProps } from "./examples/05-render-props";
import { GenericsVsInference } from "./examples/06-generics-vs-inference";

type ExampleKey =
  | "01-rhf-basic"
  | "02-rhf-watch"
  | "03-external-store"
  | "04-tanstack-basic"
  | "05-render-props"
  | "06-generics";

const EXAMPLES: { key: ExampleKey; label: string; component: ComponentType }[] =
  [
    { key: "01-rhf-basic", label: "01 RHF 기본", component: RHFBasic },
    { key: "02-rhf-watch", label: "02 RHF watch", component: RHFWatch },
    { key: "03-external-store", label: "03 외부 Store 원리", component: ExternalStore },
    { key: "04-tanstack-basic", label: "04 TanStack 기본", component: TanStackBasic },
    { key: "05-render-props", label: "05 render props", component: RenderProps },
    { key: "06-generics", label: "06 제네릭 vs 추론", component: GenericsVsInference },
  ];

export default function App() {
  const [active, setActive] = useState<ExampleKey>("01-rhf-basic");
  const current = EXAMPLES.find((e) => e.key === active)!;

  return (
    <div>
      <h1>Form Library Playground</h1>
      <p className="info" style={{ marginBottom: "1rem" }}>
        RHF vs TanStack Form — 직접 실행하며 비교하기
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
