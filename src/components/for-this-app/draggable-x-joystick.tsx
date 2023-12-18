// @sources
// - useDerivedValue -> https://docs.swmansion.com/react-native-reanimated/docs/2.x/api/hooks/useDerivedValue/
// - wrapper -> https://github.com/software-mansion/react-native-reanimated/issues/1393#issuecomment-1041341133
// - another way that works -> https://github.com/software-mansion/react-native-reanimated/issues/1445#issuecomment-729148598

import { ArrowLeft, ArrowRight } from "lucide-react-native"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated"

export const DraggableXJoystick = ({
  onMoveLeft,
  onMoveRight,
  onNoMove,
  maxSizes
}: {
  onMoveLeft: () => void
  onMoveRight: () => void
  onNoMove: () => void
  maxSizes: { width: number; height: number }
}) => {
  const [currentPosition, setCurrentPosition] = useState<
    "left" | "center" | "right"
  >("center")

  const pressed = useSharedValue(false)
  const offset = useSharedValue(0)

  // NOTE: use useEffect to call the callbacks many times
  useEffect(() => {
    if (currentPosition === "left") onMoveLeft()
    else if (currentPosition === "right") onMoveRight()
    else onNoMove()
  }, [currentPosition])

  // ─────────────────────────────────────────────────────────────────────
  // NOTE: define wrapper function before it's called in useDerivedValue
  const wrapper = (value: number) => {
    if (value > 0) setCurrentPosition("right")
    else if (value < 0) setCurrentPosition("left")
    else setCurrentPosition("center")
  }

  useDerivedValue(() => {
    if (pressed.value) runOnJS(wrapper)(offset.value)
    else runOnJS(wrapper)(0)
  }, [offset.value, pressed.value])
  // ─────────────────────────────────────────────────────────────────────

  const oneThirdContainerWidth = maxSizes.width / 3

  const pan = Gesture.Pan()
    .onBegin(() => (pressed.value = true))
    .onChange((event) => {
      if (
        event.translationX > -oneThirdContainerWidth &&
        event.translationX < oneThirdContainerWidth
      ) {
        // set max movement
        offset.value = event.translationX
      }
    })
    .onFinalize(() => {
      offset.value = withSpring(0)
      pressed.value = false
    })

  const animatedStyleForDraggableButton = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value },
      { scale: withTiming(pressed.value ? 1.2 : 1) }
    ],
    backgroundColor: pressed.value ? "#dbc140" : "#eab308"
  }))

  const animatedStyleForArrows = useAnimatedStyle(() => ({
    opacity: withTiming(pressed.value ? 0 : 1)
  }))

  return (
    <GestureDetector gesture={pan}>
      <View className="flex flex-1 flex-row items-center justify-center space-x-3 rounded-md bg-white/40">
        <Animated.View style={animatedStyleForArrows}>
          <ArrowLeft size={32} className="text-gray-200" />
        </Animated.View>
        <Animated.View
          className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500"
          style={animatedStyleForDraggableButton}>
          <Text className="text-white">Drag</Text>
        </Animated.View>
        <Animated.View style={animatedStyleForArrows}>
          <ArrowRight size={32} className="text-gray-200" />
        </Animated.View>
      </View>
    </GestureDetector>
  )
}
