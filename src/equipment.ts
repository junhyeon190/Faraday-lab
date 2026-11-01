namespace InductionLab {
  const copper:Color=[.66,.32,.13],orange:Color=[.93,.46,.12];
  const leadRed:Color=[.72,.12,.14],leadBlack:Color=[.10,.14,.17];
  const component=(geometry:Geometry,color:Color,shine=.3):Part=>({geometry,color,shine});
  export const METER_RED:Vec3=[2.17,.15,1.0],METER_BLACK:Vec3=[2.82,.15,1.0];
  export function magnetParts():Part[]{return [component(box([0,.24,0],[.24,.48,.22]),[.16,.31,.70]),component(box([0,-.24,0],[.24,.48,.22]),[.79,.17,.17]),component(box([0,0,.115],[.24,.02,.01]),[.95,.94,.83])];}
  export function holdingHandParts():Part[]{
    // 첫 실험에서는 자석 윗부분을 손으로 잡는다. 모형 손도 자석과 같은 프레임을 따라간다.
    const glove:Color=[.89,.88,.80],cuff:Color=[.36,.46,.50];
    const parts=[component(ellipsoid([.39,.27,.015],[.23,.18,.11]),glove,.1),
      component(cylinder([.55,.27,0],[.78,.27,-.015],.12),cuff,.1)];
    for(const y of [.38,.28,.18])parts.push(component(tube([[.36,y,.08],[.20,y,.15],[.04,y,.155],[-.08,y,.13]],.043),glove,.1));
    parts.push(component(tube([[.37,.13,0],[.20,.10,-.15],[.06,.17,-.15]],.055),glove,.1));
    return parts;
  }
  export function coilParts():Part[]{
    const points:Vec3[]=[];
    for(let i=0;i<=480;i++){const a=i/480*Math.PI*2*12;points.push([.39*Math.cos(a),-.18+i/480*.36,.39*Math.sin(a)]);}
    return [component(tube(points,.026),copper,.65),component(box([0,-.28,0],[.90,.14,.76]),[.22,.28,.25]),
      component(cylinder([-.27,-.20,.40],[-.27,-.07,.40],.055),leadRed),component(cylinder([.27,-.20,.40],[.27,-.07,.40],.055),leadBlack)];
  }
  export function meterParts():Part[]{return [component(box([2.5,.49,.51],[1.26,.94,.55]),orange),
    component(box([2.5,.60,.795],[1.07,.62,.025]),[.94,.94,.85]),component(box([2.5,.12,.54],[1.34,.20,.70]),[.18,.24,.25]),
    component(cylinder(METER_RED,add(METER_RED,[0,.14,0]),.065),leadRed),component(cylinder(METER_BLACK,add(METER_BLACK,[0,.14,0]),.065),leadBlack),
    component(box([2.5,.82,.82],[.016,.08,.012]),[.15,.22,.20]),component(box([2.11,.62,.82],[.08,.016,.012]),[.15,.22,.20]),component(box([2.89,.62,.82],[.08,.016,.012]),[.15,.22,.20])];}
  export function wirePart(from:Vec3,to:Vec3,red:boolean):Part {
    const points:Vec3[]=[from,add(from,[0,-.15,.20]),[from[0]+.3,.15,1.20],[1.8,.09,1.40],add(to,[0,-.03,.20]),to];
    return component(tube(points,.024),red?leadRed:leadBlack,.2);
  }
  export function needlePart():Part{return component(cylinder([0,0,0],[0,.37,0],.014,8),[.12,.20,.18]);}
}
