const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),ctx=vm.createContext({});
for(const f of ['pair-state.js','flow-types.js','engine/induction.js','engine/teacher-trial.js'])vm.runInContext(fs.readFileSync(path.join(root,'scripts',f),'utf8'),ctx);
const L=ctx.InductionLab,checks=[];
function check(name,fn){fn();checks.push({name,pass:true});}
for(const count of [2,3]){
 let s=L.pairTransition(L.freshPair(),{type:'members',count});const full=Array(count).fill(true),partial=Array(count).fill(false);partial[0]=true;
 check(`${count}인 첫 화면 과학사 우회 차단`,()=>assert.equal(L.pairTransition(s,{type:'history'}),s));
 check(`${count}인 가설 미완료 차단`,()=>assert.equal(L.pairTransition(s,{type:'advance',records:partial}),s));
 for(const stage of ['predict','observe']){
  check(`${count}인 ${s.stage} 과학사 우회 차단`,()=>assert.equal(L.pairTransition(s,{type:'history'}),s));
  check(`${count}인 ${stage} 전 미완료 차단`,()=>assert.equal(L.pairTransition(s,{type:'advance',records:partial}),s));
  s=L.pairTransition(s,{type:'advance',records:full});
  check(`${count}인 ${stage} 순서`,()=>assert.equal(s.stage,stage));
 }
 for(let i=0;i<3;i++){
  check(`${count}인 가상 관찰${i+1} 과학사 우회 차단`,()=>assert.equal(L.pairTransition(s,{type:'history'}),s));
  check(`${count}인 조건${i+1} 재생 전 차단`,()=>assert.equal(L.pairTransition(s,{type:'advance',records:full}),s));
  check(`${count}인 조건${i+1} 역할 교대`,()=>assert.equal(L.pairOperator(s),i%count+1));
  s=L.pairTransition(s,{type:'observed'});
  check(`${count}인 재관찰은 완료 해제`,()=>assert.equal(L.pairTransition(s,{type:'replay'}).observed[i],false));
  check(`${count}인 관찰 기록 미완료 차단`,()=>assert.equal(L.pairTransition(s,{type:'advance',records:partial}),s));
  s=L.pairTransition(s,{type:'advance',records:full});
 }
 check(`${count}인 세 관찰 뒤 가설 수정 없이 실제 준비`,()=>assert.equal(s.stage,'transfer'));
 for(const stage of ['practical','speed','judge','finish']){
  check(`${count}인 ${s.stage} 과학사 우회 차단`,()=>assert.equal(L.pairTransition(s,{type:'history'}),s));
  check(`${count}인 ${stage} 전 기록 확인`,()=>assert.equal(L.pairTransition(s,{type:'advance',records:partial}),s));
  s=L.pairTransition(s,{type:'advance',records:full});check(`${count}인 ${stage} 순서`,()=>assert.equal(s.stage,stage));
 }
 s=L.pairTransition(s,{type:'history'});
 check(`${count}인 F 완료 뒤 읽기 자료`,()=>assert.equal(s.stage,'history'));
 check(`${count}인 읽기 자료에서 진행 우회 없음`,()=>assert.equal(L.pairTransition(s,{type:'advance',records:full}),s));
 s=L.pairTransition(s,{type:'return'});
 check(`${count}인 읽기 자료에서 마무리 복귀`,()=>assert.equal(s.stage,'finish'));
 s=L.pairTransition(s,{type:'history'});
 check(`${count}인 읽기 자료 재진입`,()=>assert.equal(s.stage,'history'));
 const reset=L.pairTransition(s,{type:'reset'});
 check(`${count}인 읽기 자료 초기화 뒤 공개 차단`,()=>assert.equal(L.pairTransition(reset,{type:'history'}),reset));
 check(`${count}인 초기화`,()=>assert.equal(L.pairTransition(s,{type:'reset'}).stage,'hypothesis'));
}
const trials=L.buildTeacherTrials();
check('고정 조건과 세 구간',()=>{assert.equal(trials.length,3);assert.ok(trials[0].every(f=>f.emf===0&&f.needle===0));});
check('모든 프레임 유한값·고정 코일·시간 연속',()=>{for(const t of trials)t.forEach((f,i)=>{assert.ok(Object.values(f).every(Number.isFinite));assert.equal(f.coilY,.7);if(i)assert.ok(Math.abs(f.time-t[i-1].time-1/60)<1e-10);});});
check('접근·이탈 부호 반대와 안정',()=>{assert.ok(trials[1].some(f=>f.emf<-.1));assert.ok(trials[2].some(f=>f.emf>.1));for(const t of trials)assert.ok(Math.abs(t.at(-1).needle)<.01);});
fs.mkdirSync(path.join(root,'검증'),{recursive:true});
fs.writeFileSync(path.join(root,'검증/상태와계산.json'),JSON.stringify({checks},null,2));console.log(checks.length+'개 통과');
