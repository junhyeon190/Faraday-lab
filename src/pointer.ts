namespace InductionLab {
  export interface PointerHooks {
    getState:()=>AssemblyState;
    select:()=>void;
    move:(position:Vec3)=>void;
    drop:(nearPort:boolean)=>void;
    redraw:()=>void;
  }
  export function bindPointer(canvas:HTMLCanvasElement,scene:LabScene,hooks:PointerHooks):void {
    let pointer:number|null=null,start:ScreenPoint={x:0,y:0},origin:Vec3=[...TRAY],moved=false;
    const point=(e:PointerEvent):ScreenPoint=>{const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};};
    canvas.addEventListener('pointerdown',e=>{
      if(e.button!==0||pointer!==null)return;
      const state=hooks.getState();if(state.stage==='fixed'||state.stage==='inserted')return;
      const pos=point(e),a=scene.clampEnd(state),b=scene.handle(state);
      const vx=b.x-a.x,vy=b.y-a.y,t=clamp(((pos.x-a.x)*vx+(pos.y-a.y)*vy)/(vx*vx+vy*vy||1),0,1);
      if(Math.hypot(pos.x-a.x-t*vx,pos.y-a.y-t*vy)>48)return;
      pointer=e.pointerId;start=pos;origin=[...state.clampPosition];moved=false;hooks.select();
      canvas.setPointerCapture(e.pointerId);e.preventDefault();
    });
    canvas.addEventListener('pointermove',e=>{
      if(pointer!==e.pointerId)return;
      const pos=point(e),dx=pos.x-start.x,dy=pos.y-start.y;
      if(Math.hypot(dx,dy)>6)moved=true;
      if(!moved)return;
      const d=scene.renderer.dragDelta(dx,dy);
      hooks.move([clamp(origin[0]+d[0],-3.2,2.4),clamp(origin[1]+d[1],.25,3.65),origin[2]]);e.preventDefault();
    });
    const finish=(e:PointerEvent,cancelled:boolean):void=>{
      if(pointer!==e.pointerId)return;
      pointer=null;
      if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);
      if(cancelled){hooks.drop(false);return;}
      if(moved){const a=scene.clampEnd(hooks.getState()),b=scene.port();hooks.drop(Math.hypot(a.x-b.x,a.y-b.y)<65);}
      else hooks.redraw();
    };
    canvas.addEventListener('pointerup',e=>finish(e,false));
    canvas.addEventListener('pointercancel',e=>finish(e,true));
    canvas.addEventListener('lostpointercapture',()=>{if(pointer!==null){pointer=null;hooks.drop(false);}});
  }
}
