import Matter from "matter-js"

import { Meteor } from "./components/meteor"
import { Spaceship } from "./components/spaceship"
import { getMeteorRandomPosition } from "./utils/random"

const spaceshipSize = 40
export const meteorSize = 40

export const entities = ({
  gameEngineSize
}: {
  gameEngineSize: { height: number; width: number }
}) => {
  let engine = Matter.Engine.create({ enableSleeping: false })
  let world = engine.world
  world.gravity.y = 0.0

  return {
    physics: { engine, world },

    Spaceship: Spaceship(
      world,
      "red",
      {
        x: gameEngineSize?.width / 2,
        y: gameEngineSize?.height - spaceshipSize
      },
      { height: spaceshipSize, width: spaceshipSize }
    ),

    Meteor1: Meteor(
      world,
      "blue",
      getMeteorRandomPosition({ gameEngineSize }),
      { height: meteorSize, width: meteorSize },
      "Meteor1"
    ),

    Meteor2: Meteor(
      world,
      "blue",
      getMeteorRandomPosition({
        gameEngineSize,
        addToPosY: -gameEngineSize.height / 3
      }),
      { height: meteorSize, width: meteorSize },
      "Meteor1"
    ),

    Meteor3: Meteor(
      world,
      "blue",
      getMeteorRandomPosition({
        gameEngineSize,
        addToPosY: (-gameEngineSize.height / 3) * 2
      }),
      { height: meteorSize, width: meteorSize },
      "Meteor1"
    )
  }
}
