import Matter, { Engine } from "matter-js"
import { GestureResponderEvent } from "react-native"

// import { getMeteorRandomPosition } from "./utils/random"

interface EntitiesInterface {
  [key: `Meteor${number}`]: {
    point: boolean
    body: Matter.Body
  }
  physics: { engine: Engine; point: boolean; body: Matter.Body }
  Spaceship: { body: Matter.Body; point: boolean }
}

export const physics =
  ({ gameEngineSize }: { gameEngineSize: { height: number; width: number } }) =>
  (entities: EntitiesInterface, { touches, time, dispatch }: any) => {
    let engine = entities.physics.engine

    touches
      .filter((t: GestureResponderEvent) => t.type === "press")
      .forEach(() => {
        Matter.Body.setVelocity(entities.Spaceship.body, { x: 0, y: -6 })
      })

    Matter.Engine.update(engine, time.delta)

    // console.log(`gameEngineSize`, gameEngineSize)

    // for (let index = 1; index <= 2; index++) {
    //   if (
    //     entities[`Meteor${index}`].body.bounds.max.x <= 50 &&
    //     !entities[`Meteor${index}`].point
    //   ) {
    //     entities[`Meteor${index}`].point = true
    //     dispatch({ type: "new_point" })
    //   }

    //   if (entities[`Meteor${index}`].body.bounds.max.x <= 0) {
    //     const pipeSizePos = getMeteorRandomPosition(windowWidth * 0.9)

    //     Matter.Body.setPosition(entities[`Meteor${index}`].body, pipeSizePos.pos)

    //     entities[`Meteor${index}`].point = false
    //   }

    //   Matter.Body.translate(entities[`Meteor${index}`].body, { x: -3, y: 0 })
    // }

    Matter.Events.on(engine, "collisionStart", (event) => {
      dispatch({ type: "game_over" })
    })
    return entities
  }
