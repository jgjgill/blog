# npm i vs npm ci — 직접 돌려보는 실험실

`npm install`(줄여서 `npm i`)과 `npm ci`(clean install)의 차이를
**실제 명령을 실행하고 출력을 관찰하며** 이해하는 playground 입니다.

> 이 README 는 **실험 가이드**입니다.
> 각 실험을 직접 돌려보고, "예상 → 실행 → 관찰"의 흐름으로 차이를 체득하는 것이 목표입니다.

---

## 시작하기 전에 — 등장인물 3명

실험을 이해하려면 이 세 가지의 관계만 알면 됩니다.

| 파일 | 역할 | 비유 |
|------|------|------|
| `package.json` | 내가 **원하는 버전의 범위**를 선언 (`^3.0.0`) | 쇼핑 리스트 ("우유 1~2L") |
| `package-lock.json` | 실제로 **설치된 정확한 버전**을 기록 (`3.0.1`) | 영수증 ("이 우유, 정확히 이거") |
| `node_modules/` | 실제로 **설치된 실물** 패키지 | 장바구니 속 실물 |

- `^3.0.0` → `3.x.x` 중 최신 (major 고정)
- `~7.5.0` → `7.5.x` 중 최신 (major.minor 고정)
- 즉 `package.json` 의 버전은 **정확한 값이 아니라 범위**이고, lock 이 그중 한 버전을 못박습니다.

이 실험에 쓰는 [`demo-app/package.json`](./demo-app/package.json) 의 의존성:

```json
"dependencies": {
  "is-odd": "^3.0.0",
  "semver": "~7.5.0"
}
```

---

## 실행 환경

이 디렉토리는 저장소 루트의 pnpm workspace 와 **격리**되어 있습니다
(이유는 [`pnpm-workspace.yaml`](./pnpm-workspace.yaml) 주석 참고).
안에서는 **순수하게 npm 만** 사용합니다.

```bash
cd playground/npm-i-vs-ci
```

모든 실험 스크립트는 독립적이고, 언제든 초기화할 수 있습니다:

```bash
bash scripts/reset.sh   # node_modules + package-lock.json 삭제 (초기 상태로)
```

> 💡 학습 팁: 각 STEP 의 명령을 보고 **출력을 먼저 예측**한 뒤 실행해서 맞춰보세요.

---

## 실험 1 — 기본 동작 차이

```bash
bash scripts/01-basic.sh
```

### 확인하는 것

| STEP | 상황 | 무엇을 보나 |
|------|------|------------|
| 1 | lock 이 **없는데** `npm ci` | ❌ 에러로 멈춘다 (`npm ci` 는 lock 이 필수) |
| 2 | `npm i` 로 최초 설치 | ✅ `package-lock.json` 이 **새로 생성**된다 |
| 3 | lock 이 있는 상태에서 `npm ci` | node_modules 를 **통째로 지우고** 재설치한다 |

### 관찰 포인트

- **STEP 1 에러 메시지**:
  ```
  npm error code EUSAGE
  npm error The `npm ci` command can only install with an existing package-lock.json ...
  ```
  → `npm ci` 는 lock 없이는 아예 동작하지 않습니다.

- **STEP 3 의 "표식 파일" 트릭**: ci 실행 전에 `node_modules/` 안에 표식 파일을 만들어 둡니다.
  ci 후 그 표식이 **사라져 있으면**, node_modules 가 통째로 삭제·재설치되었다는 증거입니다.

- **실행 시간 비교**: STEP 2(`npm i`)와 STEP 3(`npm ci`)의 `real` 시간을 비교해보세요.

---

## 실험 2 — lock 불일치 시나리오 (가장 실무적)

```bash
bash scripts/02-lock-mismatch.sh
```

> 실무에서 자주 만나는 상황:
> **"package.json 의 버전을 바꿨는데 lock 갱신을 깜빡하고 커밋했다."**

스크립트가 일부러 `package.json` 만 `is-odd: ^3.0.0 → ^2.0.0` 으로 바꿔
lock(3.x)과 어긋나게 만든 뒤, 같은 상황에서 두 명령을 각각 실행합니다.

