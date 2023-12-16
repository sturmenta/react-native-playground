import Matter from "matter-js"
import { Dimensions } from "react-native"

import { Bird } from "./components/bird"
import { Floor } from "./components/floor"
import { Obstacle } from "./components/obstacle"
import { getPipeSizePosPair } from "./utils/random"

const windowHeight = Dimensions.get("window").height
const windowWidth = Dimensions.get("window").width

export const entities = () => {
  let engine = Matter.Engine.create({ enableSleeping: false })

  let world = engine.world

  world.gravity.y = 0.4

  const pipeSizePosA = getPipeSizePosPair()
  const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9)
  return {
    physics: { engine, world },

    Bird: Bird(world, "red", { x: 50, y: 300 }, { height: 40, width: 40 }),

    ObstacleTop1: Obstacle(
      world,
      "blue",
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size,
      "ObstacleTop1"
    ),
    ObstacleBottom1: Obstacle(
      world,
      "blue",
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size,
      "ObstacleBottom1"
    ),

    ObstacleTop2: Obstacle(
      world,
      "blue",
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size,
      "ObstacleTop2"
    ),
    ObstacleBottom2: Obstacle(
      world,
      "blue",
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size,
      "ObstacleBottom2"
    ),

    Floor: Floor(
      world,
      "blue",
      { x: windowWidth / 2, y: windowHeight },
      { height: 50, width: windowWidth }
    )
  }
}
