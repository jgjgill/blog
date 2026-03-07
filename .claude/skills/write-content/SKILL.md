---
name: write-content
description: Use when the user asks to write or create a blog post. Creates the directory structure and MDX file with proper frontmatter.
---

블로그 포스트를 작성할 때 사용하는 스킬입니다.

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
<Callout>이 글에서 다루는 핵심 내용 또는 문제 정의</Callout>

## 개요

...

## 본문 섹션

...
```

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
