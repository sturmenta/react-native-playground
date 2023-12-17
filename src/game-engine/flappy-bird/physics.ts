import Matter, { Engine } from "matter-js"
import { GestureResponderEvent } from "react-native"

import { getPipeSizePosPair } from "./utils/random"

interface EntitiesInterface {
  [key: string]: {
    point: boolean
    body: Matter.Body
  }
  physics: { engine: Engine; point: boolean; body: Matter.Body }
  Bird: { body: Matter.Body; point: boolean }
}

export const physics =
  ({ gameEngineSize }: { gameEngineSize: { height: number; width: number } }) =>
  (entities: EntitiesInterface, { touches, time, dispatch }: any) => {
    let engine = entities.physics.engine

    touches
      .filter((t: GestureResponderEvent) => t.type === "press")
      .forEach(() => {
        Matter.Body.setVelocity(entities.Bird.body, {
          x: 0,
          y: -6
        })
      })

    Matter.Engine.update(engine, time.delta)

    for (let index = 1; index <= 2; index++) {
      if (
        entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 &&
        !entities[`ObstacleTop${index}`].point
      ) {
        entities[`ObstacleTop${index}`].point = true
        dispatch({ type: "new_point" })
      }

      if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
        const pipeSizePos = getPipeSizePosPair({
          addToPosX: gameEngineSize.width * 0.9,
          gameEngineSize
        })

        Matter.Body.setPosition(
          entities[`ObstacleTop${index}`].body,
          pipeSizePos.pipeTop.pos
        )
        Matter.Body.setPosition(
          entities[`ObstacleBottom${index}`].body,
          pipeSizePos.pipeBottom.pos
        )

        entities[`ObstacleTop${index}`].point = false
      }

      Matter.Body.translate(entities[`ObstacleTop${index}`].body, {
        x: -3,
        y: 0
      })
      Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {
        x: -3,
        y: 0
      })
    }

    Matter.Events.on(engine, "collisionStart", (event) => {
      dispatch({ type: "game_over" })
    })
    return entities
  }
