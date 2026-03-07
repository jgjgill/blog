/**
 * 예제 09: render props 패턴 — 개념부터 리렌더링 최적화까지
 */
import { useRef, useState } from "react";
import { useForm as useRHF, useWatch } from "react-hook-form";
import { useForm as useTanStack } from "@tanstack/react-form";

// ─────────────────────────────────────────────
// 1. render props란?
// ─────────────────────────────────────────────
// "무엇을 렌더링할지를 함수로 받는 패턴"
//
// 컴포넌트가 데이터/상태를 갖고, 그걸 어떻게 보여줄지는 외부에서 결정.
// children이나 prop으로 함수를 받아서 호출.

// 간단한 예시: 마우스 위치를 추적하는 컴포넌트
function MouseTracker({ children }: { children: (x: number, y: number) => React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div
      style={{ height: 80, background: "#f3f4f6", borderRadius: 4, cursor: "crosshair" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top) });
      }}
    >
      {/* 상태(x, y)를 갖고 있고, 어떻게 보여줄지는 children 함수에게 위임 */}
      {children(pos.x, pos.y)}
    </div>
  );
}

// ─────────────────────────────────────────────
// 2. render props의 리렌더링 범위
// ─────────────────────────────────────────────
// render props의 핵심 특징:
// children 함수를 호출하는 쪽(MouseTracker)이 리렌더링될 때
// children 함수도 다시 실행되지만,
// children 함수를 "소유한" 부모 컴포넌트는 리렌더링되지 않는다.

function RenderPropsScope() {
  const parentRenderCount = useRef(0);
  parentRenderCount.current++;

  return (
    <div>
      <h3>render props의 리렌더링 범위</h3>
      <p className="render-count">
        부모 렌더링: {parentRenderCount.current}회 — 마우스를 올려도 안 바뀜
      </p>

      <MouseTracker>
        {(x, y) => (
          // 이 함수는 MouseTracker 내부에서 실행됨
          // MouseTracker가 리렌더링될 때 이 함수도 재실행되지만
          // 부모 컴포넌트(RenderPropsScope)는 관여하지 않음
          <p style={{ padding: "0.5rem" }}>마우스 위치: {x}, {y}</p>
        )}
      </MouseTracker>
    </div>
  );
}

// ─────────────────────────────────────────────
// 3. RHF watch vs TanStack Subscribe — 리렌더링 비교
// ─────────────────────────────────────────────

// RHF: watch는 훅 → 호출한 컴포넌트 전체가 리렌더링
function RHFWatchExample() {
  const parentRenderCount = useRef(0);
  parentRenderCount.current++;

  const { register, control } = useRHF({
    defaultValues: { email: "", note: "" },
  });

  // watch를 훅으로 호출 → 이 컴포넌트 전체가 email 변경마다 리렌더링
  const email = useWatch({ control, name: "email" });

  return (
    <div style={{ background: "#fef2f2", padding: "0.75rem", borderRadius: 4 }}>
      <strong>RHF useWatch</strong>
      <p className="render-count">
        부모 렌더링: <span className="highlight">{parentRenderCount.current}</span>회
        <br />
        👆 email 타이핑 시 증가
      </p>
      <label>
        이메일 (watch 중)
        <input {...register("email")} />
        <span className="info"> 현재: {email}</span>
      </label>
      <label>
        메모 (watch 없음인데도 부모 리렌더링 시 같이 렌더링)
        <input {...register("note")} />
      </label>
    </div>
  );
}

// TanStack: Subscribe는 render props → children 함수만 재실행
function TanStackSubscribeExample() {
  const parentRenderCount = useRef(0);
  parentRenderCount.current++;

  const form = useTanStack({
    defaultValues: { email: "", note: "" },
    onSubmit: async () => {},
  });

  return (
    <div style={{ background: "#f0fdf4", padding: "0.75rem", borderRadius: 4 }}>
      <strong>TanStack form.Subscribe</strong>
      <p className="render-count">
        부모 렌더링: <span className="highlight">{parentRenderCount.current}</span>회
        <br />
        👆 어떤 필드를 타이핑해도 안 바뀜
      </p>

      <form.Field name="email">
        {(field) => (
          <label>
            이메일
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </label>
        )}
      </form.Field>

      <form.Field name="note">
        {(field) => (
          <label>
            메모
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </label>
        )}
      </form.Field>

      {/* render props: email이 바뀔 때 이 children 함수만 재실행 */}
      <form.Subscribe selector={(state) => state.values.email}>
        {(email) => (
          <span className="info">현재: {email}</span>
        )}
      </form.Subscribe>
    </div>
  );
}

// ─────────────────────────────────────────────
// 메인
// ─────────────────────────────────────────────
export function RenderProps() {
  return (
    <div className="card">
      <h2>render props 패턴</h2>

      <h3>1. render props 기본 개념</h3>
      <p className="info">
        "무엇을 렌더링할지를 함수로 위임받는 패턴"
        <br />
        컴포넌트가 상태를 갖고, 그 상태를 어떻게 보여줄지는 children 함수가 결정.
      </p>
      <MouseTracker>
        {(x, y) => <p style={{ padding: "0.5rem" }}>📍 {x}, {y} — 영역 안에서 마우스를 움직여보세요</p>}
      </MouseTracker>

      <pre style={{ marginTop: "0.5rem" }}>{`// render props 구조
function MouseTracker({ children }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return <div onMouseMove={...}>{children(pos.x, pos.y)}</div>;
  //                             ↑ 상태를 인자로 넘겨 children 함수 호출
}

// 사용: 어떻게 보여줄지는 호출자가 결정
<MouseTracker>
  {(x, y) => <p>{x}, {y}</p>}
</MouseTracker>`}</pre>

      <h3>2. render props의 리렌더링 범위</h3>
      <RenderPropsScope />

      <h3>3. RHF watch vs TanStack Subscribe</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <RHFWatchExample />
        <TanStackSubscribeExample />
      </div>

      <pre style={{ marginTop: "0.75rem" }}>{`// RHF: watch는 훅 → 컴포넌트 전체 리렌더링
function Form() {
  const email = useWatch({ name: "email" }); // 훅
  // email 바뀌면 Form 전체 리렌더링
  return <div><HeavyComponent />{email}</div>;
}

// TanStack: Subscribe는 render props → children만 재실행
function Form() {
  return (
    <div>
      <HeavyComponent /> {/* email 바뀌어도 무관 */}
      <form.Subscribe selector={(s) => s.values.email}>
        {(email) => <span>{email}</span>} {/* 이것만 재실행 */}
      </form.Subscribe>
    </div>
  );
}`}</pre>
    </div>
  );
}
