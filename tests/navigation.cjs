const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const context=vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(__dirname,'../scripts/pair-state.js'),'utf8'),context);
const L=context.InductionLab;let checks=0;
function check(name,run){try{run();checks++;}catch(error){throw new Error(name,{cause:error});}}
for(const count of [2,3]){
 const full=Array(count).fill(true),partial=Array(count).fill(false);partial[0]=true;
 let state=L.pairTransition(L.freshPair(),{type:'members',count});
 check('첫 단계 이전 이동 없음',()=>assert.equal(L.pairTransition(state,{type:'previous',records:partial}),state));
 for(let i=0;i<L.PAIR_STEPS.length-1;i++){
  check('진행 단계 일치',()=>assert.equal(L.pairStep(state),L.PAIR_STEPS[i]));
  if(state.stage==='observe'){
   check('재생 전 다음 이동 잠금',()=>assert.equal(L.canPairAdvance(state,full),false));
   state=L.pairTransition(state,{type:'observed'});
  }
  if(!['finish','history'].includes(state.stage)){
   check('일부 기록으로 다음 이동 차단',()=>assert.equal(L.canPairAdvance(state,partial),false));
  }
  const before=state;
  state=L.pairTransition(state,{type:'advance',records:full});
  state=L.pairTransition(state,{type:'previous',records:partial});
  check('바로 이전 세부 조건 복귀',()=>assert.equal(L.pairStep(state),L.pairStep(before)));
  check('이전 완료 확인 유지',()=>assert.deepEqual(Array.from(L.pairRecords(state)),full));
  check('완료 단계는 다시 관찰 없이 이동 가능',()=>assert.equal(L.canPairAdvance(state,L.pairRecords(state)),true));
  state=L.pairTransition(state,{type:'advance',records:L.pairRecords(state)});
  check('돌아간 단계의 일부 확인도 유지',()=>assert.deepEqual(Array.from(L.pairRecords(state)),partial));
 }
 check('마지막 단계 다음 이동 없음',()=>assert.equal(L.pairTransition(state,{type:'advance',records:full}),state));
 // 전체 완료 후 역방향으로 모든 세부 조건을 찾아갈 수 있다.
 for(let i=L.PAIR_STEPS.length-2;i>=0;i--){
  state=L.pairTransition(state,{type:'previous',records:L.pairRecords(state)});
  check('전체 역방향 순서',()=>assert.equal(L.pairStep(state),L.PAIR_STEPS[i]));
  check('이전 화면에서 읽기 우회 차단',()=>{if(state.stage!=='finish')assert.equal(L.pairTransition(state,{type:'history'}),state);});
 }
 const unchanged=L.pairTransition(state,{type:'members',count});
 check('같은 인원 선택 시 기록 유지',()=>assert.equal(unchanged,state));
 state=L.pairTransition(state,{type:'members',count:count===2?3:2});
 check('인원 변경 시 기존 확인 재사용 차단',()=>assert.equal(L.pairRecords(state).some(Boolean),false));
 check('인원 변경 시 관찰 상태 초기화',()=>assert.equal(state.observed.some(Boolean),false));
 for(let i=0;i<2;i++)state=L.pairTransition(state,{type:'advance',records:Array(state.members).fill(true)});
 check('B 예측에서 C 없이 첫 가상 관찰로 이동',()=>assert.equal(L.pairStep(state),'observe0'));
 state=L.pairTransition(state,{type:'observed'});
 state=L.pairTransition(state,{type:'advance',records:Array(state.members).fill(true)});
 state=L.pairTransition(state,{type:'previous',records:Array(state.members).fill(false)});
 state=L.pairTransition(state,{type:'replay'});
 check('다시 관찰 시작 시 기존 완료로 진행 차단',()=>assert.equal(L.canPairAdvance(state,Array(state.members).fill(true)),false));
 check('다시 관찰 시작 시 해당 확인 초기화',()=>assert.equal(L.pairRecords(state).some(Boolean),false));
}
console.log(`${checks}개 단계 이동 검사 통과`);
