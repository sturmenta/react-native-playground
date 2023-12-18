import Matter, { Engine } from "matter-js"

import { meteorSize, spaceshipSize } from "./entities"
import { getMeteorRandomPosition } from "./utils/random"

const spaceshipVelocity = 8

// NOTE: the movement could be improved if we get from the controller the
// distance from the drag to the center and transform into velocity

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

    // ─────────────────────────────────────────────────────────────
    const moveSpaceShip = ({ x }: { x: number }) =>
      Matter.Body.setVelocity(entities.Spaceship.body, { x, y: 0 })
    // ─────────────────────────────────────────────────────────────
    const spaceshipXPosition = entities.Spaceship.body.bounds.max.x

    const outsideLeftSide = spaceshipXPosition < spaceshipSize
    const outsideRightSide = spaceshipXPosition > gameEngineSize.width

    // NOTE: this could be improved, adding a obstacle without collision to not spaceship leave the screen
    if (outsideLeftSide)
      Matter.Body.translate(entities.Spaceship.body, {
        x: +spaceshipVelocity,
        y: 0
      })
    if (outsideRightSide)
      Matter.Body.translate(entities.Spaceship.body, {
        x: -spaceshipVelocity,
        y: 0
      })
    // ─────────────────────────────────────────────────────────────
    if (events.length) {
      events.forEach((e: any) => {
        switch (e.type) {
          case "spaceship__move_left":
            moveSpaceShip({ x: -spaceshipVelocity })
            return
          case "spaceship__move_right":
            moveSpaceShip({ x: +spaceshipVelocity })
            return
          case "spaceship__no_move":
            moveSpaceShip({ x: 0 })
            return
        }
      })
    }
    // ─────────────────────────────────────────────────────────────

    for (let index = 1; index <= 3; index++) {
      const isMeteorLeaveScreen =
        entities[`Meteor${index}`].body.bounds.max.y >=
        gameEngineSize.height + meteorSize * 2

      if (isMeteorLeaveScreen && !entities[`Meteor${index}`].point) {
        // score a new point
        entities[`Meteor${index}`].point = true
        dispatch({ type: "new_point" })
      }

      if (isMeteorLeaveScreen) {
        // respawn meteor
        const meteorRandomPosition = getMeteorRandomPosition({
          addToPosY: 0,
          gameEngineSize
        })
        Matter.Body.setPosition(
          entities[`Meteor${index}`].body,
          meteorRandomPosition
        )
        entities[`Meteor${index}`].point = false
      }

      Matter.Body.translate(entities[`Meteor${index}`].body, { y: +3, x: 0 })
      Matter.Body.translate(entities[`Meteor${index}`].body, { y: +3, x: 0 })
      Matter.Body.translate(entities[`Meteor${index}`].body, { y: +3, x: 0 })
    }

    Matter.Events.on(engine, "collisionStart", () =>
      dispatch({ type: "game_over" })
    )

    return entities
  }
