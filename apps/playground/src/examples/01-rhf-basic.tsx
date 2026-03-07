/**
 * 예제 01: RHF 기본 — 비제어(Uncontrolled) 방식
 *
 * RHF의 핵심 철학: "React를 최대한 피해라"
 * - DOM ref로 값을 직접 읽어서 React 상태 변경 없음
 * - 타이핑해도 리렌더링이 발생하지 않음
 */
import { useRef } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

export function RHFBasic() {
  // useRef: 컴포넌트 인스턴스 단위로 렌더링 횟수를 셈
  // (모듈 레벨 let 변수는 StrictMode 이중 마운트, 탭 전환 등으로 부정확함)
  const renderCount = useRef(0);
  renderCount.current++;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // register가 반환하는 것을 직접 확인해보자
  const emailRegistration = register("email", {
    required: "이메일을 입력하세요",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "올바른 이메일 형식이 아닙니다",
    },
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 1000));
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="card">
      <h2>RHF 기본 — 비제어 방식</h2>

      <p className="render-count">
        부모 컴포넌트 렌더링 횟수:{" "}
        <span className="highlight">{renderCount.current}</span>
        <br />
        👆 타이핑해도 이 숫자가 바뀌지 않음 (비제어 방식의 핵심)
      </p>

      <h3>register가 반환하는 것</h3>
      <pre>{JSON.stringify(Object.keys(emailRegistration), null, 2)}</pre>
      <p className="info">
        → ref, name, onChange, onBlur를 반환. DOM ref로 직접 값을 읽음.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          이메일
          <input
            {...emailRegistration}
            type="email"
            placeholder="test@example.com"
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </label>

        <label>
          비밀번호
          <input
            {...register("password", {
              required: "비밀번호를 입력하세요",
              minLength: { value: 8, message: "8자 이상 입력하세요" },
            })}
            type="password"
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "제출 중..." : "제출"}
        </button>
      </form>
    </div>
  );
}
