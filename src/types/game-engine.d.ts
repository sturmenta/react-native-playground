interface Position {
  x: number
  y: number
}
interface Bounds {
  max: Position
  min: Position
}
interface Size {
  width: number
  height: number
}

type InitGameComponent = (
  world: World,
  color: string,
  pos: Position,
  size: Size,
  label?: string
) => {
  body: Matter.Body
  color: string
  pos: Position
  renderer: JSX.Element
  label?: string
}
