namespace InductionLab {
  // 이미 계산된 이동과 안정 구간을 연결한다. 물리값을 다시 계산하지 않는다.
  export function buildTeacherTrials():ExperimentFrame[][]{
    const trial=buildTrial('magnet');
    const join=(motion:ExperimentFrame[],settle:ExperimentFrame[]):ExperimentFrame[]=>{
      const end=motion[motion.length-1].time;
      return [...motion,...settle.slice(1).map(frame=>({...frame,time:frame.time+end}))];
    };
    return [trial[0],join(trial[1],trial[2]),join(trial[3],trial[4])];
  }
}