### 확인하는 것

| 같은 불일치 상황에서 | 결과 |
|---|---|
| `npm ci` | ❌ 에러로 멈춤 |
| `npm i` | ✅ lock 을 package.json 에 맞춰 **수정**하고 설치 |

### 관찰 포인트

- **`npm ci` 의 에러 메시지** — 불일치를 콕 집어줍니다:
  ```
  npm error `npm ci` can only install packages when your package.json and
  npm error package-lock.json ... are in sync.
  npm error Invalid: lock file's is-odd@3.0.1 does not satisfy is-odd@2.0.0
  ```

- **`npm i` 실행 후** lock 의 is-odd 가 `2.0.0` 으로 **바뀌어 있는 것**을 확인하세요.
  → npm i 는 어긋남을 만나면 lock 을 조용히 고칩니다.

> 스크립트는 끝에서 `package.json` 을 원래대로 복구하지만,
> lock 은 변경된 상태로 남으니 다음 실험 전에 `reset.sh` 를 돌리세요.

---

## 실험 3 — 버전 범위(^, ~)가 lock 에 박히는 과정

```bash
bash scripts/03-version-range.sh
```

### 확인하는 것

| STEP | 무엇을 보나 |
|------|------------|
| 1 | `npm view` 로 레지스트리에 실제 배포된 버전들 (범위가 고를 후보) |
| 2 | `npm i` 후 lock 에 **딱 한 버전**이 박힌다 |
| 3 | node_modules 를 지우고 `npm ci` → **lock 의 그 버전 그대로** 재현 |

### 관찰 포인트

- 범위가 한 버전으로 좁혀지는 모습:
  ```
  is-odd : 3.0.1   (^3.0.0 범위에서 선택됨)
  semver : 7.5.4   (~7.5.0 범위에서 선택됨)
  ```

- **핵심 통찰** — 같은 `package.json` 이라도:
  - lock 을 커밋해 두면 → 모두가 **동일 버전**을 받는다 (`npm ci` 가 보장)
  - lock 없이 `npm i` 만 쓰면 → 설치 **시점**에 따라 범위 내 다른 버전이 깔릴 수 있다

---

## 실험 4(생각해보기) — 왜 CI 에서는 `npm ci` 를 쓸까?

별도 스크립트는 없습니다. 실험 1~3 을 종합하면 답이 나옵니다.

| 기준 | `npm i` | `npm ci` |
|------|---------|----------|
| 재현성 | lock 을 고칠 수 있음 → 빌드마다 달라질 여지 | lock 그대로만 설치 → **항상 동일** |
| 엄격함 | 불일치를 알아서 봉합 | 불일치면 **즉시 실패** (문제를 빨리 발견) |
| node_modules | 부분 갱신 | **통삭제 후** 설치 (깨끗한 상태 보장) |
| 부작용 | `package.json`/lock 을 **수정**할 수 있음 | 파일을 **건드리지 않음** |
| lock 필요 | 없어도 됨 (만들어줌) | **반드시 있어야 함** |

- **로컬 개발 = `npm i`** : 패키지 추가·버전 변경 등 lock 을 **바꿔야 하는** 작업
- **CI/배포 = `npm ci`** : 커밋된 lock 을 한 글자도 안 바꾸고 **모두가 똑같이** 설치

> 직접 던져볼 질문:
> 실험 2 에서 본 "불일치 시 에러로 멈추는 동작"이, CI 에서는 왜 **장점**이 될까?

---

## 한눈에 정리

```
npm i  ─┐  lock 없으면? → 만든다
        ├  lock 있는데 어긋나면? → 고쳐서 설치 (관대)
        └  주 용도: 로컬 개발

npm ci ─┐  lock 없으면? → 에러 (필수)
        ├  lock 있는데 어긋나면? → 에러 (엄격)
        ├  node_modules → 매번 통째로 삭제 후 재설치
        └  주 용도: CI / 배포
```

실험이 끝나면 `bash scripts/reset.sh` 로 깨끗이 되돌릴 수 있습니다.
