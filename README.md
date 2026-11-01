# Faraday-lab

전자기 유도 짝 탐구 시뮬레이터입니다. 한 기기를 2~3명이 함께 사용하며 개인 활동지에 기록합니다.

## 활동 흐름
과학사 → 첫 가설과 까닭 → 조건 예측·비교 계획 → 자석 세 조건 가상 관찰 → 실제 여섯 조건·빠르기 비교 → 처음 가설 판단.

가상실험 뒤에는 관찰만 기록합니다. 가설 수정은 실제 실험을 마친 뒤 증거를 비교하며 합니다. A/B/C는 활동지 2쪽, D/E는 3쪽, F/G는 4쪽입니다. 빠르기 비교는 같은 구간에서 자석을 느리게/빠르게 넣을 때 최대 바늘 흔들림을 비교합니다.

## 실행
index.html을 브라우저에서 엽니다. 모든 폴더를 함께 보관합니다. 외부 API·로그인·학생 답안 전송을 사용하지 않습니다.

## GitHub Pages 최초 설정
저장소 Settings → Pages → Deploy from a branch → main / (root) → Save.
배포가 끝나면 같은 화면의 Visit site에서 학생용 주소를 확인합니다.

## 이후 수정과 게시
이 Faraday-lab 폴더가 앞으로의 수정 기준입니다.
1. 수정한 화면을 확인합니다. TypeScript를 수정했다면 scripts/의 JavaScript도 함께 빌드합니다.
2. GitHub Desktop에서 Faraday-lab을 선택하고 변경 내용을 확인합니다.
3. 변경 설명을 적고 Commit to main을 누릅니다.
4. Push origin을 누르면 GitHub Pages가 갱신됩니다.

컴퓨터의 파일 저장만으로 온라인 사이트가 바뀌지는 않습니다. Commit은 컴퓨터에 기록하고, Push가 GitHub로 올리는 단계입니다.

## 유지보수
물리 계산은 src/engine/에 있으며 애니메이션·계기는 같은 계산 프레임을 사용합니다. 수정 시 예측 전 결과 보호를 유지합니다. 작업 전 spec.md를 읽습니다.
글꼴은 assets/Pretendard-LICENSE.txt의 라이선스를 따릅니다.
