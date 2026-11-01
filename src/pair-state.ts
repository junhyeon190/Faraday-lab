namespace InductionLab {
  export type PairStage='predict'|'observe'|'hypothesis'|'plan'|'transfer'|'practical'|'speed'|'judge'|'finish'|'history';
  export interface PairState {stage:PairStage;members:2|3;condition:number;observed:boolean[];}
  export type PairAction={type:'members';count:2|3}|{type:'advance';records:boolean[]}|{type:'observed'}|{type:'replay'}|{type:'reset'}|{type:'history'}|{type:'return'};
  export const PAIR_CONDITIONS=['① 가까이에 정지','② 가까워지는 동안','③ 멀어지는 동안'];
  export function freshPair():PairState{return {stage:'hypothesis',members:2,condition:0,observed:[false,false,false]};}
  export function allRecorded(state:PairState,records:boolean[]):boolean{return records.length===state.members&&records.every(Boolean);}
  export function pairTransition(state:PairState,action:PairAction):PairState{
    if(action.type==='reset')return freshPair();
    // 실제 증거로 가설을 판단한 뒤에만 발견 조건과 해설을 공개한다.
    if(action.type==='history')return state.stage==='finish'?{...state,stage:'history'}:state;
    if(action.type==='return')return state.stage==='history'?{...state,stage:'finish'}:state;
    if(action.type==='members'&&state.stage==='hypothesis')return {...state,members:action.count};
    if(action.type==='observed'&&state.stage==='observe')return {...state,observed:state.observed.map((v,i)=>v||i===state.condition)};
    if(action.type==='replay'&&state.stage==='observe')return {...state,observed:state.observed.map((v,i)=>i===state.condition?false:v)};
    if(action.type!=='advance'||!allRecorded(state,action.records))return state;
    if(state.stage==='hypothesis')return {...state,stage:'predict'};
    if(state.stage==='predict')return {...state,stage:'plan'};
    if(state.stage==='plan')return {...state,stage:'observe'};
    if(state.stage==='observe'){
      if(!state.observed[state.condition])return state;
      return state.condition<2?{...state,condition:state.condition+1}:{...state,stage:'transfer'};
    }
    const next:Partial<Record<PairStage,PairStage>>={transfer:'practical',practical:'speed',speed:'judge',judge:'finish'};
    return next[state.stage]?{...state,stage:next[state.stage] as PairStage}:state;
  }
  export function pairOperator(state:PairState,condition=state.condition):number{return condition%state.members+1;}
}
