import { Link } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

import { ScreenLayout } from "@/components/generic/ScreenLayout"

export default function Index() {
  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text>Lottie animations</Text>
        <Link href="/">Back to home</Link>
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
