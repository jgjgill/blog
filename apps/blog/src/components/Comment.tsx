import Giscus from "@giscus/react";

interface Props {
  lang?: "ko" | "en";
}

export default function Comment({ lang = "ko" }: Props) {
  return (
    <div className="min-h-25 mt-12">
      <Giscus
        repo="jgjgill/blog"
        repoId="R_kgDOJDC4vw"
        category="Comments"
        categoryId="DIC_kwDOJDC4v84CkpXY"
        mapping="pathname"
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang={lang}
        loading="lazy"
      />
    </div>
  );
}
