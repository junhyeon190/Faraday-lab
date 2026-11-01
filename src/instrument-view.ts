namespace InductionLab {
  export type PlaybackStatus='idle'|'running'|'paused'|'done';
  export function drawInstrument(frames:ExperimentFrame[],index:number,status:PlaybackStatus):void {
    const frame=frames[index];if(!frame)return;
    const angle=frame.needle*57.3;el('gaugeNeedle').setAttribute('transform',`rotate(${angle} 115 94)`);
    const maxTime=frames[frames.length-1].time;
    const points=frames.slice(0,index+1).map(f=>`${(f.time/maxTime*460).toFixed(1)},${(50-f.needle*44).toFixed(1)}`).join(' ');
    el('traceLine').setAttribute('points',points);
    el('playStatus').textContent=status==='running'?`관찰 중 ${frame.time.toFixed(1)}초`:status==='paused'?'재생 일시 정지':status==='done'?'구간 끝 · 화면 정지':'관찰 전';
    el('gauge').setAttribute('aria-label',status==='idle'?'검류계 · 관찰 전':`검류계 바늘: ${Math.abs(frame.needle)<.02?'영점 부근':frame.needle>0?'오른쪽으로 기울어짐':'왼쪽으로 기울어짐'}`);
  }
}
