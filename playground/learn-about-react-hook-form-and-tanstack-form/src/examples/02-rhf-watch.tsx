/**
 * 예제 02: RHF watch — 리렌더링 문제 직접 확인
 *
 * watch의 문제: 호출한 컴포넌트 전체가 리렌더링됨
 */
import { useRef } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  username: string;
  age: number;
};

export function RHFWatch() {
  const renderCount = useRef(0);
  renderCount.current++;

  const { register, watch, handleSubmit } = useForm<FormValues>({
    defaultValues: { email: "", username: "", age: 0 },
  });

  // watch 호출 → email이 바뀔 때마다 이 컴포넌트 전체 리렌더링
  const email = watch("email");

  return (
    <div className="card">
      <h2>RHF watch — 리렌더링 관찰</h2>

      <p className="render-count">
        이 컴포넌트 렌더링:{" "}
        <span className="highlight">{renderCount.current}</span>회
        <br />
        👆 email 필드에 타이핑하면 이 숫자가 증가함 (watch 때문)
        <br />
        username/age 타이핑은? → watch 없으면 리렌더링 없음
      </p>

      <form onSubmit={handleSubmit((d) => alert(JSON.stringify(d)))}>
        <label>
          이메일 (watch 구독 중)
          <input {...register("email")} />
          <span className="info">현재 값: {email}</span>
        </label>

        <label>
          유저명 (watch 없음)
          <input {...register("username")} />
        </label>

        <label>
          나이 (watch 없음)
          <input type="number" {...register("age", { valueAsNumber: true })} />
        </label>

        <button type="submit">제출</button>
      </form>

      <h3>핵심 포인트</h3>
      <p className="info">
        • <code>watch("email")</code>: email이 바뀔 때마다 컴포넌트 전체
        리렌더링
        <br />• <code>watch()</code>: 아무 필드나 바뀌면 리렌더링
      </p>
    </div>
  );
}
