import { StatusBar } from "expo-status-bar"
import { ArrowLeft, ArrowRight } from "lucide-react-native"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { Link } from "@/components/generic/link"
import { ScreenLayout } from "@/components/generic/screen-layout"
import { GameEngine_Generic } from "@/game-engine/game-engine"
import { entities } from "@/game-engine/meteor-shower/entities"
import { physics } from "@/game-engine/meteor-shower/physics"
import { ContainerWithDimensions } from "@/utils/container-with-dimensions"

export default function Index() {
  const [currentPoints, setCurrentPoints] = useState(0)
  const [calculatingGameEngineSize, setCalculatingGameEngineSize] =
    useState(true)

  return (
    <ScreenLayout
      customHeader={<Link href="/" text="Go back to home" withBackIcon />}>
      <View className="flex w-full flex-1 p-4">
        <View className="mb-4 flex w-full flex-row items-center justify-center">
          <Text className="text-lg text-white">Score: </Text>
          <Text className="-mb-1 text-4xl text-white">{currentPoints}</Text>
        </View>
        <ContainerWithDimensions
          viewProps={{
            style: {
              flex: 1,
              borderColor: "white",
              borderWidth: 1,
              overflow: "hidden"
            }
          }}>
          {({ width, height }) => {
            // force loading to only send the dimensions after mount the footer buttons
            setTimeout(() => setCalculatingGameEngineSize(false), 100)
            if (calculatingGameEngineSize) return null

            return (
              <GameEngine_Generic
                currentPoints={{
                  set: setCurrentPoints,
                  value: currentPoints
                }}
                entities={entities}
                physics={physics}
                width={width}
                height={height}
              />
            )
          }}
        </ContainerWithDimensions>
        <View className="flex flex-row space-x-5 p-5">
          <TouchableOpacity className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500">
            <Text className="text-white">Fire!</Text>
          </TouchableOpacity>
          <View className="flex flex-1 flex-row items-center justify-center space-x-3 rounded-md bg-white/40">
            <ArrowLeft size={32} color="white" />
            <View className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500">
              <Text className="text-white">Drag</Text>
            </View>
            <ArrowRight size={32} color="white" />
          </View>
        </View>
      </View>
      <StatusBar hidden />
    </ScreenLayout>
  )
}
