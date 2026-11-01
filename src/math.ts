namespace InductionLab {
  export const add = (a: Vec3, b: Vec3): Vec3 => [a[0]+b[0],a[1]+b[1],a[2]+b[2]];
  export const sub = (a: Vec3, b: Vec3): Vec3 => [a[0]-b[0],a[1]-b[1],a[2]-b[2]];
  export const scale = (a: Vec3, n: number): Vec3 => [a[0]*n,a[1]*n,a[2]*n];
  export const dot = (a: Vec3, b: Vec3): number => a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
  export const cross = (a: Vec3, b: Vec3): Vec3 => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  export const unit = (a: Vec3): Vec3 => scale(a,1/(Math.hypot(...a)||1));
  export const clamp = (v: number, lo: number, hi: number): number => Math.min(hi,Math.max(lo,v));
  export function multiply(a: Float32Array, b: Float32Array): Float32Array {
    const out = new Float32Array(16);
    for(let c=0;c<4;c++) for(let r=0;r<4;r++) for(let k=0;k<4;k++) out[c*4+r]+=a[k*4+r]*b[c*4+k];
    return out;
  }
  export function lookAt(eye: Vec3, target: Vec3): Float32Array {
    const z=unit(sub(eye,target)), x=unit(cross([0,1,0],z)), y=cross(z,x);
    return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1]);
  }
  export function orthographic(w: number, h: number): Float32Array {
    return new Float32Array([2/w,0,0,0,0,2/h,0,0,0,0,-2/40,0,0,0,-1,1]);
  }
}
