namespace InductionLab {
  function element<T extends HTMLElement>(id:string):T {
    const el=document.getElementById(id);if(!el)throw new Error('화면을 준비하지 못했습니다. 다시 열어 주세요.');return el as T;
  }
  const store=new AssemblyStorage();
  let savedState=store.load(),state=initialState();
  const canvas=element<HTMLCanvasElement>('labCanvas');
  const primary=element<HTMLButtonElement>('primaryAction'),secondary=element<HTMLButtonElement>('secondaryAction');
  const pick=element<HTMLButtonElement>('clampPick'),port=element<HTMLButtonElement>('portPick'),screw=element<HTMLButtonElement>('screwPick');
  const feedback=element('feedback'),saveStatus=element('saveStatus'),reset=element<HTMLButtonElement>('reset');
  const startChoice=element<HTMLDialogElement>('startChoice');
  let scene:LabScene,waitingForStart=false;
  function showError(message:string):void {
    waitingForStart=false;
    if(startChoice.open)startChoice.close();
    element('loading').hidden=true;element('errorBox').hidden=false;element('errorText').textContent=message;
    primary.disabled=true;secondary.disabled=true;reset.disabled=true;pick.hidden=true;port.hidden=true;screw.hidden=true;
    document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(b=>b.disabled=true);
  }
  function position(el:HTMLElement,point:ScreenPoint,dx=0,dy=0):void {
    el.style.left=`${point.x+dx}px`;el.style.top=`${point.y+dy}px`;
  }
  function redraw():void {
    scene.draw(state);
    element('standLabel').hidden=state.view==='close';
    position(element('standLabel'),scene.standLabel(),-75,88);
    const handle=scene.handle(state),portPoint=scene.port();
    position(pick,{x:clamp(handle.x,90,canvas.clientWidth-100),y:handle.y},0,-28);
    position(port,portPoint);position(screw,portPoint,35,-65);
  }
  function persist():void {
    const ok=store.save(state);saveStatus.textContent=ok?'✓ 이 기기에 조립 상태를 저장했어요.':store.warning;
    // 실제 저장이 성공했을 때만 저장 완료를 알린다.
    saveStatus.classList.toggle('warning',!ok);
  }
  function render(message?:string,save=false):void {
    const stage=state.stage,connected=stage==='inserted'||stage==='fixed';
    const labels:Record<Stage,string>={ready:'클램프 집기',holding:'스탠드에 끼우기',inserted:'고정나사 조이기',fixed:'✓ 고정 완료'};
    const descriptions:Record<Stage,string>={
      ready:'먼저 클램프를 집어 보세요.',holding:'스탠드의 연결 위치를 누르거나, 클램프의 연결부를 그곳까지 끌어 주세요.',
      inserted:'클램프를 끼웠어요. 고정나사를 조여 마무리해 주세요.',fixed:'클램프가 스탠드에 단단히 고정됐어요.'
    };
    primary.textContent=labels[stage];primary.disabled=stage==='fixed';
    secondary.textContent=stage==='fixed'?'나사 풀기':stage==='inserted'?'분리하기':'선택 취소';secondary.disabled=stage==='ready';
    reset.disabled=stage==='ready';
    pick.hidden=connected;pick.textContent=stage==='holding'?'✓ 클램프 선택됨':'＋ 클램프 집기';pick.classList.toggle('selected',stage==='holding');
    port.hidden=stage!=='holding';screw.hidden=stage!=='inserted';
    const badge=element('stageBadge');badge.textContent=`${stage==='fixed'?'✓':connected?'◐':'○'} ${LABELS[stage]}`;badge.className=`stage-badge ${stage}`;
    feedback.textContent=message||descriptions[stage];
    element('completeNote').hidden=stage!=='fixed';element('continueLab').hidden=stage!=='fixed';
    element('canvasHint').textContent=stage==='fixed'?'연결부를 확대해서 고정된 모습을 살펴보세요.':stage==='inserted'?'고정나사를 조이면 클램프가 고정돼요.':'클램프를 누르거나, 연결 위치까지 끌어 보세요.';
    const current=stage==='ready'?1:stage==='holding'?2:3;
    for(let i=1;i<=3;i++){
      const step=element(`step${i}`),done=stage==='fixed'||i<current;
      step.className=done?'done':i===current?'current':'';
      if(!done&&i===current)step.setAttribute('aria-current','step');else step.removeAttribute('aria-current');
      const badge=step.querySelector('.step-number');if(badge)badge.textContent=done?'✓':String(i);
    }
    document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(b=>{
      b.disabled=b.dataset.view==='close'&&!connected;b.setAttribute('aria-pressed',String(b.dataset.view===state.view));
    });
    if(save)persist();redraw();
  }
  function select():void {if(state.stage==='ready'){state.stage='holding';render();}}
  function attach():void {if(state.stage==='holding'){state.stage='inserted';state.clampPosition=[...PORT];render(undefined,true);}}
  function tighten():void {if(state.stage==='inserted'){state.stage='fixed';render(undefined,true);}}
  function back():void {
    if(state.stage==='fixed'){state.stage='inserted';render('나사를 풀었어요. 클램프를 다시 조이거나 분리할 수 있어요.',true);}
    else {state=initialState();render(undefined,true);}
  }
  function offerStartChoice():void {
    waitingForStart=false;if(startChoice.open)startChoice.close();
    if(store.warning){saveStatus.textContent=store.warning;saveStatus.classList.add('warning');return;}
    if(savedState.stage==='ready')return;
    element('savedAssembly').textContent=`저장된 조립 상태 · ${LABELS[savedState.stage]}`;
    saveStatus.textContent='저장된 조립 상태가 있어요. 시작 방법을 선택해 주세요.';
    waitingForStart=true;startChoice.showModal();
  }
  function chooseStart(resume:boolean):void {
    waitingForStart=false;state=resume?savedState:initialState();startChoice.close();
    render(resume?undefined:'처음 배치로 시작합니다. 클램프를 집어 보세요.',!resume);
    if(resume)saveStatus.textContent='✓ 선택한 이전 조립 상태를 불러왔어요.';
    // 선택 뒤에는 바로 다음 조작으로 키보드 초점을 옮긴다.
    (state.stage==='fixed'?element('continueLab'):primary).focus();
  }
  element<HTMLButtonElement>('retry').addEventListener('click',()=>location.reload());
  try {
    scene=new LabScene(canvas);
    element('loading').hidden=true;
    startChoice.addEventListener('cancel',e=>e.preventDefault());
    startChoice.addEventListener('keydown',e=>{if(e.key==='Escape')e.preventDefault();});
    startChoice.addEventListener('close',()=>{if(waitingForStart&&!startChoice.open)startChoice.showModal();});
    element('startFresh').addEventListener('click',()=>chooseStart(false));
    element('resumeAssembly').addEventListener('click',()=>chooseStart(true));
    primary.addEventListener('click',()=>{if(state.stage==='ready')select();else if(state.stage==='holding')attach();else if(state.stage==='inserted')tighten();});
    secondary.addEventListener('click',back);pick.addEventListener('click',select);port.addEventListener('click',attach);screw.addEventListener('click',tighten);
    reset.addEventListener('click',()=>{state=initialState();render('처음 배치로 돌아왔어요. 다시 조립할 수 있어요.',true);});
    document.querySelectorAll<HTMLButtonElement>('[data-view]').forEach(b=>b.addEventListener('click',()=>{
      const view=b.dataset.view;if(view==='angled'||view==='front'||view==='close'){state.view=view;render();}
    }));
    bindPointer(canvas,scene,{
      getState:()=>state,select,
      move:position=>{state.clampPosition=position;redraw();},
      drop:near=>{if(near)attach();else{state.clampPosition=[...TRAY];render('연결 위치에 닿지 않아 클램프를 실험대에 놓았어요. 표시된 연결 위치를 눌러도 됩니다.');}},redraw
    });
    new ResizeObserver(()=>redraw()).observe(element('viewport'));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&state.stage==='holding'){state=initialState();render();}});
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();showError('입체 화면이 일시 중단됐습니다. 조립 기록은 유지됩니다. 다시 열기를 눌러 주세요.');});
    canvas.addEventListener('webglcontextrestored',()=>location.reload());
    render();offerStartChoice();
    // 뒤로 가기로 보관된 화면이 복원되어도 시작 방법을 다시 선택한다.
    window.addEventListener('pageshow',e=>{if(e.persisted){savedState=store.load();state=initialState();render();offerStartChoice();}});
  }catch(error:unknown){showError(error instanceof Error?error.message:'화면을 준비하지 못했습니다. 다시 열어 주세요.');}
}
