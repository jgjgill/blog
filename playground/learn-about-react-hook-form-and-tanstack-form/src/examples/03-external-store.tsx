/**
 * 예제 03: 외부 Store 직접 만들기 — TanStack Form의 핵심 원리
 *
 * TanStack Form이 내부적으로 하는 일을 직접 구현해보자.
 * "React 바깥에 Store를 두고, 구독한 컴포넌트만 리렌더링"
 */
import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────
// 1. 순수 TypeScript Store (React와 무관)
// ─────────────────────────────────────────────
type StoreState = {
  values: {
    email: string;
    username: string;
    age: number;
  };
};

type Listener = (state: StoreState) => void;

function createStore(initialState: StoreState) {
  let state = initialState;
  const listeners = new Set<Listener>();

  return {
    // 현재 상태 읽기
    getState: () => state,

    // 특정 필드 값 읽기
    getFieldValue: <K extends keyof StoreState["values"]>(
      field: K
    ): StoreState["values"][K] => state.values[field],

    // 상태 변경 → 모든 구독자에게 알림
    setFieldValue: <K extends keyof StoreState["values"]>(
      field: K,
      value: StoreState["values"][K]
    ) => {
      state = {
        ...state,
        values: { ...state.values, [field]: value },
      };
      // 구독자들에게 새 상태 전달
      for (const listener of listeners) {
        listener(state);
      }
    },

    // 구독 등록, 해제 함수 반환
    subscribe: (listener: Listener) => {
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },

    getListenerCount: () => listeners.size,
  };
}

// Store 인스턴스 (React 바깥에 존재)
const formStore = createStore({
  values: { email: "", username: "", age: 0 },
});

// ─────────────────────────────────────────────
// 2. React 연결 훅 — useSyncExternalStore 패턴
// ─────────────────────────────────────────────

// 특정 필드만 구독하는 훅
function useField<K extends keyof StoreState["values"]>(field: K) {
  const renderRef = useRef(0);
  const [value, setValue] = useState(() => formStore.getFieldValue(field));

  useEffect(() => {
    // 마운트 시 구독 등록
    const unsubscribe = formStore.subscribe((newState) => {
      const newValue = newState.values[field];
      setValue((prev) => {
        // 값이 같으면 리렌더링 안 함 (Object.is 비교)
        if (Object.is(prev, newValue)) return prev;
        return newValue;
      });
    });

    // 언마운트 시 구독 해제
    return unsubscribe;
  }, [field]);

  renderRef.current++;

  return {
    value,
    renderCount: renderRef.current,
    onChange: (newValue: StoreState["values"][K]) =>
      formStore.setFieldValue(field, newValue),
  };
}

// ─────────────────────────────────────────────
// 3. 각 필드 컴포넌트 — 자신의 필드만 구독
// ─────────────────────────────────────────────
function EmailField() {
  const { value, renderCount, onChange } = useField("email");

  return (
    <label>
      이메일
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="test@example.com"
      />
      <span className="render-count">이 필드 렌더링: {renderCount}회</span>
    </label>
  );
}

function UsernameField() {
  const { value, renderCount, onChange } = useField("username");

  return (
    <label>
      유저명
      <input value={value} onChange={(e) => onChange(e.target.value)} />
      <span className="render-count">이 필드 렌더링: {renderCount}회</span>
    </label>
  );
}

function AgeField() {
  const { value, renderCount, onChange } = useField("age");

  return (
    <label>
      나이
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="render-count">이 필드 렌더링: {renderCount}회</span>
    </label>
  );
}

// 전체 상태를 보여주는 컴포넌트 — 전체 구독
function StoreSnapshot() {
  const renderRef = useRef(0);
  const [state, setState] = useState(() => formStore.getState());

  useEffect(() => {
    return formStore.subscribe((newState) => {
      setState(newState);
    });
  }, []);

  renderRef.current++;

  return (
    <div>
      <h3>Store 스냅샷 (전체 구독)</h3>
      <p className="render-count">렌더링: {renderRef.current}회 (어떤 필드든 바뀌면 업데이트)</p>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

// ─────────────────────────────────────────────
// 4. 부모 컴포넌트 — Store를 구독하지 않음
// ─────────────────────────────────────────────
export function ExternalStore() {
  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div className="card">
      <h2>외부 Store 직접 구현</h2>

      <p className="render-count">
        부모 컴포넌트 렌더링: <span className="highlight">{renderCount.current}</span>회
        <br />
        👆 어떤 필드를 타이핑해도 이 숫자는 절대 안 바뀜!
        <br />
        (부모는 Store를 구독하지 않으므로)
      </p>

      <h3>핵심 원리</h3>
      <p className="info">
        각 필드 컴포넌트는 자신의 필드만 구독합니다.
        <br />
        이메일 타이핑 → EmailField만 리렌더링 → Username/Age는 무관
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(JSON.stringify(formStore.getState().values, null, 2));
        }}
      >
        <EmailField />
        <UsernameField />
        <AgeField />
        <button type="submit">제출 (Store에서 직접 읽기)</button>
      </form>

      <StoreSnapshot />

      <h3>React와 외부 Store의 연결 방식</h3>
      <pre>{`// 실제로는 React 18의 useSyncExternalStore를 쓰는 게 권장됨
import { useSyncExternalStore } from "react";

function useField(field) {
  return useSyncExternalStore(
    formStore.subscribe,           // 구독 함수
    () => formStore.getFieldValue(field),  // 스냅샷
    () => formStore.getFieldValue(field),  // 서버 스냅샷
  );
}`}</pre>
    </div>
  );
}
