# 사이트 구조

- `src/content`: 공통 운영 정보, 앱 소개·지원, 앱별 개인정보처리방침
- `src/templates`: 정적 HTML 렌더링
- `public/assets`: 로고, 공통 스타일, 홈 화면 효과
- `scripts`: 빌드, 로컬 미리보기, 링크·콘텐츠 검사
- `dist`: 생성된 배포 파일 (Git 제외)
- `.github`: 이슈·PR 템플릿과 정적 빌드 검증
- `vercel.json`: 정적 배포와 보안 응답 헤더

모든 문서는 정적 HTML로 생성하며 한국어와 영어는 독립된 URL을 사용한다. 홈의 장식 효과를 제외한 정책·지원 내용은 JavaScript 없이도 읽을 수 있다. 외부 폰트·CDN·광고·분석 SDK·쿠키·로그인을 사용하지 않는다.

Vercel 배포는 main을 출시 브랜치로 사용한다. 개발 작업은 develop으로 PR을 병합한다. Vercel 프로젝트 연결 정보와 인증 정보는 커밋하지 않는다.
