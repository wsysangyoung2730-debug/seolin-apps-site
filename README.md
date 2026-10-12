# SEOLIN Apps

서린태권도에서 만든 앱의 소개, 사용 안내, 지원 및 개인정보처리방침을 제공하는 공식 웹사이트입니다.

- TCON Maker by SEOLIN — iPhone · iPad
- BLOG COVER MAKER by SEOLIN — Mac · iPad
- JUMPROPE PLAYER by SEOLIN — Mac · iPad

## 실행과 검증

Node.js 22 이상. 외부 패키지 설치가 필요 없습니다.

```sh
npm run build
npm run check
npm run preview
```

미리보기 주소: http://127.0.0.1:4173. `PORT` 환경변수로 포트를 바꿀 수 있습니다. 배포 파일은 `dist/`에 생성합니다.

## 페이지

한국어 홈은 `/`, 영어 홈은 `/en/`입니다. 모든 문서는 JavaScript 없이 읽을 수 있습니다. 홈의 장식 효과만 Canvas를 사용하며 움직임 줄이기와 미지원 환경에서는 기본 워드마크를 표시합니다.

| 앱 | 지원 | 개인정보처리방침 |
| --- | --- | --- |
| TCON Maker | `/tcon-maker/support/` | `/tcon-maker/privacy/` |
| Blog Cover Maker | `/blog-cover-maker/support/` | `/blog-cover-maker/privacy/` |
| JumpRope Player | `/jumprope-player/support/` | `/jumprope-player/privacy/` |

영어는 같은 주소 앞에 `/en`을 붙입니다. 사이트 자체의 개인정보 안내는 `/privacy/`, 영어는 `/en/privacy/`입니다.

## 수정 위치

- 앱 소개·사용 순서·FAQ: `src/content/apps.mjs`
- 앱별 정책·사이트 정책: `src/content/privacy.mjs`
- 담당자·시행일·기본 주소·공통 문구: `src/content/site.mjs`
- 화면 구성: `src/templates/html.mjs`
- 스타일·로고·메인 효과: `public/assets/`

기본 운영 주소는 `https://seolin-apps-site.vercel.app`입니다. 다른 도메인에서는 `SITE_URL`을 설정해 canonical·사이트맵·404 주소를 함께 갱신합니다.

## 개발 규칙

- `main`: 출시용 브랜치 / `develop`: 개발 통합 브랜치
- 작업 브랜치: `태그/#이슈번호-작업범위`
- 커밋: `[소문자 태그] 한글 명령조 제목` (50자 이내)
- 이슈에 브랜치·작업 목적·주요 작업·완료 기준을 기록합니다.
- 작업 브랜치에 최신 `develop`을 병합하고 `develop` 대상 PR로 완료한 기능을 통합합니다.
- 출시할 때 검증한 `develop`을 PR로 `main`에 병합합니다.

## 공개 문의 담당자

석영준 / brinicle4865@naver.com. 전화번호는 공개하지 않습니다.

[구조](Docs/PROJECT_STRUCTURE.md) · [에셋 출처](Docs/ASSET_SOURCES.md) · [콘텐츠 근거 및 운영 기준](Docs/CONTENT_AUDIT.md)
