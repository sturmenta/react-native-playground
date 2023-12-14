import { Text, View } from "react-native"

import { Link } from "@/components/generic/link"
import { ScreenLayout } from "@/components/generic/screen-layout"

export default function App() {
  return (
    <ScreenLayout>
      <View className="flex-1 items-center justify-center space-y-10">
        <Text className="text-4xl text-white">Animations examples</Text>
        <View className="items-center space-y-4">
          <Link href="/animations-example/lottie" text="Lottie" />
          <Link href="/animations-example/skia" text="Skia" />
        </View>
      </View>
    </ScreenLayout>
  )
}
