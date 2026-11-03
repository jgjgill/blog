import { useState } from "react";

type Kind = "app" | "db" | "slow";

interface Span {
  id: string;
  depth: number;
  name: string;
  service: string;
  start: number;
  end: number;
  kind: Kind;
  segments?: number;
  attrs: Record<string, string>;
  note: string;
}

type Variant = "before" | "after";

const TRACE_ID = "4bf92f3577b34da6a3ce929d0e0e4736";
// 수정 전후를 같은 눈금으로 그려야 줄어든 길이가 한눈에 보인다
const SCALE = 1840;
const TICKS = [0, 500, 1000, 1500];

const COLORS: Record<Kind, string> = {
  app: "#0b8277",
  db: "#b86e00",
  slow: "#c2352a",
};

const SPANS: Record<Variant, Span[]> = {
  before: [
    {
      id: "ssr",
      depth: 0,
      name: "GET /activity/[id]",
      service: "next-ssr",
      start: 0,
      end: 1840,
      kind: "app",
      attrs: { "http.route": "/activity/[id]", "http.status_code": "200" },
      note: "루트 span. 사용자가 기다린 서버 응답 시간 전체다.",
    },
    {
      id: "gssp",
      depth: 1,
      name: "getServerSideProps",
      service: "next-ssr",
      start: 40,
      end: 1760,
      kind: "app",
      attrs: { "next.page": "/activity/[id]" },
      note: "데이터를 다 받아야 렌더링을 시작할 수 있어서, 아래 GraphQL 호출 시간이 그대로 이 span의 길이가 된다.",
    },
    {
      id: "gql",
      depth: 2,
      name: "POST /graphql activityDetail",
      service: "api-gateway",
      start: 60,
      end: 1700,
      kind: "app",
      attrs: { "graphql.operation.name": "activityDetail", "activity.id": "183920" },
      note: "여기서부터 다른 서비스다. traceparent 헤더 덕분에 같은 트레이스 아래로 이어진다.",
    },
    {
      id: "act",
      depth: 3,
      name: "resolver activity",
      service: "api-gateway",
      start: 80,
      end: 220,
      kind: "app",
      attrs: { "graphql.field.path": "activity" },
      note: "공고 본문 조회. 140ms로 정상이다.",
    },
    {
      id: "rec",
      depth: 3,
      name: "resolver recommendations",
      service: "api-gateway",
      start: 230,
      end: 480,
      kind: "app",
      attrs: { "graphql.field.path": "recommendations" },
      note: "comments와 병렬로 실행되어 전체 시간에는 영향이 없다.",
    },
    {
      id: "cmt",
      depth: 3,
      name: "resolver comments",
      service: "api-gateway",
      start: 230,
      end: 1650,
      kind: "slow",
      attrs: { "graphql.field.path": "comments", "comment.count": "24" },
      note: "전체 1,840ms 중 1,420ms(77%)를 차지한다. 바로 아래 자식 span을 눌러 원인을 확인해 보자.",
    },
    {
      id: "n1",
      depth: 4,
      name: "SELECT user × 24",
      service: "mysql",
      start: 240,
      end: 1640,
      kind: "db",
      segments: 24,
      attrs: {
        "db.statement": "SELECT * FROM user WHERE id = ?",
        "span.count": "24 (순차 실행)",
      },
      note: "댓글마다 작성자를 한 번씩, 순서대로 조회한다. 쿼리 하나는 58ms로 빠르지만 24번 쌓여 1.4초가 됐다. 전형적인 N+1 문제다.",
    },
    {
      id: "render",
      depth: 1,
      name: "renderToHTML",
      service: "next-ssr",
      start: 1760,
      end: 1830,
      kind: "app",
      attrs: {},
      note: "렌더링 자체는 70ms로 빠르다. 느린 원인은 데이터를 기다리는 시간이다.",
    },
  ],
  after: [
    {
      id: "ssr",
      depth: 0,
      name: "GET /activity/[id]",
      service: "next-ssr",
      start: 0,
      end: 620,
      kind: "app",
      attrs: { "http.route": "/activity/[id]", "http.status_code": "200" },
      note: "1,840ms에서 620ms로 줄었다. 같은 눈금으로 그렸기 때문에 막대 길이로 바로 비교된다.",
    },
    {
      id: "gssp",
      depth: 1,
      name: "getServerSideProps",
      service: "next-ssr",
      start: 40,
      end: 540,
      kind: "app",
      attrs: { "next.page": "/activity/[id]" },
      note: "이제 가장 오래 걸리는 자식은 recommendations다. 병목이 옮겨 간 것도 트레이스로 보인다.",
    },
    {
      id: "gql",
      depth: 2,
      name: "POST /graphql activityDetail",
      service: "api-gateway",
      start: 60,
      end: 500,
      kind: "app",
      attrs: { "graphql.operation.name": "activityDetail", "activity.id": "183920" },
      note: "게이트웨이 구간도 1,640ms에서 440ms로 줄었다.",
    },
    {
      id: "act",
      depth: 3,
      name: "resolver activity",
      service: "api-gateway",
      start: 80,
      end: 220,
      kind: "app",
      attrs: { "graphql.field.path": "activity" },
      note: "변경 없음.",
    },
    {
      id: "rec",
      depth: 3,
      name: "resolver recommendations",
      service: "api-gateway",
      start: 230,
      end: 480,
      kind: "app",
      attrs: { "graphql.field.path": "recommendations" },
      note: "변경 없음. 이제 이 구간이 가장 길다.",
    },
    {
      id: "cmt",
      depth: 3,
      name: "resolver comments",
      service: "api-gateway",
      start: 230,
      end: 350,
      kind: "app",
      attrs: { "graphql.field.path": "comments", "comment.count": "24" },
      note: "1,420ms에서 120ms로 줄었다.",
    },
    {
      id: "n1",
      depth: 4,
      name: "SELECT user (batched)",
      service: "mysql",
      start: 240,
      end: 300,
      kind: "db",
      attrs: {
        "db.statement": "SELECT * FROM user WHERE id IN (?, ?, ...)",
        "span.count": "1",
      },
      note: "DataLoader가 24명의 작성자 ID를 모아 한 번에 조회한다. 24개였던 span이 1개가 됐다.",
    },
    {
      id: "render",
      depth: 1,
      name: "renderToHTML",
      service: "next-ssr",
      start: 540,
      end: 610,
      kind: "app",
      attrs: {},
      note: "변경 없음.",
    },
  ],
};

