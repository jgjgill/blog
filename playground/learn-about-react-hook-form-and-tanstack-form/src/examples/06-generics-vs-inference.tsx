/**
 * 예제 10: 제네릭 방식 vs 런타임 추론 방식
 *
 * "런타임"이란: 코드가 실제로 실행되는 시점 (브라우저/Node에서 JS가 돌 때)
 * "컴파일타임"이란: TypeScript가 타입을 검사하는 시점 (빌드/에디터)
 *
 * RHF: useForm<MyForm>() — 타입을 "컴파일타임에 직접 선언"
 * TanStack: useForm({ defaultValues }) — 타입을 "런타임 값에서 추론"
 */
import { useForm as useRHF } from "react-hook-form";
import { useForm as useTanStack } from "@tanstack/react-form";

// ─────────────────────────────────────────────
// 시나리오: 동일한 폼을 두 방식으로 구현
// ─────────────────────────────────────────────
interface Person {
  name: string;
  age: number;
}

// ─────────────────────────────────────────────
// RHF 방식: 제네릭으로 타입 선언
// ─────────────────────────────────────────────
function RHFGenericForm() {
  // TypeScript에게 "이 폼은 Person 타입이야"라고 직접 알려줌
  // defaultValues와 Person 타입이 실제로 맞는지는 TypeScript가 검사 안 함
  const { register, handleSubmit } = useRHF<Person>({
    defaultValues: {
      name: "Bill Luo",
      age: 24,
      // 여기에 오타가 나도 TypeScript가 잡기 어려움
      // 예: name: "Bill" → 타입 에러 발생하지만
      //     defaultValues 자체를 안 써도 동작함
    },
  });

  // register의 반환 타입은 Person 필드에서 추론됨
  // 하지만 이 추론의 근거는 "런타임 값"이 아닌 "제네릭 선언"

  return (
    <div style={{ background: "#fef2f2", padding: "0.75rem", borderRadius: 4 }}>
      <strong>RHF — 제네릭 방식</strong>
      <form onSubmit={handleSubmit((d) => alert(JSON.stringify(d)))}>
        <label>
          이름
          <input {...register("name")} />
        </label>
        <label>
          나이
          <input type="number" {...register("age", { valueAsNumber: true })} />
        </label>
        <button type="submit">제출</button>
      </form>
      <pre style={{ marginTop: "0.5rem" }}>{`useForm<Person>()
// 타입의 근거: 개발자가 직접 선언한 제네릭
// defaultValues 없어도 타입은 동작함
// → 타입과 실제 초기값이 따로 존재`}</pre>
    </div>
  );
}

// ─────────────────────────────────────────────
// TanStack 방식: 런타임 값에서 타입 추론
// ─────────────────────────────────────────────
const defaultPerson: Person = { name: "Bill Luo", age: 24 };

function TanStackInferenceForm() {
  // defaultValues로 실제 값을 넘기면
  // TypeScript가 그 값을 보고 타입을 자동으로 추론
  const form = useTanStack({
    defaultValues: defaultPerson,
    // 타입의 근거: "런타임에 실제로 존재하는 값" defaultPerson
    onSubmit: async ({ value }) => {
      alert(JSON.stringify(value));
    },
  });

  return (
    <div style={{ background: "#f0fdf4", padding: "0.75rem", borderRadius: 4 }}>
      <strong>TanStack — 런타임 추론 방식</strong>
      <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
        <form.Field name="name">
          {(field) => (
            <label>
              이름
              {/* field.state.value 타입: string (defaultPerson.name에서 추론) */}
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </label>
          )}
        </form.Field>
        <form.Field name="age">
          {(field) => (
            <label>
              나이
              {/* field.state.value 타입: number (defaultPerson.age에서 추론) */}
              <input
                type="number"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
            </label>
          )}
        </form.Field>
        <button type="submit">제출</button>
      </form>
      <pre style={{ marginTop: "0.5rem" }}>{`const defaultPerson: Person = { name: "Bill Luo", age: 24 };

useForm({ defaultValues: defaultPerson })
// 타입의 근거: 런타임에 실제로 존재하는 값 defaultPerson
// defaultValues 없으면 폼 자체가 동작 안 함
// → 타입과 실제 초기값이 항상 일치`}</pre>
    </div>
  );
}

