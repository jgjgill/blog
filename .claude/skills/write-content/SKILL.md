---
name: write-content
description: Use when the user asks to write or create a blog post. Creates the directory structure and MDX file with proper frontmatter.
---

블로그 포스트를 작성할 때 사용하는 스킬입니다.

## 초안 문서 수집 (필수)

글 작성 전 반드시 사용자가 작성한 **초안 문서**를 받아야 한다.
초안 없이 글을 작성하지 않는다.

초안은 다음 형태로 제공된다:

- 파일 참조: `@파일명.md` (예: `@module-system-guide.md`)
- 직접 텍스트 붙여넣기

초안이 제공되지 않았다면 먼저 요청한다:

> 글의 초안 또는 정리해둔 내용이 있으면 공유해주세요. 초안을 바탕으로 글을 같이 의논하면서 만듭니다.

초안을 받은 후:

1. 초안의 핵심 내용과 구조를 파악
2. 글의 흐름과 섹션 구성을 초안 기반으로 설계
3. 초안에 없는 내용을 임의로 추가 방지

## 파일 생성 절차

1. 디렉토리 생성: `apps/blog/src/content/posts/{category}/{slug}/`
2. 이미지 디렉토리 생성: `apps/blog/src/content/posts/{category}/{slug}/images/`
3. 본문 파일 생성: `apps/blog/src/content/posts/{category}/{slug}/index.mdx`

## Frontmatter 템플릿

```md
---
title: ""
description: ""
date: "YYYY-MM-DD"
thumbnail: "./images/{slug}-thumbnail.png"
thumbnail_alt: ""
category: "development"
---
```

- `category`: `development` | `study` | `reading` | `essay`
- `slug`: 영문 kebab-case (디렉토리명과 동일)
- `thumbnail`: 썸네일 이미지가 없으면 필드 생략

## 포스트 작성 컨벤션

- `##` (h2)로 섹션 구분
- 문제 정의나 배경 설명은 `<Callout>` 컴포넌트 활용 (import 불필요)
- MDX 포맷 (React 컴포넌트 사용 가능)

```mdx
<Callout>ERR_REQUIRE_ESM — 번들러가 숨겨온 청구서</Callout>

## 들어가며

...

## 본문 섹션

...
```

## Callout 작성 가이드

**한 문장**으로 핵심을 강렬하게 찌른다. 비유, 은유, 유머를 적극 활용한다.

- 독자가 공감하거나 궁금증을 갖게 만드는 한 줄
- 글을 쓰게 된 계기(문제 상황)를 감각적으로 압축
- 단순 요약("이 글에서는 X를 다룹니다") 금지

**좋은 예시:**

```mdx
<Callout>ERR_REQUIRE_ESM — 번들러가 숨겨온 청구서</Callout>
```

**피해야 할 예시:**

```mdx
<Callout>이 글에서 다루는 핵심 내용 또는 문제 정의</Callout>
```

## 이미지 가이드라인

썸네일 / OG 이미지: 1200 × 630 ⭐ 가장 표준
본문 설명 이미지: 1200 × 675 16:9

## 커밋 컨벤션

글 작성 완료 후 커밋 시 다음 형식을 사용한다.

```
post: {글 제목}
```

예시:

```
post: React Hook Form, TanStack Form 이해하기
post: npx에 대해 알아보기
```
