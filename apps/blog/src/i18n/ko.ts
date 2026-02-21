export const ko = {
  nav: {
    post: '글',
    road: '기록',
    about: '소개',
  },
  home: {
    description: '프론트엔드 개발자 이종길입니다.',
  },
  post: {
    readMore: '더 읽기',
    readingTime: '분 읽기',
    category: {
      all: '전체',
      development: '개발',
      study: '학습',
      reading: '독서',
      essay: '에세이',
    },
  },
  road: {
    description: '일상과 생각을 기록합니다.',
  },
  about: {
    title: '소개',
  },
  common: {
    backToList: '목록으로',
    notFound: '페이지를 찾을 수 없습니다.',
    goHome: '홈으로',
  },
} as const;

export type Translation = typeof ko;
