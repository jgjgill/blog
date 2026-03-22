/**
 * 예제 03: 2안 — 전용 컴포넌트를 별도로 만든다
 *
 * SwiperCards / SwiperAdCards를 각자 만들면 내부 분기는 없어진다.
 * 하지만 Swiper 구조 로직이 두 곳에 그대로 중복된다.
 */
import {
  ACTIVITIES,
  AD_ACTIVITIES,
  ActivityFragment,
  ActivityWithAdFragment,
} from "../types";

const CORE_CODE = `// SwiperCards — 일반 공고 전용
const SwiperCards = ({ data }: { data: ActivityFragment[] }) => (
  <Swiper>
    {data.map((item, index) => (
      <SwiperSlide key={\`\${item.id}-\${index}\`}>
        <ActivityCard activity={item} />
      </SwiperSlide>
    ))}
  </Swiper>
);

// SwiperAdCards — 광고 공고 전용
// ⚠️ Swiper 구조가 위와 완전히 같다
const SwiperAdCards = ({ data }: { data: ActivityWithAdFragment[] }) => (
  <Swiper>
    {data.map((item, index) => (
      <SwiperSlide key={\`\${item.activity.id}-\${index}\`}>
        <ActivityCard
          activity={item.activity}
          campaignId={item.ad?.campaign?.id}
        />
      </SwiperSlide>
    ))}
  </Swiper>
);`;

function SwiperCards({ data }: { data: ActivityFragment[] }) {
  return (
    <div className="swiper">
      {data.map((item, index) => (
        <div key={`${item.id}-${index}`} className="slide">
          <div className="activity-card">
            <span className="activity-title">{item.title}</span>
            <span className="activity-company">{item.company}</span>
            <span className="activity-deadline">~ {item.deadline}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SwiperAdCards({ data }: { data: ActivityWithAdFragment[] }) {
  return (
    <div className="swiper">
      {data.map((item, index) => {
        const campaignId = item.ad?.campaign?.id;
        return (
          <div key={`${item.activity.id}-${index}`} className="slide">
            <div className={`activity-card ${campaignId ? "is-ad" : ""}`}>
              {campaignId && <span className="ad-badge">광고</span>}
              <span className="activity-title">{item.activity.title}</span>
              <span className="activity-company">{item.activity.company}</span>
              <span className="activity-deadline">~ {item.activity.deadline}</span>
              {campaignId && (
                <span className="campaign-id">campaign: {campaignId}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ApproachSplit() {
  return (
    <div className="card">
      <h2>03 — 2안: 컴포넌트 분리</h2>

      <pre className="core-code">{CORE_CODE}</pre>

      <div className="problem-note">
        ⚠️ 두 컴포넌트의 Swiper 구조가 동일하다. 슬라이드 스펙이 바뀌면 두
        파일을 모두 수정해야 한다.
      </div>

      <h3>일반 공고 — SwiperCards</h3>
      <SwiperCards data={ACTIVITIES} />

      <h3>광고 API 응답 — SwiperAdCards (일반 공고 + 광고 공고 섞임)</h3>
      <SwiperAdCards data={AD_ACTIVITIES} />
    </div>
  );
}
