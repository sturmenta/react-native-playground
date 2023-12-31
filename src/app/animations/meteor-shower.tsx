import { StatusBar } from "expo-status-bar"
import { useRef, useState } from "react"
import { Text, View } from "react-native"

import { DraggableXJoystick } from "@/components/for-this-app/draggable-x-joystick"
import { Link } from "@/components/generic/link"
import { ScreenLayout } from "@/components/generic/screen-layout"
import {
  GameEngine_Generic,
  GameEngine_Generic__Ref
} from "@/game-engine/game-engine"
import { entities } from "@/game-engine/meteor-shower/entities"
import { physics } from "@/game-engine/meteor-shower/physics"
import { ContainerWithDimensions } from "@/utils/container-with-dimensions"

export default function Index() {
  const ref_gameEngine = useRef<GameEngine_Generic__Ref | null>(null)

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
                ref={ref_gameEngine}
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
        <View className="flex flex-row py-4">
          <ContainerWithDimensions
            viewProps={{ style: { flex: 1, height: 100 } }}>
            {({ width, height }) => {
              return (
                <DraggableXJoystick
                  onMoveLeft={(value) =>
                    ref_gameEngine.current?.dispatch({
                      type: "spaceship__move_left",
                      value
                    })
                  }
                  onMoveRight={(value) =>
                    ref_gameEngine.current?.dispatch({
                      type: "spaceship__move_right",
                      value
                    })
                  }
                  onNoMove={() =>
                    ref_gameEngine.current?.dispatch({
                      type: "spaceship__no_move"
                    })
                  }
                  maxSizes={{ width, height }}
                />
              )
            }}
          </ContainerWithDimensions>
        </View>
      </View>
      <StatusBar hidden />
    </ScreenLayout>
  )
}
