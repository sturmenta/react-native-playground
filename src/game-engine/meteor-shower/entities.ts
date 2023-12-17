import Matter from "matter-js"

import { Meteor } from "./components/meteor"
import { Spaceship } from "./components/spaceship"
import { getMeteorRandomPosition } from "./utils/random"

const SpaceshipSize = 40

export const entities = ({
  gameEngineSize
}: {
  gameEngineSize: { height: number; width: number }
}) => {
  let engine = Matter.Engine.create({ enableSleeping: false })
  let world = engine.world
  world.gravity.y = 0.0

  const randomPos = getMeteorRandomPosition({ gameEngineSize })

  return {
    physics: { engine, world },

    Spaceship: Spaceship(
      world,
      "red",
      {
        x: gameEngineSize?.width / 2,
        y: gameEngineSize?.height - SpaceshipSize
      },
      { height: SpaceshipSize, width: SpaceshipSize }
    ),

    Meteor1: Meteor(
      world,
      "blue",
      randomPos,
      { height: 40, width: 40 },
      "Meteor1"
    )
  }
}
