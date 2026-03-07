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

## 핵심 정리

핵심 내용을 한 문장 또는 짧게 요약
```

- `##` (h2)로 섹션 구분
- 코드 예시 포함 가능
- 썸네일 없음 (텍스트 위주)

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
