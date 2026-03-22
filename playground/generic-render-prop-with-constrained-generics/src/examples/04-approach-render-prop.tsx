/**
 * 예제 04: 3안 — Render Prop + Constrained Generic (채택)
 *
 * SwiperCards<T>는 배치만 담당한다.
 * data에 넘기는 타입에 따라 renderItem의 item 타입이 자동으로 결정된다.
 *
 * 광고 카드를 클릭하면 콘솔에서 이벤트 로그를 확인할 수 있다.
 * 세 번째 타입(ActivityWithBadgeFragment)을 추가해도 SwiperCards는 그대로다.
 */
import {
  ACTIVITIES,
  AD_ACTIVITIES,
  ActivityFragment,
  ActivityWithAdFragment,
} from "../types";

const CORE_CODE = `// SwiperCards — 배치만 담당, 타입을 모른다
const SwiperCards = <T extends ActivityFragment | ActivityWithAdFragment>({
  data,
  renderItem,
}: {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}) => (
  <Swiper>
    {data.map((item, index) => (
      <SwiperSlide key={...}>{renderItem(item, index)}</SwiperSlide>
    ))}
  </Swiper>
);

// data 타입에 따라 renderItem의 item이 자동으로 추론된다
<SwiperCards
  data={activities}           // T = ActivityFragment
  renderItem={(item) => (    // item: ActivityFragment
    <ActivityCard activity={item} />
  )}
/>

<SwiperCards
  data={adActivities}         // T = ActivityWithAdFragment
  renderItem={(item) => (    // item: ActivityWithAdFragment
    <ActivityCard
      activity={item.activity}
      campaignId={item.ad?.campaign?.id}
    />
  )}
/>`;

const EXTENSION_CODE = `// 세 번째 타입이 추가돼도 SwiperCards는 그대로
// union에 타입만 추가하고, 새 호출부만 작성한다
type ActivityWithBadgeFragment = {
  activity: ActivityFragment;
  badge?: string;
};

<SwiperCards
  data={badgeActivities}      // T = ActivityWithBadgeFragment
  renderItem={(item) => (    // item: ActivityWithBadgeFragment
    <ActivityCard activity={item.activity} badge={item.badge} />
  )}
/>`;

// 세 번째 타입 — 확장 시나리오용
type ActivityWithBadgeFragment = {
  activity: ActivityFragment;
  badge?: string;
};

const BADGE_ACTIVITIES: ActivityWithBadgeFragment[] = [
  { activity: { id: "9", title: "UX 디자이너", company: "I사", deadline: "2026-04-25" }, badge: "NEW" },
  { activity: { id: "10", title: "프로덕트 매니저", company: "J사", deadline: "2026-04-30" } },
  { activity: { id: "11", title: "데이터 분석가", company: "K사", deadline: "2026-05-01" }, badge: "HOT" },
];

function SwiperCards<T extends ActivityFragment | ActivityWithAdFragment | ActivityWithBadgeFragment>({
  data,
  renderItem,
  getItemKey,
}: {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getItemKey: (item: T, index: number) => string;
}) {
  return (
    <div className="swiper">
      {data.map((item, index) => (
        <div key={getItemKey(item, index)} className="slide">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

function ActivityCard({
  activity,
  campaignId,
  badge,
}: {
  activity: ActivityFragment;
  campaignId?: string;
  badge?: string;
}) {
  const handleClick = () => {
    if (campaignId) {
      console.log(`[광고 클릭] campaignId: ${campaignId}, activityId: ${activity.id}`);
    }
    console.log(`[공고 이동] /activity/${activity.id}`);
  };

  return (
    <div
      className={`activity-card ${campaignId ? "is-ad" : ""}`}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {campaignId && <span className="ad-badge">광고</span>}
      {badge && <span className="badge">{badge}</span>}
      <span className="activity-title">{activity.title}</span>
      <span className="activity-company">{activity.company}</span>
      <span className="activity-deadline">~ {activity.deadline}</span>
      {campaignId && (
        <span className="campaign-id">campaign: {campaignId}</span>
      )}
    </div>
  );
}

export function ApproachRenderProp() {
  return (
    <div className="card">
      <h2>04 — 3안: Render Prop + Generic (채택)</h2>

      <pre className="core-code">{CORE_CODE}</pre>

      <h3>일반 공고 — item은 ActivityFragment로 추론됨</h3>
      <SwiperCards
        data={ACTIVITIES}
        renderItem={(item) => <ActivityCard activity={item} />}
        getItemKey={(item, index) => `${item.id}-${index}`}
      />

      <h3>광고 API 응답 — item은 ActivityWithAdFragment로 추론됨 (광고 카드 클릭 시 콘솔 확인)</h3>
      <SwiperCards
        data={AD_ACTIVITIES}
        renderItem={(item) => (
          <ActivityCard
            activity={item.activity}
            campaignId={item.ad?.campaign?.id}
          />
        )}
        getItemKey={(item, index) => `${item.activity.id}-${index}`}
      />

      <h3 style={{ marginTop: "2rem" }}>확장 — 세 번째 타입이 추가돼도 SwiperCards는 그대로</h3>
      <pre className="core-code">{EXTENSION_CODE}</pre>

      <SwiperCards
        data={BADGE_ACTIVITIES}
        renderItem={(item) => (
          <ActivityCard activity={item.activity} badge={item.badge} />
        )}
        getItemKey={(item, index) => `${item.activity.id}-${index}`}
      />
    </div>
  );
}
