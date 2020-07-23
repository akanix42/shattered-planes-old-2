export default interface IPosition {
  x: number;
  y: number;
}

export function getEmptyPosition(): IPosition {
  return { x: -1, y: -1 };
}
