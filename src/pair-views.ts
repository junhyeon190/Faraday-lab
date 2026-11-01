namespace InductionLab {
  export function memberChecks(state:PairState,instruction:string,records:boolean[],disabled=false):string{
    return `<div class="pair-checks"><p>${instruction}</p>${Array.from({length:state.members},(_,i)=>`<label class="paper-check"><input type="checkbox" aria-label="짝 ${i+1} · 종이에 기록했어요" data-member="${i}" ${records[i]?'checked':''} ${disabled?'disabled':''}><span>짝 ${i+1} 완료</span></label>`).join('')}</div>`;
  }
  function nextButton(label:string,enabled:boolean):string{return actionButton('advance',label,'primary',!enabled);}
  function progress(text:string,title:string):string{return `<span class="eyebrow">${text}</span><h2>${title}</h2>`;}
  function prompt(title:string,text:string):string{return `<div class="paper-prompt"><strong>${title}</strong><p>${text}</p></div>`;}
  export function pairPredictionView(state:PairState,records:boolean[]):string{
    return `${progress('학습지 2쪽 B · 약 1분','세 조건을 먼저 예상해요')}

      <p>A의 가설이 맞다면 어떨까요? B의 ‘내 예측’을 각자 쓰세요.</p>
      <ol class="condition-cards">${PAIR_CONDITIONS.map(c=>`<li><strong>${c}</strong><span>코일은 고정</span></li>`).join('')}</ol>
      <p class="legend">○ 반응 있음 · × 보지 못함<br>? 모르거나 판단 어려움</p>
      ${memberChecks(state,'각자 세 칸을 모두 쓴 뒤, 자기 번호를 눌러요.',records)}
      ${nextButton('B 기록 완료 · 실험 계획으로',allRecorded(state,records))}
      <p class="paper-note">서로 다른 예측도 그대로 남겨요. 정지는 바늘이 안정된 뒤를 뜻해요.</p>`;
  }
  export function pairObservationView(state:PairState,status:PlaybackStatus,records:boolean[]):string{
    const i=state.condition,done=status==='done',op=pairOperator(state);
    const control=status==='running'?actionButton('pause','재생 잠시 멈추기','secondary'):status==='paused'?actionButton('resume','이어서 관찰하기'):actionButton('play',done?'같은 조건 다시 보기':'이 조건 관찰하기');
    return `${progress(`학습지 2쪽 B · 조건 ${i+1}/3`,PAIR_CONDITIONS[i])}
      <div class="role-strip">조작: 짝 ${op} · 함께 바늘 관찰</div>
      <p>${i===0?'두 기구를 그대로 두고, 안정된 뒤를 관찰해요.':'자석이 움직이는 동안과 멈춘 뒤를 이어서 살펴보세요.'}</p>
      <div class="run-buttons">${control}</div>
      ${status==='paused'?'<p class="notice">화면 재생만 멈췄어요. 실제 자석을 정지시킨 조건과 달라요.</p>':''}
      ${i===1&&status==='idle'?'<p class="paper-note">자석을 먼 시작 위치로 준비했어요. 준비 이동은 관찰에 넣지 않아요.</p>':''}
      ${prompt(done?'B의 ‘가상 관찰’에 각자 기록':'각자 기록할 준비','○ / × / ?로 적고 짝과 비교해요. 다르게 보았다면 다시 관찰해요. 처음 예측은 지우지 않아요.')}
      ${memberChecks(state,done?'기록을 마친 사람이 자기 번호를 눌러요.':'끝까지 관찰하면 기록 확인을 할 수 있어요.',records,!done)}
      ${nextButton(i===2?'관찰 기록 완료 · 실제 장치 준비':'기록 완료 · 다음 짝이 조작',done&&allRecorded(state,records))}`;
  }
  export function pairHypothesisView(state:PairState,records:boolean[]):string{
    return `${progress('학습지 2쪽 A · 약 3분','과학사에서 나의 가설로')}
      <div class="member-select" role="group" aria-label="함께하는 인원"><button data-members="2" aria-pressed="${state.members===2}">2명</button><button data-members="3" aria-pressed="${state.members===3}">3명</button><span>짝 번호를 정하세요.</span></div>
      <p>외르스테드: 전류가 흐르는 도선 주위에는 자기장이 생겨요.</p>
      <div class="sentence-frame"><strong>반대로, 자석으로 전류를 만들려면?</strong><p>“자석과 코일이 ______하면,<br>전류가 생길 것이다.”</p><p>“그렇게 생각한 까닭은 ______이다.”</p></div>
      <p class="paper-note">조건과 까닭을 각자 쓰고 짝에게 설명해요. 서로 다른 가설도 그대로 남겨요.</p>
      ${memberChecks(state,'가설과 까닭을 쓰고 서로 설명했나요?',records)}
      ${nextButton('A 기록 완료 · 내 가설로 예측',allRecorded(state,records))}`;
  }
  export function pairPlanView(state:PairState,records:boolean[]):string{
    return `${progress('학습지 2쪽 C · 약 2분','무엇을 비교해 볼까요?')}
      <p>A의 가설대로라면 자석을 고정하고 코일을 움직일 때는 어떨까요?</p>
      <ol class="condition-cards"><li><strong>④ 코일도 정지</strong></li><li><strong>⑤ 코일이 가까워짐</strong></li><li><strong>⑥ 코일이 멀어짐</strong></li></ol>
      ${prompt('빠르기 비교도 먼저 예상해요','같은 자석을 같은 구간에서 느리게·빠르게 넣으면, 바늘이 가장 크게 흔들린 폭은 어떨까요?')}
      <p>같게 둘 조건 한 가지도 C에 적어요.</p>
      ${memberChecks(state,'C의 예측과 비교 계획을 각자 기록했나요?',records)}
      ${nextButton('계획 완료 · 세 조건 가상 관찰',allRecorded(state,records))}`;
  }
  export function pairTransferView(state:PairState,records:boolean[]):string{
    return `${progress('학습지 3쪽 D · 약 2분','처음 가설을 실제로 검증해요')}
      <p>가상 관찰은 B에 남겨요. A의 가설은 그대로 두고 실제 실험으로 확인해요.</p>
      <ol class="practical-rules"><li>D의 그림대로 코일과 검류계를 연결해요.</li><li>같은 극·기울기·경로를 유지해요.</li><li>한 조건을 두 번 관찰한 뒤 조작자를 바꿔요.</li></ol>
      ${prompt('검류계는 자석에서 떨어뜨려요','바늘을 직접 끌어당기거나 계기를 흔들지 않도록 배치해요.')}
      ${memberChecks(state,'기구와 역할을 함께 확인했나요?',records)}
      ${nextButton('준비 완료 · 실제 장치로',allRecorded(state,records))}`;
  }
}
