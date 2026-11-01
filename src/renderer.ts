namespace InductionLab {
  const vertexSource=`attribute vec3 aPosition; attribute vec3 aNormal;
    uniform mat4 uCamera; uniform vec3 uOffset; uniform float uAngle; varying vec3 vNormal; varying vec3 vPosition;
    void main(){float c=cos(uAngle);float s=sin(uAngle);mat3 r=mat3(c,s,0.,-s,c,0.,0.,0.,1.);vPosition=r*aPosition+uOffset;vNormal=r*aNormal;gl_Position=uCamera*vec4(vPosition,1.0);}`;
  const fragmentSource=`precision mediump float; varying vec3 vNormal; varying vec3 vPosition;
    uniform vec3 uColor; uniform float uShine; uniform vec3 uEye; uniform float uHighlight;
    void main(){vec3 n=normalize(vNormal);vec3 l=normalize(vec3(-3.,7.,5.));
      float diffuse=max(dot(n,l),0.);vec3 h=normalize(l+normalize(uEye-vPosition));
      float spec=pow(max(dot(n,h),0.),42.)*uShine;
      vec3 base=mix(uColor,vec3(.95,.68,.25),uHighlight*.22);
      vec3 c=base*(.40+.64*diffuse)+vec3(spec*.50);gl_FragColor=vec4(c,1.);}`;
  export class Renderer {
    private gl: WebGLRenderingContext;
    private program: WebGLProgram;
    private position: number;
    private normal: number;
    private camera: WebGLUniformLocation | null;
    private angle: WebGLUniformLocation | null;
    private offset: WebGLUniformLocation | null;
    private color: WebGLUniformLocation | null;
    private shine: WebGLUniformLocation | null;
    private eyeUniform: WebGLUniformLocation | null;
    private highlight: WebGLUniformLocation | null;
    private eye: Vec3=[5,5,8];
    private target: Vec3=[.1,1.65,0];
    private right: Vec3=[1,0,0];
    private up: Vec3=[0,1,0];
    private worldHeight=5.2;
    private worldWidth=7;
    private cssWidth=1;
    private cssHeight=1;
    public constructor(public canvas: HTMLCanvasElement) {
      const gl=canvas.getContext('webgl',{antialias:true,alpha:false,preserveDrawingBuffer:true});
      if(!gl) throw new Error('입체 화면을 열 수 없습니다. 다른 브라우저에서 다시 열어 주세요.');
      this.gl=gl;
      const makeShader=(type:number,source:string):WebGLShader=>{
        const s=gl.createShader(type);if(!s)throw new Error('입체 화면을 준비하지 못했습니다.');
        gl.shaderSource(s,source);gl.compileShader(s);
        if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error('입체 화면을 준비하지 못했습니다.');return s;
      };
      const program=gl.createProgram();if(!program)throw new Error('입체 화면을 준비하지 못했습니다.');
      gl.attachShader(program,makeShader(gl.VERTEX_SHADER,vertexSource));
      gl.attachShader(program,makeShader(gl.FRAGMENT_SHADER,fragmentSource));gl.linkProgram(program);
      if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error('입체 화면을 준비하지 못했습니다.');
      this.program=program;gl.useProgram(program);gl.enable(gl.DEPTH_TEST);
      this.position=gl.getAttribLocation(program,'aPosition');this.normal=gl.getAttribLocation(program,'aNormal');
      this.camera=gl.getUniformLocation(program,'uCamera');this.offset=gl.getUniformLocation(program,'uOffset');this.angle=gl.getUniformLocation(program,'uAngle');
      this.color=gl.getUniformLocation(program,'uColor');this.shine=gl.getUniformLocation(program,'uShine');
      this.eyeUniform=gl.getUniformLocation(program,'uEye');this.highlight=gl.getUniformLocation(program,'uHighlight');
    }
    public mesh(part: Part): Mesh {
      const gl=this.gl;
      const buffer=(values:number[]):WebGLBuffer=>{const b=gl.createBuffer();if(!b)throw new Error('기구를 표시하지 못했습니다.');gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(values),gl.STATIC_DRAW);return b;};
      return {position:buffer(part.geometry.vertices),normal:buffer(part.geometry.normals),count:part.geometry.vertices.length/3,color:part.color,shine:part.shine??.15};
    }
    public update(mesh:Mesh,part:Part):void {
      const gl=this.gl;gl.bindBuffer(gl.ARRAY_BUFFER,mesh.position);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(part.geometry.vertices),gl.DYNAMIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER,mesh.normal);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(part.geometry.normals),gl.DYNAMIC_DRAW);mesh.count=part.geometry.vertices.length/3;
    }
    public begin(view: View): void {
      const gl=this.gl,rect=this.canvas.getBoundingClientRect(),ratio=Math.min(devicePixelRatio||1,1.6);
      this.cssWidth=rect.width;this.cssHeight=rect.height;
      const w=Math.max(1,Math.round(rect.width*ratio)),h=Math.max(1,Math.round(rect.height*ratio));
      if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;}
      gl.viewport(0,0,w,h);gl.clearColor(.90,.92,.91,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(this.program);
      this.target=view==='close'?[-.6,2.15,0]:[.1,1.60,0];
      this.eye=add(this.target,view==='front'?[.1,1,11]:[4.3,4.2,9]);
      const forward=unit(sub(this.eye,this.target));this.right=unit(cross([0,1,0],forward));this.up=cross(forward,this.right);
      this.worldHeight=view==='close'?3.2:5.3;
      this.worldWidth=this.worldHeight*w/h;
      if(this.worldWidth<6.1 && view!=='close'){this.worldWidth=6.1;this.worldHeight=this.worldWidth*h/w;}
      gl.uniformMatrix4fv(this.camera,false,multiply(orthographic(this.worldWidth,this.worldHeight),lookAt(this.eye,this.target)));
      gl.uniform3fv(this.eyeUniform,this.eye);
    }
    public draw(mesh: Mesh,offset:Vec3=[0,0,0],selected=false,angle=0):void {
      const gl=this.gl;
      gl.bindBuffer(gl.ARRAY_BUFFER,mesh.position);gl.enableVertexAttribArray(this.position);gl.vertexAttribPointer(this.position,3,gl.FLOAT,false,0,0);
      gl.bindBuffer(gl.ARRAY_BUFFER,mesh.normal);gl.enableVertexAttribArray(this.normal);gl.vertexAttribPointer(this.normal,3,gl.FLOAT,false,0,0);
      gl.uniform1f(this.angle,angle);gl.uniform3fv(this.offset,offset);gl.uniform3fv(this.color,mesh.color);gl.uniform1f(this.shine,mesh.shine);gl.uniform1f(this.highlight,selected?1:0);
      gl.drawArrays(gl.TRIANGLES,0,mesh.count);
    }
    public project(point:Vec3):ScreenPoint {
      const d=sub(point,this.target);return {x:(.5+dot(d,this.right)/this.worldWidth)*this.cssWidth,y:(.5-dot(d,this.up)/this.worldHeight)*this.cssHeight};
    }
    public dragDelta(dx:number,dy:number):Vec3 {
      const x=dx/this.cssWidth*this.worldWidth/this.right[0];
      const y=(-dy/this.cssHeight*this.worldHeight-this.up[0]*x)/this.up[1];return [x,y,0];
    }
  }
}
