// 공통 타입 정의

export type ActivityFragment = {
  id: string;
  title: string;
  company: string;
  deadline: string;
};

// 광고 API 응답 타입 — 일반 공고와 광고 공고가 섞인 배열로 온다
// ad가 없으면 일반 공고, ad가 있으면 광고 공고
export type ActivityWithAdFragment = {
  activity: ActivityFragment;
  ad?: {
    campaign?: {
      id: string;
    };
  };
};

// 목 데이터 — 일반 공고 탭용
export const ACTIVITIES: ActivityFragment[] = [
  { id: "1", title: "프론트엔드 개발자", company: "A사", deadline: "2026-04-01" },
  { id: "2", title: "백엔드 개발자", company: "B사", deadline: "2026-04-10" },
  { id: "3", title: "풀스택 개발자", company: "C사", deadline: "2026-04-15" },
  { id: "4", title: "iOS 개발자", company: "D사", deadline: "2026-04-20" },
];

// 목 데이터 — 광고 API 탭용 (일반 공고 + 광고 공고가 섞여서 옴)
export const AD_ACTIVITIES: ActivityWithAdFragment[] = [
  {
    activity: { id: "5", title: "안드로이드 개발자", company: "E사", deadline: "2026-04-05" },
    // ad 없음 → 일반 공고
  },
  {
    activity: { id: "6", title: "DevOps 엔지니어", company: "F사", deadline: "2026-04-08" },
    ad: { campaign: { id: "campaign-001" } }, // 광고 공고
  },
  {
    activity: { id: "7", title: "데이터 엔지니어", company: "G사", deadline: "2026-04-12" },
    // ad 없음 → 일반 공고
  },
  {
    activity: { id: "8", title: "ML 엔지니어", company: "H사", deadline: "2026-04-18" },
    ad: { campaign: { id: "campaign-002" } }, // 광고 공고
  },
];
