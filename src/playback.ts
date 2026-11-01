namespace InductionLab {
  export class ExperimentPlayback {
    public status:PlaybackStatus='idle';public index=0;public replays=0;
    public frames:ExperimentFrame[]=[];
    private request=0;private started:number|null=null;private elapsed=0;
    public constructor(private onFrame:()=>void,private onStatus:()=>void){}
    public load(frames:ExperimentFrame[]):void{this.cancel();this.frames=frames;this.index=0;this.elapsed=0;this.replays=0;this.status='idle';}
    public play():void{
      if(!this.frames.length||this.status==='running')return;
      if(this.status==='done')this.replays=Math.min(999,this.replays+1);
      this.index=0;this.elapsed=0;this.start();
    }
    private start():void{this.started=null;this.status='running';this.onStatus();this.request=requestAnimationFrame(t=>this.tick(t));}
    private tick(time:number):void{
      if(this.status!=='running')return;
      // 첫 화면의 시각을 기준으로 잡는다. 클릭 시각과 섞으면 첫 프레임이 음수가 될 수 있다.
      if(this.started===null)this.started=time-this.elapsed;
      this.elapsed=Math.max(this.elapsed,time-this.started,0);
      this.index=Math.max(0,Math.min(this.frames.length-1,Math.floor(this.elapsed/1000*60)));this.onFrame();
      if(this.index===this.frames.length-1){this.status='done';this.onStatus();return;}
      this.request=requestAnimationFrame(t=>this.tick(t));
    }
    public pause():void{if(this.status!=='running')return;this.cancel();this.status='paused';this.onStatus();}
    public resume():void{if(this.status==='paused')this.start();}
    public cancel():void{cancelAnimationFrame(this.request);}
    public current():ExperimentFrame{return this.frames[this.index];}
  }
  export function bindExperimentGesture(canvas:HTMLCanvasElement,getPosition:()=>ScreenPoint,canPlay:()=>boolean,start:()=>void):void{
    let origin:ScreenPoint|null=null,id:number|null=null;
    canvas.addEventListener('pointerdown',e=>{if(!canPlay()||e.button!==0||id!==null)return;const r=canvas.getBoundingClientRect(),p=getPosition();
      const point={x:e.clientX-r.left,y:e.clientY-r.top};if(Math.hypot(point.x-p.x,point.y-p.y)>55)return;
      origin=point;id=e.pointerId;canvas.setPointerCapture(id);e.preventDefault();});
    canvas.addEventListener('pointerup',e=>{if(id!==e.pointerId||!origin)return;const r=canvas.getBoundingClientRect(),delta=e.clientY-r.top-origin.y;id=null;origin=null;
      if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);if(Math.abs(delta)>20)start();});
    const cancel=():void=>{id=null;origin=null;};canvas.addEventListener('pointercancel',cancel);canvas.addEventListener('lostpointercapture',cancel);
  }
}
