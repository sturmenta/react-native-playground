// TODO:
// - [ ] test the code of rn-game-engine still works -> https://www.youtube.com/watch?v=zK2xYD4Nytw - https://github.dev/SimCoderYoutube/FlappyBirdClone

import { StatusBar } from "expo-status-bar"
import { Text, View } from "react-native"

import { Link } from "@/components/generic/link"
import { ScreenLayout } from "@/components/generic/screen-layout"

export default function Index() {
  return (
    <ScreenLayout
      customHeader={<Link href="/" text="Go back to home" withBackIcon />}>
      <View className="flex flex-1 items-center justify-center">
        <Text className="text-xl text-white">Flappy Bird clone</Text>
      </View>
      <StatusBar hidden />
    </ScreenLayout>
  )
}
