# 콘텐츠 근거와 운영 기준

확인일: 2026-10-13. 공개 문의 담당자 석영준 / brinicle4865@naver.com 및 전화번호 미공개는 사용자의 직접 답변을 반영했다.

## 앱 구현 대조

| 앱 | 대조한 문서 및 코드 | 정책에 반영한 차이 |
| --- | --- | --- |
| TCON Maker | README, PhotoStore+Library, PhotoLibraryDisk, PhotoImport, ExportService, PersonSegmentation, SettingsView | 작업 사본·편집·얼굴 좌표·배경 마스크의 기기 보관, 사진 삭제와 폴더 삭제의 차이, 사진 추가·촬영·파일 선택 |
| Blog Cover Maker | README, Docs/ReleaseChecklist, WorkspaceSettings, 문서/리소스 구조 | .seolincover에 사진·추가 폰트 포함, 사용자 선택 위치에 문서/PNG 저장, Mac 앱 삭제 후 별도 문서·설정 잔존 |
| JumpRope Player | README, Docs/APP_STORE_RELEASE, LibraryStore, 설정과 권한 파일 | 파일 경로·북마크·순서표·타이밍 보관, JSON에 미디어 미포함, 원본 파일과 목록 삭제의 차이, 복구 사본 |

서버 수집 없음과 기기 내 처리를 구분했다. Apple/파일 제공자 백업, 사용자가 선택한 외부 공유, 문의 이메일, 웹 호스팅의 처리도 구분한다. 특정 얼굴의 신원 식별 기능이나 공식 TCON 규정 승인 기능을 주장하지 않는다.

## 공개 운영 기준

- 이메일 문의는 선택이며 발신자 주소·표시 이름·내용·첨부자료를 지원에만 사용한다.
- 문의 기록은 해결 후 30일 이내 삭제한다. 법정 의무·진행 중 분쟁의 경우 필요한 목적과 기간에 한해 보관한다. 운영 담당자가 이 기준대로 메일함을 관리한다.
- 얼굴 사진·원본 자료를 문의 첨부로 요청하지 않는다.
- 웹사이트에는 파일 업로드·회원가입·문의 양식·방문 분석·광고·추적 쿠키를 넣지 않는다.
- Vercel 접속 정보는 서비스 제공에 필요한 웹 호스팅 처리로 안내한다. 임의의 보관 일수나 처리 국가 목록을 만들어 쓰지 않는다.
- 실제 처리 방식·기능·외부 서비스가 바뀌면 한국어와 영어 정책, 시행/수정일, 버전과 앱스토어 답변을 함께 점검한다.

## 공식 참고 자료

- [Apple App privacy details](https://developer.apple.com/app-store/app-privacy-details/): 기기 내 처리와 수집 구분
- [Apple App Review Guidelines 5.1](https://developer.apple.com/app-store/review/guidelines/#privacy): 공개 정책과 앱 내 접근
- [개인정보보호위원회 안내서 목록](https://www.privacy.go.kr/front/bbs/bbsList.do?bbsNo=BBSMSTR_000000000049): 처리방침 항목 점검 참고
- [Vercel Privacy Notice](https://vercel.com/legal/privacy-notice)
- [Vercel Data Processing Addendum](https://vercel.com/legal/dpa)
- [NAVER 개인정보처리방침](https://policy.naver.com/policy/privacy.html)

공식 자료는 문서 작성 참고이며 앱의 실제 동작은 위 소스와 대조했다. 현재 방침과 이전 내용은 Git 이력으로 관리한다.
