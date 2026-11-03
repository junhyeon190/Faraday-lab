namespace InductionLab {
  export type PairStage='predict'|'observe'|'hypothesis'|'transfer'|'practical'|'speed'|'judge'|'finish'|'history';
  export type PairStep=Exclude<PairStage,'observe'>|'observe0'|'observe1'|'observe2';
  export interface PairState {stage:PairStage;members:2|3;condition:number;observed:boolean[];confirmations:Partial<Record<PairStep,boolean[]>>;}
  export type PairAction={type:'members';count:2|3}|{type:'advance'|'previous';records:boolean[]}|{type:'observed'}|{type:'replay'}|{type:'reset'}|{type:'history'}|{type:'return'};
  export const PAIR_STEPS:readonly PairStep[]=['hypothesis','predict','observe0','observe1','observe2','transfer','practical','speed','judge','finish','history'];
  export const PAIR_CONDITIONS=['① 가까이에 정지','② 가까워지는 동안','③ 멀어지는 동안'];
  export function freshPair():PairState{return {stage:'hypothesis',members:2,condition:0,observed:[false,false,false],confirmations:{}};}
  export function pairStep(state:PairState):PairStep{return state.stage==='observe'?(['observe0','observe1','observe2'] as const)[state.condition]:state.stage;}
  export function pairRecords(state:PairState):boolean[]{return [...(state.confirmations[pairStep(state)]??Array.from({length:state.members},()=>false))];}
  export function allRecorded(state:PairState,records:boolean[]):boolean{return records.length===state.members&&records.every(Boolean);}
  export function canPairAdvance(state:PairState,records:boolean[]):boolean{
    if(state.stage==='history')return false;
    if(state.stage==='finish')return true;
    return allRecorded(state,records)&&(state.stage!=='observe'||state.observed[state.condition]);
  }
  function movePair(state:PairState,direction:-1|1,records:boolean[]):PairState{
    const index=PAIR_STEPS.indexOf(pairStep(state)),step=PAIR_STEPS[index+direction];
    if(!step)return state;
    const confirmations={...state.confirmations,[pairStep(state)]:[...records]};
    const condition=['observe0','observe1','observe2'].indexOf(step);
    return condition>=0?{...state,stage:'observe',condition,confirmations}:{...state,stage:step as PairStage,confirmations};
  }
  export function pairTransition(state:PairState,action:PairAction):PairState{
    if(action.type==='reset')return freshPair();
    // 실제 증거로 가설을 판단한 뒤에만 발견 조건과 해설을 공개한다.
    if(action.type==='history')return state.stage==='finish'?{...state,stage:'history'}:state;
    if(action.type==='return')return state.stage==='history'?{...state,stage:'finish'}:state;
    if(action.type==='members'&&state.stage==='hypothesis')return state.members===action.count?state:{...freshPair(),members:action.count};
    if(action.type==='previous')return movePair(state,-1,action.records);
    if(action.type==='observed'&&state.stage==='observe')return {...state,observed:state.observed.map((v,i)=>v||i===state.condition)};
    if(action.type==='replay'&&state.stage==='observe')return {...state,observed:state.observed.map((v,i)=>i===state.condition?false:v),confirmations:{...state.confirmations,[pairStep(state)]:Array.from({length:state.members},()=>false)}};
    if(action.type!=='advance'||!canPairAdvance(state,action.records))return state;
    return movePair(state,1,action.records);
  }
  export function pairOperator(state:PairState,condition=state.condition):number{return condition%state.members+1;}
}