const pct = (ms: number) => `${(ms / SCALE) * 100}%`;

// 오른쪽 끝에 닿는 막대는 라벨을 막대 안(넓을 때) 또는 왼쪽(좁을 때)에 둔다
function DurationLabel({ start, end, segmented }: { start: number; end: number; segmented: boolean }) {
  const dur = end - start;
  const base = "absolute top-0 whitespace-nowrap font-mono text-[11px] leading-4";
  if (end / SCALE <= 0.8) {
    return (
      <span className={`${base} text-muted`} style={{ left: `calc(${pct(end)} + 4px)` }}>
        {dur.toLocaleString()}ms
      </span>
    );
  }
  if (dur / SCALE > 0.25) {
    return (
      <span
        // 조각난 막대 위에서는 글자가 묻히므로 배경을 깐다
        className={`${base} font-semibold text-white ${segmented ? "rounded bg-black/70 px-1" : ""}`}
        style={{ right: `calc(${100 - (end / SCALE) * 100}% + 4px)` }}
      >
        {dur.toLocaleString()}ms
      </span>
    );
  }
  return (
    <span
      className={`${base} text-muted`}
      style={{ right: `calc(${100 - (start / SCALE) * 100}% + 4px)` }}
    >
      {dur.toLocaleString()}ms
    </span>
  );
}

interface Props {
  initial?: Variant;
}

export default function TraceWaterfall({ initial = "before" }: Props) {
  const [variant, setVariant] = useState<Variant>(initial);
  const [selectedId, setSelectedId] = useState("cmt");

  const spans = SPANS[variant];
  const selected = spans.find((s) => s.id === selectedId) ?? spans[0];
  const total = spans[0].end;

  return (
    <div className="not-prose my-6 rounded-lg border border-border p-4 text-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="font-mono">
          <span className="font-bold">GET /activity/183920</span>
          <span className="ml-2 text-muted">{total.toLocaleString()}ms</span>
        </div>
        <div className="flex overflow-hidden rounded-md border border-border text-xs">
          {(["before", "after"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={variant === v}
              onClick={() => setVariant(v)}
              className={`px-3 py-1 ${variant === v ? "bg-fg text-bg" : "text-muted hover:text-fg"}`}
            >
              {v === "before" ? "수정 전" : "DataLoader 적용 후"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,40%)_1fr] gap-x-3 border-b border-border pb-1 font-mono text-xs text-muted">
        <span>span</span>
        <div className="relative h-4">
          {TICKS.map((t) => (
            <span
              key={t}
              className="absolute whitespace-nowrap"
              style={{ left: pct(t), transform: t === 0 ? "none" : "translateX(-50%)" }}
            >
              {t}ms
            </span>
          ))}
        </div>
      </div>

      <div className="mt-1 grid gap-0.5">
        {spans.map((s) => {
          const dur = s.end - s.start;
          const isSelected = s.id === selected.id;
          const segments = s.segments ?? 1;
          const seg = dur / segments;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setSelectedId(s.id)}
              className={`grid w-full grid-cols-[minmax(0,40%)_1fr] items-center gap-x-3 rounded px-1 py-1 text-left ${isSelected ? "bg-gray-100" : "hover:bg-gray-50"}`}
            >
              <span
                className="truncate font-mono text-xs"
                style={{ paddingLeft: s.depth * 10 }}
              >
                {s.name}
                <span className="text-muted"> · {s.service}</span>
              </span>
              <span className="relative h-4">
                {Array.from({ length: segments }, (_, i) => (
                  <span
                    key={i}
                    className="absolute top-0.5 h-3 rounded-sm"
                    style={{
                      left: pct(s.start + i * seg),
                      width: segments > 1 ? `calc(${pct(seg)} - 1px)` : pct(dur),
                      background: COLORS[s.kind],
                    }}
                  />
                ))}
                <DurationLabel start={s.start} end={s.end} segmented={segments > 1} />
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 border-t border-border pt-3" aria-live="polite">
        <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 font-mono text-xs">
          {[
            ["span.name", selected.name],
            ["service.name", selected.service],
            ["trace_id", TRACE_ID],
            ["duration", `${(selected.end - selected.start).toLocaleString()}ms`],
            ...Object.entries(selected.attrs),
          ].map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-muted">{k}</dt>
              <dd className="m-0 break-all">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 mb-0">{selected.note}</p>
      </div>
    </div>
  );
}
