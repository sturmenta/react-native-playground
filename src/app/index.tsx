import { Link } from "expo-router"
import { StyleSheet, View } from "react-native"

import { ScreenLayout } from "@/components/generic/ScreenLayout"

export default function App() {
  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Link href="/animations-example/lottie">Lottie</Link>
        <Link href="/animations-example/skia">Skia</Link>
      </View>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})
