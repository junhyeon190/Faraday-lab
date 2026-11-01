// 첫 프레임 시각이 클릭 시각보다 이른 경우와 중단·재개 경계를 재현한다.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),checks={};
function harness(){
  let next=0;const pending=new Map(),seen=[];
  const context=vm.createContext({performance:{now:()=>100},
    requestAnimationFrame:callback=>{pending.set(++next,callback);return next;},
    cancelAnimationFrame:id=>pending.delete(id)});
  for(const file of ['flow-types','engine/induction','playback'])vm.runInContext(fs.readFileSync(path.join(root,'scripts',file+'.js'),'utf8'),context);
  const lab=context.InductionLab;let player;
  const observe=()=>{const frame=player.current();assert(frame,'표시할 프레임이 없어서는 안 된다.');assert(Object.values(frame).every(Number.isFinite));seen.push(frame);};
  player=new lab.ExperimentPlayback(observe,observe);
  const step=time=>{assert.equal(pending.size,1);const [id,callback]=pending.entries().next().value;pending.delete(id);callback(time);};
  return {player,step,pending,seen,trials:lab.buildTrial('magnet')};
}
const h=harness();h.player.load(h.trials[1]);h.player.play();h.step(99);
checks.firstFrameBeforeClick=h.player.index===0&&h.player.current().magnetY===h.trials[1][0].magnetY;
h.step(1099);
checks.motionAdvances=h.player.index===60&&h.player.current().magnetY<h.trials[1][0].magnetY;
const stopped=h.player.current();h.player.pause();
checks.pauseKeepsVisibleFrame=h.player.status==='paused'&&h.pending.size===0&&h.player.current()===stopped;
h.player.resume();h.step(50000);
checks.resumeDoesNotSkip=h.player.current()===stopped;
h.step(49999);
checks.backwardTimestampDoesNotRewind=h.player.current()===stopped;
h.step(52000);
checks.completesAtLastFrame=h.player.status==='done'&&h.player.index===180&&h.pending.size===0;
h.player.play();h.step(98);
checks.replayRestartsSafely=h.player.index===0&&h.player.replays===1;
h.player.load(h.trials[3]);
checks.newSegmentCancelsOldFrame=h.pending.size===0&&h.player.status==='idle'&&h.player.index===0&&h.player.replays===0;
h.player.play();h.player.pause();h.player.resume();h.step(97);
checks.pauseBeforeFirstFrame=h.player.index===0&&h.pending.size===1;
h.step(100000);
checks.delayedFrameCompletes=h.player.status==='done'&&h.player.index===180;
h.player.load([]);h.player.play();
checks.emptyPlaybackIsIdle=h.player.status==='idle'&&h.pending.size===0;
assert(Object.values(checks).every(Boolean),JSON.stringify(checks,null,2));
fs.writeFileSync(path.join(root,'검증','질문과재생_자동검증.json'),JSON.stringify(checks,null,2));
console.log(`${Object.keys(checks).length}개 재생 경계 검사 통과`);
