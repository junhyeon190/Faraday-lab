namespace InductionLab {
  const chrome:Color=[.66,.71,.74],dark:Color=[.12,.16,.18],rubber:Color=[.055,.075,.085];
  const blue:Color=[.10,.29,.64],silver:Color=[.77,.80,.81];
  function part(geometry:Geometry,color:Color,shine=.25):Part {return {geometry,color,shine};}
  export function tableParts():Part[] {
    const p:Part[]=[part(box([0,-.20,0],[14,.32,10]),[.80,.83,.81]),part(box([0,-.04,0],[14,.025,10]),[.88,.90,.88])];
    for(let x=-6;x<=6;x++)p.push(part(box([x,-.024,0],[.008,.002,9]),[.79,.82,.80],0));
    for(let z=-4;z<=4;z++)p.push(part(box([0,-.024,z],[13,.002,.008]),[.79,.82,.80],0));
    // 받침대 아래의 접촉 그림자는 조립 위치를 알아보기 위한 표시다.
    p.push(part(ellipsoid([-1.42,-.018,.15],[.85,.008,.72]),[.60,.64,.62],0));
    return p;
  }
  export function standParts():Part[] {
    return [
      part(box([-1.45,.11,0],[1.23,.20,1.08]),dark,.12),
      part(box([-1.45,.22,0],[1.14,.04,1.00]),[.19,.23,.25]),
      part(cylinder([-1.45,.23,0],[-1.45,.40,0],.13),chrome,.75),
      part(cylinder([-1.45,.32,0],[-1.45,3.77,0],.055,32),silver,.9),
      part(ellipsoid([-1.45,3.77,0],[.056,.045,.056]),silver,.8),
      part(box([-1.85,.024,.35],[.18,.05,.18]),rubber),part(box([-1.05,.024,.35],[.18,.05,.18]),rubber),
      part(box([-1.85,.024,-.35],[.18,.05,.18]),rubber),part(box([-1.05,.024,-.35],[.18,.05,.18]),rubber)
    ];
  }
  export function knobParts(fixed:boolean):Part[] {
    const z=fixed?.30:.36;
    return [part(cylinder([0,0,.11],[0,0,z],.038),chrome,.8),
      part(ellipsoid([0,0,z],fixed?[.055,.17,.055]:[.17,.055,.055]),rubber,.2)];
  }
  export function clampParts(gripping=false):Part[] {
    const p:Part[]=[
      part(box([0,0,0],[.32,.34,.33]),dark,.35),
      part(cylinder([-.10,.11,0],[.12,.11,0],.12),dark,.5),
      part(cylinder([.10,0,0],[1.42,0,0],.037),silver,.9),
      part(cylinder([1.12,0,0],[1.48,0,0],.068),chrome,.85),
      part(cylinder([1.36,.04,0],[1.36,.25,0],.024),chrome,.7),
      part(ellipsoid([1.36,.26,0],[.10,.035,.05]),silver,.7)
    ];
    // 닫힌 집게의 고무 안쪽 면이 자석의 앞·뒷면에 닿도록 한다.
    const paths:Vec3[][]=gripping?[
      [[1.40,0,0],[1.58,0,-.16],[1.88,0,-.16],[1.95,0,-.11]],
      [[1.40,0,0],[1.58,-.08,.16],[1.88,-.08,.16],[1.95,-.08,.11]],
      [[1.40,0,0],[1.58,.06,.16],[1.88,.06,.16],[1.95,.06,.11]]
    ]:[
      [[1.40,0,0],[1.55,.08,-.17],[1.83,.08,-.19],[1.96,.08,-.08]],
      [[1.40,0,0],[1.55,-.08,.17],[1.83,-.08,.19],[1.96,-.08,.08]],
      [[1.40,0,0],[1.57,.16,.10],[1.83,.16,.11],[1.94,.11,.05]]
    ];
    paths.forEach(points=>{p.push(part(tube(points,.042),chrome,.7));p.push(part(tube(points.slice(1),gripping?.05:.061),blue,.2));});
    return p;
  }
}
