export const site = {
  name: 'SEOLIN Apps',
  operator: '서린태권도 · SEOLIN Apps',
  contact: { name: '석영준', email: 'brinicle4865@naver.com' },
  effectiveDate: '2026-10-13',
  url: process.env.SITE_URL || 'https://seolin-apps-site.vercel.app',
};

export const ui = {
  ko: {
    lang: 'ko', home: '홈', apps: '앱 둘러보기', support: '사용 안내 및 지원',
    privacy: '개인정보처리방침', contact: '문의하기', language: '언어 선택',
    skip: '본문으로 바로가기', by: '서린태권도에서 만듭니다.',
    updated: '시행일 · 최종 수정일', toc: '이 페이지의 내용', steps: '처음 사용하는 방법',
    faq: '자주 묻는 질문', tips: '사용 전에 확인해 주세요',
    contactTitle: '도움이 더 필요하신가요?', contactText: '앱 이름, 사용 기기와 운영체제 버전, 문제가 발생한 순서를 알려 주세요.',
    contactNote: '수련생의 얼굴 사진이나 개인정보가 포함된 원본 파일은 보내지 마세요. 화면을 첨부할 때는 개인정보를 가려 주세요.',
    manager: '지원 및 개인정보 문의 담당자', mail: '이메일로 문의하기',
    back: '전체 앱 보기', sitePrivacy: '웹사이트 개인정보 안내', top: '맨 위로',
    release: '출시 준비 중', websiteSummary: '서린 앱의 사용 안내와 개인정보처리방침을 한곳에서 확인하세요.',
    notFound: '페이지를 찾을 수 없어요', notFoundText: '주소가 변경되었거나 존재하지 않는 페이지입니다. 홈에서 앱을 다시 선택해 주세요.',
  },
  en: {
    lang: 'en', home: 'Home', apps: 'Explore apps', support: 'Help & support',
    privacy: 'Privacy policy', contact: 'Contact', language: 'Choose language',
    skip: 'Skip to content', by: 'Made by SEOLIN Taekwondo.',
    updated: 'Effective & last updated', toc: 'On this page', steps: 'Getting started',
    faq: 'Frequently asked questions', tips: 'Before you start',
    contactTitle: 'Need a hand?', contactText: 'Please include the app name, your device and OS version, and the steps that led to the problem.',
    contactNote: 'Please do not send original files containing students’ faces or personal information. Redact personal information from any screenshots.',
    manager: 'Support & privacy contact', mail: 'Contact by email',
    back: 'View all apps', sitePrivacy: 'Website privacy notice', top: 'Back to top',
    release: 'Preparing for release', websiteSummary: 'Help, support and privacy information for apps made by SEOLIN.',
    notFound: 'Page not found', notFoundText: 'This page may have moved or the address may be incorrect. Choose an app from the home page.',
  },
};
