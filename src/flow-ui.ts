namespace InductionLab {
  export function el<T extends HTMLElement>(id:string):T {const value=document.getElementById(id);if(!value)throw new Error('화면을 준비하지 못했습니다.');return value as T;}
  export function escapeText(value:string):string{return value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));}
  export function actionButton(id:string,text:string,kind='primary',disabled=false):string{return `<button type="button" data-action="${id}" class="${kind}"${disabled?' disabled':''}>${text}</button>`;}
  export function setupView(step:number):string {
    const actions=['코일을 실험 위치에 놓기','코일의 빨간 단자 선택','검류계의 빨간 단자에 연결','코일의 검은 단자 선택','검류계의 검은 단자에 연결'];
    const descriptions=['자석과 코일의 축을 맞추고, 검류계는 옆에 둡니다.','빨간 전선의 출발 단자를 선택하세요.','빨간 전선의 도착 단자를 선택하세요.','검은 전선의 출발 단자를 선택하세요.','검은 전선의 도착 단자를 선택하세요.'];
    return `<span class="eyebrow">장치 연결 · ${Math.min(step+1,5)} / 5</span><h2>코일과 검류계 연결</h2><p>${descriptions[step]||'두 전선이 연결됐습니다. 이제 첫 가설과 예측을 남겨요.'}</p><ol class="connection-list"><li>${step>0?'✓':'○'} 코일 위치 맞추기</li><li>${step>=3?'✓':'○'} 빨간 단자 ↔ 빨간 단자</li><li>${step>=5?'✓':'○'} 검은 단자 ↔ 검은 단자</li></ol><div class="notice">화면의 표시를 누르거나 아래 버튼을 누르세요. 전지는 연결하지 않습니다.</div>${step<5?actionButton('setup',actions[step]):actionButton('prediction','첫 예측으로 →')}`;
  }
  export function fixView(step:number):string {
    return `<span class="eyebrow">두 번째 실험 준비</span><h2>이번에는 자석을 고정</h2><p>클램프가 자석의 윗부분을 잡도록 끼우고, 집게의 조임나사를 조여요.</p><ol class="connection-list"><li>${step>=1?'✓':'○'} 자석의 윗부분 끼우기</li><li>${step>=2?'✓':'○'} 집게 조임나사 조이기</li></ol><p class="notice">고정한 자석은 그대로 두고, 다음 실험에서 코일을 움직입니다.</p>${actionButton(step<2?'fix':'prediction2',step===0?'자석을 클램프에 끼우기':step===1?'집게 조임나사 조이기':'코일 이동 예측으로 →')}`;
  }
}
