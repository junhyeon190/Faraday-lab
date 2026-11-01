namespace InductionLab {
  export class LabScene {
    public renderer:Renderer;
    private table:Mesh[];
    private stand:Mesh[];
    private clamp:Mesh[];
    private looseKnob:Mesh[];
    private tightKnob:Mesh[];
    public constructor(canvas:HTMLCanvasElement) {
      this.renderer=new Renderer(canvas);
      this.table=tableParts().map(p=>this.renderer.mesh(p));
      this.stand=standParts().map(p=>this.renderer.mesh(p));
      this.clamp=clampParts().map(p=>this.renderer.mesh(p));
      this.looseKnob=knobParts(false).map(p=>this.renderer.mesh(p));
      this.tightKnob=knobParts(true).map(p=>this.renderer.mesh(p));
    }
    public draw(state:AssemblyState):void {
      this.renderer.begin(state.view);
      this.table.forEach(m=>this.renderer.draw(m));this.stand.forEach(m=>this.renderer.draw(m));
      this.clamp.forEach(m=>this.renderer.draw(m,state.clampPosition,state.stage==='holding'));
      (state.stage==='fixed'?this.tightKnob:this.looseKnob).forEach(m=>this.renderer.draw(m,state.clampPosition,state.stage==='holding'));
    }
    public port():ScreenPoint{return this.renderer.project(PORT);}
    public handle(state:AssemblyState):ScreenPoint{return this.renderer.project(add(state.clampPosition,[1.18,0,0]));}
    public clampEnd(state:AssemblyState):ScreenPoint{return this.renderer.project(state.clampPosition);}
    public standLabel():ScreenPoint{return this.renderer.project([-1.45,3.80,0]);}
  }
}
