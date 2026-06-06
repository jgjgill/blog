---
name: build-playground
description: Use when the user wants to learn or deep-dive a concept by running actual experiments — building a runnable playground under playground/ that proves how something behaves. The experiment's form is chosen to fit the topic, not fixed. Pairs with write-content for the eventual post.
---

개념을 **직접 실행해보며** 학습하기 위한 playground(실습 환경)를 구축하는 스킬입니다.

"문서로 읽고 끝"이 아니라, **명령을 돌려 출력을 눈으로 확인하며** 동작과 차이를 체득하는 것이 목적이다.

> 이 스킬은 **실습 환경 구축**까지 담당한다.

## 언제 사용하는가

다음과 같은 요청에서 사용한다.

- "X 개념을 실습으로 학습하고 싶어"
- "실제 동작을 확인하면서 어떤 차이가 있는지 알아보고 싶어"
- "playground 구성해서 딥다이브하자"

핵심 신호: **"실행해보며 확인"** 하려는 의도. 단순히 개념 설명만 원하면 이 스킬이 아니다.

## 시작 전: 학습 의도 합의 (필수)

곧바로 디렉토리를 만들지 말 것. 먼저 **무엇을 어떤 실험으로 확인할지** 사용자와 합의한다.

> 합의 없이 만들면 곁가지 실험에 시간을 쓰게 된다. 실험 목록을 먼저 정하고 시작한다.

## 디렉토리와 형태

`playground/{slug}/` 아래에 구성한다.

- `slug`: 영문 kebab-case. 글로 이어질 경우 post slug와 **동일하게** 맞추면 독자가 연결하기 쉽다.
- **실험의 형태는 주제에 맞게 정한다.**
- 공통적으로 두는 것은 **README**(실험 가이드)뿐이다. 나머지는 "그 개념을 실행으로 증명"하는 데 필요한 만큼만 만든다.

## 단순함 유지

학습 본질을 흐리는 곁가지는 과감히 들어낸다.

- 한 실험이 과하게 복잡해지면 같은 결론을 보여주는 더 단순한 방법으로 대체한다.
- "보여주려는 핵심 한 가지"가 흐려지면 그 실험은 쪼개거나 제거한다.

## README 작성 (실험 가이드)

README는 **실험 가이드**다. 개념 설명은 실험을 이해할 최소한만 넣는다.

구성:

1. 한 줄 요약 (핵심 차이/결론)
2. 개념 최소 정리 (필요한 등장인물/용어만, 표 활용)
3. 실행 환경 안내 (격리 언급, 실행 디렉토리)
4. **실험별 섹션** — 각 실험마다: `확인하는 것`(표) → `실행 명령` → `관찰 포인트`
5. 한눈에 보는 결론
