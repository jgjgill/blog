/**
 * 예제 02: 1안 — union 타입으로 data를 받는다
 *
 * SwiperCards 내부에서 타입 가드로 분기해야 한다.
 * 두 타입의 구조와 광고 이벤트 처리를 모두 알아야 해서 관심사가 섞인다.
 */
import {
  ACTIVITIES,
  AD_ACTIVITIES,
  ActivityFragment,
  ActivityWithAdFragment,
} from "../types";

const CORE_CODE = `// data를 union 타입으로 받는다
interface IFProps {
  data: ActivityFragment[] | ActivityWithAdFragment[];
}

const SwiperCards = ({ data }: IFProps) => {
  return (
    <Swiper>
      {data.map((item, index) => {
        // 타입 가드로 분기 — SwiperCards가 두 타입을 모두 알아야 한다
        if ("activity" in item) {
          return (
            <SwiperSlide key={\`\${item.activity.id}-\${index}\`}>
              <ActivityCard
                activity={item.activity}
                campaignId={item.ad?.campaign?.id}
              />
            </SwiperSlide>
          );
        }
        return (
          <SwiperSlide key={\`\${item.id}-\${index}\`}>
            <ActivityCard activity={item} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};`;

function SwiperCards({
  data,
}: {
  data: ActivityFragment[] | ActivityWithAdFragment[];
}) {
  return (
    <div className="swiper">
      {data.map((item, index) => {
        if ("activity" in item) {
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
        }
        return (
          <div key={`${item.id}-${index}`} className="slide">
            <div className="activity-card">
              <span className="activity-title">{item.title}</span>
              <span className="activity-company">{item.company}</span>
              <span className="activity-deadline">~ {item.deadline}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ApproachUnion() {
  return (
    <div className="card">
      <h2>02 — 1안: union 타입</h2>

      <pre className="core-code">{CORE_CODE}</pre>

      <div className="problem-note">
        ⚠️ SwiperCards가 두 타입의 구조를 모두 알고 분기해야 한다. 광고 이벤트
        처리까지 담당하면 관심사가 점점 쌓인다.
      </div>

      <h3>일반 공고</h3>
      <SwiperCards data={ACTIVITIES} />

      <h3>광고 API 응답 (일반 공고 + 광고 공고 섞임)</h3>
      <SwiperCards data={AD_ACTIVITIES} />
    </div>
  );
}
