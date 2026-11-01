namespace InductionLab {
  function triangle(g: Geometry,a: Vec3,b: Vec3,c: Vec3,n?: Vec3): void {
    const normal=n||unit(cross(sub(b,a),sub(c,a)));
    g.vertices.push(...a,...b,...c); g.normals.push(...normal,...normal,...normal);
  }
  export function box(center: Vec3,size: Vec3): Geometry {
    const g: Geometry={vertices:[],normals:[]};
    const p=(x:number,y:number,z:number):Vec3=>add(center,[x*size[0]/2,y*size[1]/2,z*size[2]/2]);
    const faces: Vec3[][]=[
      [p(-1,-1,1),p(1,-1,1),p(1,1,1),p(-1,1,1)],
      [p(1,-1,-1),p(-1,-1,-1),p(-1,1,-1),p(1,1,-1)],
      [p(-1,-1,-1),p(-1,-1,1),p(-1,1,1),p(-1,1,-1)],
      [p(1,-1,1),p(1,-1,-1),p(1,1,-1),p(1,1,1)],
      [p(-1,1,1),p(1,1,1),p(1,1,-1),p(-1,1,-1)],
      [p(-1,-1,-1),p(1,-1,-1),p(1,-1,1),p(-1,-1,1)]
    ];
    faces.forEach(([a,b,c,d])=>{triangle(g,a,b,c);triangle(g,a,c,d);}); return g;
  }
  export function cylinder(a: Vec3,b: Vec3,r: number,segments=24): Geometry {
    const g: Geometry={vertices:[],normals:[]}, axis=unit(sub(b,a));
    const u=unit(cross(axis,Math.abs(axis[1])<.9?[0,1,0]:[1,0,0])),v=cross(axis,u);
    const n=(t:number):Vec3=>add(scale(u,Math.cos(t)),scale(v,Math.sin(t)));
    for(let i=0;i<segments;i++) {
      const n0=n(i*2*Math.PI/segments),n1=n((i+1)*2*Math.PI/segments);
      const a0=add(a,scale(n0,r)),a1=add(a,scale(n1,r)),b0=add(b,scale(n0,r)),b1=add(b,scale(n1,r));
      g.vertices.push(...a0,...a1,...b1,...a0,...b1,...b0);
      g.normals.push(...n0,...n1,...n1,...n0,...n1,...n0);
      triangle(g,a,a1,a0,scale(axis,-1)); triangle(g,b,b0,b1,axis);
    } return g;
  }
  export function ellipsoid(center: Vec3,r: Vec3): Geometry {
    const g: Geometry={vertices:[],normals:[]};
    const p=(a:number,b:number):Vec3=>[Math.sin(a)*Math.cos(b),Math.cos(a),Math.sin(a)*Math.sin(b)];
    const vertex=(n:Vec3):void=>{g.vertices.push(...add(center,[n[0]*r[0],n[1]*r[1],n[2]*r[2]]));g.normals.push(...unit([n[0]/r[0],n[1]/r[1],n[2]/r[2]]));};
    for(let i=0;i<12;i++) for(let j=0;j<24;j++) {
      const a=i*Math.PI/12,b=j*Math.PI/12,c=(i+1)*Math.PI/12,d=(j+1)*Math.PI/12;
      [p(a,b),p(c,b),p(c,d),p(a,b),p(c,d),p(a,d)].forEach(vertex);
    } return g;
  }
  export function tube(points: Vec3[],r:number): Geometry {
    const g:Geometry={vertices:[],normals:[]};
    for(let i=1;i<points.length;i++){const s=cylinder(points[i-1],points[i],r,12);g.vertices.push(...s.vertices);g.normals.push(...s.normals);}
    return g;
  }
}
