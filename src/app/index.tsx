import { Text, View } from "react-native"

import { Link } from "@/components/generic/link"
import { ScreenLayout } from "@/components/generic/screen-layout"

export default function App() {
  return (
    <ScreenLayout>
      <View className="flex-1 items-center justify-center space-y-10 p-5">
        <View className="space-y-5 rounded bg-black/30 p-5 px-7">
          <Text className="text-center text-3xl text-white">
            Example of animations using
          </Text>
          <Text className="text-center text-2xl text-white">
            RN-skia and RN-reanimated
          </Text>
        </View>
        <View className="items-center space-y-4">
          <Link href="/animations/tarot" text="Tarot example" />
        </View>
      </View>
    </ScreenLayout>
  )
}
