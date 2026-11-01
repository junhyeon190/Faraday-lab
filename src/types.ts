namespace InductionLab {
  export type Vec3 = [number, number, number];
  export type Color = [number, number, number];
  export type Stage = 'ready' | 'holding' | 'inserted' | 'fixed';
  export type View = 'angled' | 'front' | 'close';
  export interface AssemblyState { stage: Stage; view: View; clampPosition: Vec3; }
  export interface Geometry { vertices: number[]; normals: number[]; }
  export interface Part { geometry: Geometry; color: Color; shine?: number; }
  export interface Mesh { position: WebGLBuffer; normal: WebGLBuffer; count: number; color: Color; shine: number; }
  export interface ScreenPoint { x: number; y: number; }
  export const PORT: Vec3 = [-1.45, 2.42, 0];
  export const TRAY: Vec3 = [.72, .35, .62];
  export const LABELS: Record<Stage, string> = {
    ready: '조립 전', holding: '클램프 선택됨', inserted: '나사 조임 전', fixed: '고정 완료'
  };
  export function initialState(): AssemblyState { return {stage: 'ready', view: 'angled', clampPosition: [...TRAY]}; }
}
