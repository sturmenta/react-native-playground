import Matter, { Engine } from "matter-js"

import { meteorSize } from "./entities"
import { getMeteorRandomPosition } from "./utils/random"

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
  (entities: EntitiesInterface, { events, time, dispatch }: any) => {
    const engine = entities.physics.engine
    Matter.Engine.update(engine, time.delta)

    if (events.length) {
      for (let i = 0; i < events.length; i++) {
        if (events[i].type === "spaceship__move_left") {
          Matter.Body.translate(entities.Spaceship.body, { x: -5, y: 0 })
        } else if (events[i].type === "spaceship__move_right") {
          Matter.Body.translate(entities.Spaceship.body, { x: +5, y: 0 })
        }
      }
    }

    // for (let index = 1; index <= 3; index++) {
    //   const isMeteorLeaveScreen =
    //     entities[`Meteor${index}`].body.bounds.max.y >=
    //     gameEngineSize.height + meteorSize * 2

    //   if (isMeteorLeaveScreen && !entities[`Meteor${index}`].point) {
    //     // score a new point
    //     entities[`Meteor${index}`].point = true
    //     dispatch({ type: "new_point" })
    //   }

    //   if (isMeteorLeaveScreen) {
    //     // respawn meteor
    //     const meteorRandomPosition = getMeteorRandomPosition({
    //       addToPosY: 0,
    //       gameEngineSize
    //     })
    //     Matter.Body.setPosition(
    //       entities[`Meteor${index}`].body,
    //       meteorRandomPosition
    //     )
    //     entities[`Meteor${index}`].point = false
    //   }

    //   Matter.Body.translate(entities[`Meteor${index}`].body, { y: +3, x: 0 })
    //   Matter.Body.translate(entities[`Meteor${index}`].body, { y: +3, x: 0 })
    //   Matter.Body.translate(entities[`Meteor${index}`].body, { y: +3, x: 0 })
    // }

    Matter.Events.on(engine, "collisionStart", () =>
      dispatch({ type: "game_over" })
    )

    return entities
  }
