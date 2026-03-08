/**
 * 예제 04: TanStack Form 기본 — Store + 구독 모델 체험
 *
 * 앞 예제(03)에서 직접 만든 외부 Store와 같은 원리를
 * TanStack Form이 어떻게 API로 제공하는지 확인하자.
 */
import { useRef } from "react";
import { type AnyFieldApi, useForm } from "@tanstack/react-form";

// render props 안에서 훅을 쓰려면 별도 컴포넌트로 분리해야 함
// children={(field) => { useRef() }} → 콜백 함수, React가 컴포넌트로 인식 안 함
function EmailFieldContent({ field }: { field: AnyFieldApi }) {
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <label>
      이메일
      <span className="render-count"> (렌더링: {renderCount.current}회)</span>
      <input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {field.state.meta.errors[0] && (
        <span className="error">{field.state.meta.errors[0]}</span>
      )}
    </label>
  );
}

function UsernameFieldContent({ field }: { field: AnyFieldApi }) {
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <label>
      유저명
      <span className="render-count"> (렌더링: {renderCount.current}회)</span>
      <input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {field.state.meta.isTouched && field.state.meta.errors[0] && (
        <span className="error">{field.state.meta.errors[0]}</span>
      )}
    </label>
  );
}

function AgeFieldContent({ field }: { field: AnyFieldApi }) {
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <label>
      나이
      <span className="render-count"> (렌더링: {renderCount.current}회)</span>
      <input
        type="number"
        value={field.state.value}
        onChange={(e) => field.handleChange(Number(e.target.value))}
      />
    </label>
  );
}

export function TanStackBasic() {
  const renderCount = useRef(0);
  renderCount.current++;

  const form = useForm({
    defaultValues: { email: "", username: "", age: 0 },
    onSubmit: async ({ value }) => {
      await new Promise((r) => setTimeout(r, 500));
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <div className="card">
      <h2>TanStack Form 기본</h2>

      <p className="render-count">
        부모 컴포넌트 렌더링: <span className="highlight">{renderCount.current}</span>회
        <br />
        👆 어떤 필드를 타이핑해도 이 숫자는 안 바뀜
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "이메일을 입력하세요"
                : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                  ? "올바른 이메일 형식이 아닙니다"
                  : undefined,
          }}
        >
          {(field) => <EmailFieldContent field={field} />}
        </form.Field>

        <form.Field
          name="username"
          validators={{
            onChange: ({ value }) =>
              value.length < 2 ? "2자 이상 입력하세요" : undefined,
          }}
        >
          {(field) => <UsernameFieldContent field={field} />}
        </form.Field>

        <form.Field name="age">
          {(field) => <AgeFieldContent field={field} />}
        </form.Field>

        <form.Subscribe selector={(state) => state.canSubmit}>
          {(canSubmit) => (
            <button type="submit" disabled={!canSubmit}>
              제출
            </button>
          )}
        </form.Subscribe>
      </form>

      <h3>form.Subscribe — 디버깅</h3>
      <p className="info">selector가 반환하는 값이 바뀔 때만 리렌더링됨</p>
      <form.Subscribe selector={(state) => state.values}>
        {(values) => <pre>{JSON.stringify(values, null, 2)}</pre>}
      </form.Subscribe>
    </div>
  );
}
