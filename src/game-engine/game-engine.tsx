import React, { useEffect, useImperativeHandle, useRef, useState } from "react"
import { GameEngine } from "react-native-game-engine"

import { vh, vw } from "@/utils/dimensions"

// add custom types because in the original library, the stop() and dispatch() method is not typed
interface MyGameEngine extends GameEngine {
  stop: Function
  dispatch: Function
}

interface GameEngine_Generic__Props {
  currentPoints: { set: Function; value: number }
  entities: Function
  physics: Function
  width?: number
  height?: number
}

export interface GameEngine_Generic__Ref {
  dispatch(e: any): void
}

export const GameEngine_Generic = React.forwardRef<
  GameEngine_Generic__Ref,
  GameEngine_Generic__Props
>(
  (
    {
      currentPoints,
      entities,
      physics,
      width,
      height
    }: GameEngine_Generic__Props,
    ref
  ) => {
    const ref_gameEngine = useRef<MyGameEngine | null>(null)
    const [running, setRunning] = useState(true)

    const gameEngineSize = { width: width || vw, height: height || vh }

    // ────────────────────────────────────────────────────────────────────────────────
    useImperativeHandle(ref, () => ({ dispatch })) // https://stackoverflow.com/a/64491870
    const dispatch = (e: any) => ref_gameEngine.current?.dispatch(e)
    // ────────────────────────────────────────────────────────────────────────────────

    return (
      <GameEngine
        ref={ref_gameEngine}
        systems={[physics({ gameEngineSize })]}
        entities={entities({ gameEngineSize })}
        running={running}
        onEvent={(e: any) => {
          switch (e.type) {
            case "game_over":
              setRunning(false)
              ref_gameEngine.current?.stop()
              break
            case "new_point":
              currentPoints.set(currentPoints.value + 1)
              break
          }
        }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
    )
  }
)
