export const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getPipeSizePosPair = ({
  addToPosX = 0,
  gameEngineSize
}: {
  addToPosX?: number
  gameEngineSize: { height: number; width: number }
}) => {
  let yPosTop = -getRandom(300, gameEngineSize.height - 100)

  const pipeTop = {
    pos: { x: gameEngineSize.width + addToPosX, y: yPosTop },
    size: { height: gameEngineSize.height * 2, width: 75 }
  }
  const pipeBottom = {
    pos: {
      x: gameEngineSize.width + addToPosX,
      y: gameEngineSize.height * 2 + 200 + yPosTop
    },
    size: { height: gameEngineSize.height * 2, width: 75 }
  }

  return { pipeTop, pipeBottom }
}
