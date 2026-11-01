namespace InductionLab {
  export function memberChecks(state:PairState,instruction:string,records:boolean[],disabled=false):string{
    return `<div class="pair-checks"><p>${instruction}</p>${Array.from({length:state.members},(_,i)=>`<label class="paper-check"><input type="checkbox" aria-label="짝 ${i+1} · 종이에 기록했어요" data-member="${i}" ${records[i]?'checked':''} ${disabled?'disabled':''}><span>짝 ${i+1} 완료</span></label>`).join('')}</div>`;
  }
  function nextButton(label:string,enabled:boolean):string{return actionButton('advance',label,'primary',!enabled);}
  function progress(text:string,title:string):string{return `<span class="eyebrow">${text}</span><h2>${title}</h2>`;}
  function prompt(title:string,text:string):string{return `<div class="paper-prompt"><strong>${title}</strong><p>${text}</p></div>`;}
  export function pairPredictionView(state:PairState,records:boolean[]):string{
    return `${progress('학습지 2쪽 A 확인 → B · 약 2분','세 조건을 먼저 예상해요')}
      <div class="member-select" role="group" aria-label="함께하는 인원"><button data-members="2" aria-pressed="${state.members===2}">2명</button><button data-members="3" aria-pressed="${state.members===3}">3명</button><span>짝 번호를 정하세요.</span></div>
      <p>A에서 배운 내용을 확인하고, B의 ‘내 예측’을 각자 쓰세요.</p>
      <ol class="condition-cards">${PAIR_CONDITIONS.map(c=>`<li><strong>${c}</strong><span>코일은 고정</span></li>`).join('')}</ol>
      <p class="legend">○ 반응 있음 · × 보지 못함<br>? 모르거나 판단 어려움</p>
      ${memberChecks(state,'각자 세 칸을 모두 쓴 뒤, 자기 번호를 눌러요.',records)}
      ${nextButton('모두 예측 완료 · 관찰로',allRecorded(state,records))}
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
      ${nextButton(i===2?'세 관찰을 모아 · 가설 쓰기':'기록 완료 · 다음 짝이 조작',done&&allRecorded(state,records))}`;
  }
  export function pairHypothesisView(state:PairState,records:boolean[]):string{
    return `${progress('학습지 2쪽 C · 약 2분','비교한 내용으로 가설을 써요')}
      <p>B의 예측과 관찰을 비교해요. 어떤 두 조건이 설명의 근거가 될지 짝에게 말해 보세요.</p>
      <div class="sentence-frame"><strong>① C에 가설 한 문장</strong><p>“자석과 코일이 ______하면,<br>전류가 생길 것이다.”</p><strong>② 그렇게 생각한 까닭</strong><p>“B의 ___번과 ___번에서<br>______을 관찰했기 때문이다.”</p></div>
      ${memberChecks(state,'가설과 까닭을 쓰고 서로 설명했나요?',records)}
      ${nextButton('C 기록 완료 · 새 조건 예상',allRecorded(state,records))}
      <p class="paper-note">이 가설을 실제 실험으로 확인해요.</p>`;
  }
  export function pairTransferView(state:PairState,records:boolean[]):string{
    return `${progress('학습지 3쪽 D → E의 내 예측 · 약 2분','이번에는 자석을 고정해요')}
      <p>C의 가설대로라면 코일을 움직일 때는 어떨까요?</p>
      <ol class="condition-cards"><li><strong>④ 코일도 정지</strong></li><li><strong>⑤ 코일이 가까워짐</strong></li><li><strong>⑥ 코일이 멀어짐</strong></li></ol>
      ${prompt('실제 조작 전에','E의 ④~⑥ ‘내 예측’을 ○ / × / ?로 쓰고, 까닭을 차례로 말해요.')}
      ${memberChecks(state,'세 예측과 짝 설명을 각자 마쳤나요?',records)}
      ${nextButton('예측 완료 · 실제 장치로',allRecorded(state,records))}
      <p class="paper-note">이 세 조건은 교실의 실제 장치로 확인해요.</p>`;
  }
}