// ─────────────────────────────────────────────
// 핵심: 런타임이란 무엇인가
// ─────────────────────────────────────────────
// 코드의 생애 주기:
//
// 작성    →    컴파일타임    →    런타임
// (편집기)     (tsc 검사)        (브라우저 실행)
//
// TypeScript는 컴파일타임에만 존재 → 빌드 후 JS에는 타입 정보 없음
// 런타임 = 실제 JS가 실행되는 시점 = 타입 정보가 사라진 시점
//
// RHF 제네릭 방식의 문제:
//   useForm<Person>() 에서 <Person>은 컴파일타임에만 존재
//   런타임에 실제로 어떤 필드가 있는지는 defaultValues에서 결정됨
//   → 타입(컴파일타임)과 값(런타임)이 따로 관리됨
//   → 둘이 어긋날 가능성이 있음
//
// TanStack 추론 방식:
//   defaultValues: defaultPerson 에서 defaultPerson은 런타임 값
//   TypeScript는 이 값을 보고 타입을 추론
//   → 타입의 근거가 실제 런타임 값이므로 항상 일치 보장

export function GenericsVsInference() {
  return (
    <div className="card">
      <h2>제네릭 선언 vs 런타임 추론</h2>

      <h3>런타임 vs 컴파일타임</h3>
      <pre>{`// 컴파일타임: TypeScript가 검사하는 시점
const x: number = "hello"; // ← tsc가 에러를 잡음

// 런타임: 브라우저에서 JS가 실행되는 시점
// TypeScript 타입 정보는 모두 사라짐
// 실제로 돌아가는 코드만 남음

// 타입스크립트 빌드 결과 (타입 정보 소거됨)
// useForm<Person>({ defaultValues: { name: "", age: 0 } })
//   ↓
// useForm({ defaultValues: { name: "", age: 0 } })  // <Person> 사라짐`}</pre>

      <h3>두 방식 비교</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <RHFGenericForm />
        <TanStackInferenceForm />
      </div>

      <h3>왜 제네릭 방식이 문제인가</h3>
      <pre>{`// 문제 1: 타입과 값이 따로 존재 — 어긋날 수 있음
interface Person { name: string; age: number; }

useForm<Person>({
  defaultValues: {
    name: "",
    // age 빠짐 — 런타임엔 undefined지만 타입은 number라고 주장
  }
})

// 문제 2: 제네릭만 있고 defaultValues 없어도 타입은 "동작"
useForm<Person>() // 런타임엔 초기값 없음 — 타입과 실제값 분리

// 문제 3: 타입 추론이 "선언"에 의존 → 선언이 틀려도 오류 못 잡음
useForm<{ name: string }>({
  defaultValues: { name: 123 } // 타입 에러지만 의도가 불명확
})`}</pre>

      <h3>TanStack의 접근</h3>
      <pre>{`// 타입의 유일한 근거 = 런타임에 존재하는 defaultValues
const defaultPerson: Person = { name: "Bill Luo", age: 24 };
//                   ↑ 여기서 타입 검사 (값과 타입이 일치 보장)

useForm({ defaultValues: defaultPerson })
// TypeScript: "defaultValues가 { name: string, age: number }니까
//              폼 타입도 그걸로 추론할게"
// → 별도 제네릭 선언 불필요
// → 타입과 런타임 값이 항상 동일한 근거를 가짐

// 필드 타입도 자동 흘러내림
<form.Field name="age">
  {(field) => {
    field.state.value // 타입: number (defaultPerson.age에서 추론)
    field.handleChange(25)    // ✓
    field.handleChange("25")  // ✗ 타입 에러
  }}
</form.Field>`}</pre>
    </div>
  );
}
