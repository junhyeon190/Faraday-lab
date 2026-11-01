namespace InductionLab {
  export class ExperimentScene {
    public renderer:Renderer;
    private table:Mesh[];private stand:Mesh[];private clamp:Mesh[];private closedClamp:Mesh[];private knob:Mesh[];private hand:Mesh[];
    private magnet:Mesh[];private coil:Mesh[];private meter:Mesh[];private wires:Mesh[];private needle:Mesh;private cover:Mesh;
    private wirePosition='';
    public constructor(canvas:HTMLCanvasElement){
      this.renderer=new Renderer(canvas);const make=(p:Part[]):Mesh[]=>p.map(x=>this.renderer.mesh(x));
      this.table=make(tableParts());this.stand=make(standParts());this.clamp=make(clampParts());this.knob=make(knobParts(true));
      this.closedClamp=make(clampParts(true));this.hand=make(holdingHandParts());
      this.magnet=make(magnetParts());this.coil=make(coilParts());this.meter=make(meterParts());
      this.wires=make([wirePart([1,.6,.4],METER_RED,true),wirePart([1,.6,.4],METER_BLACK,false)]);this.needle=this.renderer.mesh(needlePart());this.cover=this.renderer.mesh({geometry:box([2.5,.60,.84],[1.09,.65,.025]),color:[.25,.33,.33]});
    }
    public axis(mode:ExperimentMode):number{return mode==='coil'?.33:.95;}
    public coilPort(mode:ExperimentMode,y:number,red:boolean):Vec3{return [this.axis(mode)+(red?-.27:.27),y-.07,.40];}
    public draw(record:LabRecord,frame:ExperimentFrame,mode:ExperimentMode,view:View,showNeedle:boolean):void{
      this.renderer.begin(view);
      const draw=(meshes:Mesh[],offset:Vec3=[0,0,0]):void=>meshes.forEach(m=>this.renderer.draw(m,offset));
      draw(this.table);draw(this.stand);draw(record.fixStep>=2?this.closedClamp:this.clamp,PORT);draw(this.knob,PORT);draw(this.meter);
      const x=this.axis(mode),coilY=record.setupStep===0?.30:frame.coilY;
      draw(this.coil,[record.setupStep===0?1.3:x,coilY,record.setupStep===0?1.2:0]);
      draw(this.magnet,[x,frame.magnetY,0]);
      if(record.fixStep<2)draw(this.hand,[x,frame.magnetY,0]);
      const position=`${x}:${coilY}`;
      if(position!==this.wirePosition){
        this.wirePosition=position;this.renderer.update(this.wires[0],wirePart(this.coilPort(mode,coilY,true),METER_RED,true));
        this.renderer.update(this.wires[1],wirePart(this.coilPort(mode,coilY,false),METER_BLACK,false));
      }
      if(record.setupStep>=3)this.renderer.draw(this.wires[0]);if(record.setupStep>=5)this.renderer.draw(this.wires[1]);
      if(showNeedle)this.renderer.draw(this.needle,[2.5,.43,.825],false,-frame.needle);else this.renderer.draw(this.cover);
    }
  }
}
