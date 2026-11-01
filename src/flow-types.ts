namespace InductionLab {
  export type ExperimentMode='magnet'|'coil';
  export type FlowPhase='setup'|'predict1'|'run1'|'judge1'|'fix'|'predict2'|'run2'|'compare'|'finish';
  export type Prediction='moves'|'still'|'unsure';
  export type ObservationValue='yes'|'no'|'unclear';
  export type Decision='keep'|'revise'|'defer';
  export interface FirstPrediction {hypothesis:string;reason:string;still:Prediction;approach:Prediction;recede:Prediction;control:string;}
  export interface SecondPrediction {approach:Prediction;recede:Prediction;reason:string;}
  export interface Judgment {decision:Decision;reason:string;}
  export interface Observation {value:ObservationValue;replays:number;}
  export interface LabRecord {
    version:2;phase:FlowPhase;setupStep:number;fixStep:number;first:FirstPrediction|null;second:SecondPrediction|null;
    magnet:Observation[];coil:Observation[];firstJudgment:Judgment|null;finalJudgment:Judgment|null;
  }
  export interface ExperimentFrame {time:number;magnetY:number;coilY:number;flux:number;emf:number;needle:number;}
  export interface Segment {title:string;action:string;motion:'still'|'approach'|'recede';near:boolean;duration:number;}
  export const MODE_NAME:Record<ExperimentMode,string>={magnet:'자석',coil:'코일'};
  export const OBS_NAME:Record<ObservationValue,string>={yes:'○ 검류계 바늘의 움직임이 관찰됨',no:'× 검류계 바늘의 움직임이 관찰되지 않음',unclear:'? 검류계 바늘을 못 봤거나 반응이 불분명함'};
  export const PRED_NAME:Record<Prediction,string>={moves:'검류계 바늘이 움직임',still:'검류계 바늘이 안 움직임',unsure:'검류계 바늘의 반응을 아직 모름'};
  export const DECISION_NAME:Record<Decision,string>={keep:'유지',revise:'수정',defer:'판단 보류'};
  export function freshRecord():LabRecord{return {version:2,phase:'setup',setupStep:0,fixStep:0,first:null,second:null,magnet:[],coil:[],firstJudgment:null,finalJudgment:null};}
  export const SEGMENTS:Record<ExperimentMode,Segment[]>={
    magnet:[
      {title:'가까운 위치에서 둘 다 정지',action:'정지 상태 관찰하기',motion:'still',near:true,duration:3},
      {title:'자석을 가까이하는 동안',action:'자석 가까이 움직이기',motion:'approach',near:false,duration:3},
      {title:'가까이한 뒤 멈추고 안정',action:'멈춘 뒤 관찰하기',motion:'still',near:true,duration:3},
      {title:'자석을 멀리하는 동안',action:'자석 멀리 움직이기',motion:'recede',near:true,duration:3},
      {title:'멀리한 뒤 멈추고 안정',action:'멈춘 뒤 관찰하기',motion:'still',near:false,duration:3}],
    coil:[
      {title:'코일을 가까이하는 동안',action:'코일 가까이 움직이기',motion:'approach',near:false,duration:3},
      {title:'가까이한 뒤 멈추고 안정',action:'멈춘 뒤 관찰하기',motion:'still',near:true,duration:3},
      {title:'코일을 멀리하는 동안',action:'코일 멀리 움직이기',motion:'recede',near:true,duration:3},
      {title:'멀리한 뒤 멈추고 안정',action:'멈춘 뒤 관찰하기',motion:'still',near:false,duration:3}]
  };
}
