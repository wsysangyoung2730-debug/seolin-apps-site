# Vercel 운영

## 운영 주소

https://seolin-apps-site.vercel.app

| 앱 | 지원 URL | 개인정보처리방침 URL |
| --- | --- | --- |
| TCON Maker | https://seolin-apps-site.vercel.app/tcon-maker/support/ | https://seolin-apps-site.vercel.app/tcon-maker/privacy/ |
| Blog Cover Maker | https://seolin-apps-site.vercel.app/blog-cover-maker/support/ | https://seolin-apps-site.vercel.app/blog-cover-maker/privacy/ |
| JumpRope Player | https://seolin-apps-site.vercel.app/jumprope-player/support/ | https://seolin-apps-site.vercel.app/jumprope-player/privacy/ |

영어 주소는 앱 경로 앞에 `/en`을 붙인다. 사이트 정책은 `/privacy/`와 `/en/privacy/`이다.

## 배포 구성

- Vercel 프로젝트: `seolin-apps-site`
- Vercel 계정의 기존 팀: `wcif-culture-keeper`
- 정적 빌드: `npm run build`, 출력: `dist`
- 설정: `vercel.json`; 도메인 변경 시 `SITE_URL`도 변경
- 실제 운영 공개는 main의 검증된 커밋에서 진행
- 인증 정보, `.vercel/`, `.env*`는 저장소에 포함하지 않는다.
- 기본 보안 헤더와 CSP를 적용한다. 서버 API·사용자 업로드·DB·분석 도구는 없다.

## 업데이트

1. 범위별 이슈와 작업 브랜치를 생성한다.
2. 변경 후 `npm run build` 및 `npm run check`를 실행한다.
3. 최신 develop을 작업 브랜치에 병합한 뒤 develop 대상 PR을 병합한다.
4. 출시할 develop을 main 대상 PR로 병합한다.
5. main에서 Vercel CLI로 Production 배포하고 반환된 운영 주소와 상태를 확인한다.

```sh
npx vercel --prod --yes --scope wcif-culture-keeper
```

이 컴퓨터의 기존 Vercel 로그인을 사용한다. 초기 프로젝트 생성 중 Vercel의 GitHub 저장소 연결은 권한 오류로 완료되지 않았다. 이 배포는 인증된 Vercel CLI로 수행하며 GitHub push 자동 배포를 전제로 하지 않는다. 자동 배포가 필요하면 Vercel 대시보드에서 해당 공개 저장소의 Git 연결을 완료한다.

## 앱스토어 연결

각 앱의 지원 URL과 정책 URL을 해당 App Store Connect 항목에 입력한다. 앱 내부 설정·정보 화면에서도 정책을 쉽게 열 수 있도록 연결해야 한다. 이 사이트 작업만으로 앱 바이너리나 App Store Connect 등록 내용이 자동 변경되지는 않는다.

## 확인 기록

- 2026-10-13: 한국어·영어 16페이지와 404 정적 빌드 성공.
- 2026-10-13: 312개 내부 링크·언어·앵커·에셋·승인된 연락처·정책 항목 검사 통과.
- 최종 운영 배포 결과와 대표 화면은 관련 배포 이슈에 기록한다.
