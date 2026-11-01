namespace InductionLab {
  const KEY='sangmo.induction.assembly.v1';
  export class AssemblyStorage {
    private locked=false;
    public warning='';
    public load():AssemblyState {
      const state=initialState();
      try {
        const raw=localStorage.getItem(KEY);if(raw===null)return state;
        const value:unknown=JSON.parse(raw);
        if(typeof value!=='object'||value===null||!('version' in value)||value.version!==1||!('stage' in value)||!['ready','inserted','fixed'].includes(String(value.stage))) {
          this.locked=true;this.warning='이전에 저장한 내용을 읽지 못했습니다. 기존 기록을 보존하며 새 조립을 화면에서 진행합니다.';return state;
        }
        state.stage=value.stage as Stage;
        state.clampPosition=state.stage==='ready'?[...TRAY]:[...PORT];
      } catch {
        this.locked=true;this.warning='저장 공간을 읽지 못했습니다. 현재 조립은 가능하며 새로고침하면 사라질 수 있습니다.';
      } return state;
    }
    public save(state:AssemblyState):boolean {
      if(this.locked)return false;
      try {
        localStorage.setItem(KEY,JSON.stringify({version:1,stage:state.stage==='holding'?'ready':state.stage}));
        this.warning='';return true;
      } catch {
        this.warning='조립 상태를 저장하지 못했습니다. 화면의 조립 상태는 유지됩니다.';return false;
      }
    }
  }
}
