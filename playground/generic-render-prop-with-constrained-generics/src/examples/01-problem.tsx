/**
 * 예제 01: 문제 상황
 *
 * 기존 SwiperCards는 ActivityFragment[]만 받는다.
 * 광고 API 응답(ActivityWithAdFragment[])을 넘기면 타입 에러가 발생한다.
 */
import { ACTIVITIES, AD_ACTIVITIES, ActivityFragment } from "../types";

const CORE_CODE = `// 기존 SwiperCards — ActivityFragment[]만 받는다
interface IFProps {
  data: ActivityFragment[];
}

const SwiperCards = ({ data }: IFProps) => {
  return (
    <Swiper>
      {data.map((activity) => (
        <SwiperSlide key={activity.id}>
          <ActivityCard activity={activity} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

// 광고 API 응답을 넘기면 타입 에러
// Type 'ActivityWithAdFragment[]' is not assignable
// to type 'ActivityFragment[]'
<SwiperCards data={adActivities} />`;

function SwiperCards({ data }: { data: ActivityFragment[] }) {
  return (
    <div className="swiper">
      {data.map((activity) => (
        <div key={activity.id} className="slide">
          <div className="activity-card">
            <span className="activity-title">{activity.title}</span>
            <span className="activity-company">{activity.company}</span>
            <span className="activity-deadline">~ {activity.deadline}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Problem() {
  return (
    <div className="card">
      <h2>01 — 문제 상황</h2>

      <pre className="core-code">{CORE_CODE}</pre>

      <h3>일반 공고 — 정상 동작</h3>
      <SwiperCards data={ACTIVITIES} />

      <h3>광고 API 응답 구조 — 일반 공고 + 광고 공고가 섞여서 온다</h3>
      <div className="info-box">
        <p>
          광고 API는 아래처럼 일반 공고와 광고 공고가 섞인 배열로 응답한다.
          <br />
          <code>ad</code>가 없으면 일반 공고, 있으면 광고 공고다.
        </p>
        <pre>{JSON.stringify(
          AD_ACTIVITIES.map((item) => ({
            title: item.activity.title,
            isAd: !!item.ad,
          })),
          null,
          2
        )}</pre>
        <p className="error-text">
          ❌ 이 배열을 기존 <code>SwiperCards</code>에 넘기면 타입 에러 발생
        </p>
      </div>
    </div>
  );
}
