export const getRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const getMeteorRandomPosition = ({
  addToPosY = 0,
  gameEngineSize
}: {
  addToPosY?: number
  gameEngineSize: { height: number; width: number }
}) => ({
  x: getRandom(0, gameEngineSize.width),
  y: 0 + addToPosY
})
