import { StatusBar } from "expo-status-bar"
import { useState } from "react"
import { Text, View } from "react-native"

import { Link } from "@/components/generic/link"
import { ScreenLayout } from "@/components/generic/screen-layout"
import { entities } from "@/game-engine/flappy-bird/entities"
import { physics } from "@/game-engine/flappy-bird/physics"
import { GameEngine_Generic } from "@/game-engine/game-engine"

export default function Index() {
  const [currentPoints, setCurrentPoints] = useState(0)

  return (
    <ScreenLayout
      customHeader={<Link href="/" text="Go back to home" withBackIcon />}>
      <View className="relative flex w-full flex-1">
        <View className="w-full items-center">
          <Text className="text-4xl text-white">{currentPoints}</Text>
        </View>
        <GameEngine_Generic
          currentPoints={{ set: setCurrentPoints, value: currentPoints }}
          entities={entities}
          physics={physics}
        />
      </View>
      <StatusBar hidden />
    </ScreenLayout>
  )
}
