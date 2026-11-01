namespace InductionLab {
  const DT=1/60,RADIUS=.45,FAR=1.35,NEAR=.35;
  // 축상 쌍극자의 원형 코일 자기선속에 비례하는 값. 실제 장비의 단위·보정값이 아니다.
  export function magneticFlux(distance:number):number{return RADIUS*RADIUS/Math.pow(RADIUS*RADIUS+distance*distance,1.5);}
  export function experimentPosition(mode:ExperimentMode,distance:number):{magnetY:number;coilY:number}{
    return mode==='magnet'?{magnetY:.7+distance,coilY:.7}:{magnetY:2.05,coilY:2.05-distance};
  }
  export function buildTrial(mode:ExperimentMode):ExperimentFrame[][] {
    let needle=0;
    return SEGMENTS[mode].map((segment,index)=>{
      // 첫 정지 관찰 뒤 준비 이동은 결과 배열에 포함하지 않고 계기를 안정시킨다.
      if(mode==='magnet'&&index===1)needle=0;
      const frames:ExperimentFrame[]=[],count=Math.round(segment.duration/DT);
      let previousFlux=magneticFlux(segment.near?NEAR:FAR);
      for(let i=0;i<=count;i++){
        const u=i/count,eased=u*u*(3-2*u);
        const distance=segment.motion==='approach'?FAR-(FAR-NEAR)*eased:segment.motion==='recede'?NEAR+(FAR-NEAR)*eased:segment.near?NEAR:FAR;
        const flux=magneticFlux(distance),emf=i===0?0:-(flux-previousFlux)/DT;
        // 바늘의 관성으로 이동 직후 잔흔이 남지만 안정 후에는 영점으로 돌아온다.
        if(i>0)needle+=(emf*.82-needle)*(1-Math.exp(-DT/.16));
        frames.push({time:i*DT,...experimentPosition(mode,distance),flux,emf,needle});previousFlux=flux;
      }
      return frames;
    });
  }
}
