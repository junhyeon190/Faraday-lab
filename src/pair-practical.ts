namespace InductionLab {
  export function pairPracticalView(state:PairState,records:boolean[]):string{
    return `<span class="eyebrow">학습지 3쪽 · 방법 확인 → E</span><h2>이제 실제로 실험해요</h2>
      <p>선생님의 시작 안내를 듣고 장치를 조작해요.</p>
      <ol class="practical-rules"><li>코일과 검류계의 두 단자를 연결해요.</li><li>N극을 코일 쪽으로 두고, 검류계를 자석에서 떨어뜨려요.</li><li>같은 극·기울기·직선 경로를 유지해요.</li></ol>
      <table class="role-table"><caption>①~③ 다음 ④~⑥ · 각 두 번 관찰</caption><thead><tr><th>코일 고정</th><th>조작</th><th>자석 고정</th><th>조작</th></tr></thead><tbody>${Array.from({length:3},(_,i)=>`<tr><td>${['① 정지','② 가까이','③ 멀리'][i]}</td><td>짝 ${pairOperator(state,i)}</td><td>${['④ 정지','⑤ 가까이','⑥ 멀리'][i]}</td><td>짝 ${pairOperator(state,i+3)}</td></tr>`).join('')}</tbody></table>
      <p class="paper-note">모두 E에 실제 관찰 1·2를 새로 기록해요. 다르면 연결·극·기울기·관찰 순간을 확인하고 다시 봐요.</p>
      ${memberChecks(state,'①~⑥의 실제 관찰을 각자 기록했나요?',records)}
      ${actionButton('advance','여섯 조건 완료 · 빠르기 비교','primary',!allRecorded(state,records))}`;
  }
  export function pairSpeedView(state:PairState,records:boolean[]):string{
    return `<span class="eyebrow">학습지 3쪽 E-2 · 약 4분</span><h2>이번에는 빠르기만 바꿔요</h2>
      <p>코일은 고정해요. 같은 N극을 같은 구간에서 넣고 빠르기만 바꿔요.</p>
      <table class="role-table"><thead><tr><th>비교할 조건</th><th>같게 둘 것</th></tr></thead><tbody><tr><td>⑦ 느리게 넣기</td><td rowspan="2">자석·코일·연결<br>극·경로·시작과 끝</td></tr><tr><td>⑧ 빠르게 넣기</td></tr></tbody></table>
      <ol class="practical-rules"><li>바늘이 가장 크게 흔들린 폭을 비교해요.</li><li>⑦·⑧ 한 쌍을 관찰한 뒤 교대해요.</li><li>두 번째 비교도 같은 방법으로 해요.</li></ol>
      <p class="paper-note">다시 빼는 준비 동작은 비교에서 제외해요. 실제로 보인 결과를 E-2에 표시해요.</p>
      ${memberChecks(state,'두 번의 비교를 각자 기록했나요?',records)}
      ${actionButton('advance','실제 관찰 완료 · F에서 판단','primary',!allRecorded(state,records))}`;
  }
  export function pairJudgmentView(state:PairState,records:boolean[]):string{
    return `<span class="eyebrow">학습지 4쪽 F · 설명을 듣기 전</span><h2>실제 증거로 가설을 판단해요</h2>
      <div class="decision-words">유지 · 수정 · 판단 보류</div>
      <div class="sentence-frame"><strong>A의 처음 가설과 E를 비교하세요.</strong><p>“___번과 ___번을 비교하면<br>______을 알 수 있다.”</p><p>“따라서 내 가설을 ______한다.”</p></div>
      <p>먼저 각자 F에 쓰고, 어떤 증거가 생각을 뒷받침하는지 짝에게 말해요.</p>
      ${memberChecks(state,'나의 판단과 근거를 F에 남겼나요?',records)}
      ${actionButton('advance','F 기록 완료 · 전체 수업으로','primary',!allRecorded(state,records))}
      <p class="paper-note">확실하지 않으면 판단을 보류하고, 더 확인할 조건을 말해도 좋아요.</p>`;
  }
  export function pairFinishView():string{
    return `<span class="eyebrow">짝 탐구 마침</span><h2>우리의 기록을 가지고 모여요</h2>
      <ol class="practical-rules"><li>조작을 멈추고 기구를 정리해요.</li><li>선생님의 설명과 우리 기록을 연결해요.</li><li>안내에 따라 1쪽 패러데이, 4쪽 G로 이어가요.</li></ol>
      <div class="paper-prompt"><strong>생각의 변화도 탐구의 기록이에요.</strong><p>B의 처음 예측, A의 가설, F의 판단을 모두 남겨 주세요.</p></div>
      ${actionButton('history','패러데이와 과학의 본성 읽기','primary')}
      <p class="paper-note">실험을 마친 지금, 우리의 탐구를 패러데이의 삶과 발견에 연결해 봐요. 자세한 이야기는 펼쳐 읽을 수 있어요.</p>`;
  }
}
