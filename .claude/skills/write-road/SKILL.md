---
name: write-road
description: Use when the user asks to write or create a road document (daily learning record). Creates the MDX file in the correct date-based directory.
---

날짜 기반 학습/기술 기록 문서(Road)를 작성할 때 사용하는 스킬입니다.

## 파일 생성 절차

파일 경로: `apps/blog/src/content/roads/{YYYY}/{MM}/{DD}.mdx`

예시: 2026년 3월 7일 → `apps/blog/src/content/roads/2026/03/07.mdx`

## Frontmatter 템플릿

```md
---
title: ""
date: "YYYY-MM-DD"
---
```

## 문서 작성 컨벤션

기술 개념이나 트러블슈팅을 다음 구조로 작성:

```md
## 개요 / 배경

무엇인지, 왜 등장했는지 설명

## 동작 원리

어떻게 동작하는지 설명 (단계별 또는 항목별)

## 관련 개념 비교 (선택)

유사 개념과의 차이점 비교

## 개념 정리

- "[개념명]이 무엇인가요?" 질문에 대한 2-3분 답변 스크립트

### 핵심 문장

- 핵심만 간결하게 설명하는 30초 버전

## 기타

- 꼬리 질문 예상 및 답변 포인트
```

- `##` (h2)로 섹션 구분
- 코드 예시 포함 가능
- 썸네일 없음 (텍스트 위주)

## 이미지 가이드라인

썸네일 / OG 이미지: 1200 × 630 ⭐ 가장 표준
본문 설명 이미지: 1200 × 675 16:9

## 커밋 컨벤션

글 작성 완료 후 커밋 시 다음 형식을 사용한다.

```
road: {글 제목}
```

예시:

```
road: 서비스 워커(Service Worker)란?
road: React Batching이란?
```
