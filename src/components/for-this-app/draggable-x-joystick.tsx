import { ArrowLeft, ArrowRight } from "lucide-react-native"
import { Text, View } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from "react-native-reanimated"

// TODO: implement runOnUI

export const DraggableXJoystick = ({
  onMoveLeft,
  onMoveRight
}: {
  onMoveLeft: () => void
  onMoveRight: () => void
}) => {
  const pressed = useSharedValue(false)
  const offset = useSharedValue(0)

  const genericWorklet = (cb: () => void) => {
    "worklet"
    runOnJS(cb)()
  }

  const pan = Gesture.Pan()
    .onBegin(() => (pressed.value = true))
    .onChange((event) => {
      if (event.translationX > 0) genericWorklet(onMoveRight)
      else if (event.translationX < 0) genericWorklet(onMoveLeft)

      if (event.translationX > -90 && event.translationX < 90)
        offset.value = event.translationX
    })
    .onFinalize(() => {
      offset.value = withSpring(0)
      pressed.value = false

      console.log("stop moving")
    })

  const animatedStyleForDraggableButton = useAnimatedStyle(() => ({
    transform: [
      { translateX: offset.value },
      { scale: withTiming(pressed.value ? 1 : 0.8) }
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
