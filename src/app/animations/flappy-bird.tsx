import { StatusBar } from "expo-status-bar"
import { useRef, useState } from "react"
import { Text, View } from "react-native"
import { GameEngine } from "react-native-game-engine"

import { Link } from "@/components/generic/link"
import { ScreenLayout } from "@/components/generic/screen-layout"
import { entities } from "@/game-engine/flappy-bird/entities"
import { physics } from "@/game-engine/flappy-bird/physics"

// custom types because in the original library, the stop() method is not typed
interface MyGameEngine extends GameEngine {
  stop: Function
}

export default function Index() {
  const ref_gameEngine = useRef<MyGameEngine | null>(null)
  const [running, setRunning] = useState(true)
  const [currentPoints, setCurrentPoints] = useState(0)

  return (
    <ScreenLayout
      customHeader={<Link href="/" text="Go back to home" withBackIcon />}>
      <View className="relative flex w-full flex-1">
        <View className="w-full items-center">
          <Text className="text-4xl text-white">{currentPoints}</Text>
        </View>
        <GameEngine
          ref={ref_gameEngine}
          systems={[physics]}
          entities={entities()}
          running={running}
          onEvent={(e: any) => {
            switch (e.type) {
              case "game_over":
                setRunning(false)
                ref_gameEngine.current?.stop()
                break
              case "new_point":
                setCurrentPoints(currentPoints + 1)
                break
            }
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}>
          <StatusBar style="auto" hidden={true} />
        </GameEngine>
      </View>
      <StatusBar hidden />
    </ScreenLayout>
  )
}
