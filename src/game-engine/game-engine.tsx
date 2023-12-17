import { useRef, useState } from "react"
import { GameEngine } from "react-native-game-engine"

import { vh, vw } from "@/utils/dimensions"

// custom types because in the original library, the stop() method is not typed
interface MyGameEngine extends GameEngine {
  stop: Function
}

export const GameEngine_Generic = ({
  currentPoints,
  entities,
  physics,
  width,
  height
}: {
  currentPoints: { set: Function; value: number }
  entities: Function
  physics: Function
  width?: number
  height?: number
}) => {
  const ref_gameEngine = useRef<MyGameEngine | null>(null)
  const [running, setRunning] = useState(true)

  const gameEngineSize = { width: width || vw, height: height || vh }

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
