import { StatusBar, StyleSheet, View } from "react-native"
import { useSharedValue } from "react-native-reanimated"

import { TarotCard } from "@/components/for-this-app/tarot-card"
import { Link } from "@/components/generic/link"
import { ScreenLayout } from "@/components/generic/screen-layout"

const cards = [
  { source: require("@/assets/tarot-cards/death.png") },
  { source: require("@/assets/tarot-cards/chariot.png") },
  { source: require("@/assets/tarot-cards/high-priestess.png") },
  { source: require("@/assets/tarot-cards/justice.png") },
  { source: require("@/assets/tarot-cards/lover.png") },
  { source: require("@/assets/tarot-cards/pendu.png") },
  { source: require("@/assets/tarot-cards/tower.png") },
  { source: require("@/assets/tarot-cards/strength.png") }
]

export const assets = cards.map((card) => card.source)

export default function Index() {
  const shuffleBack = useSharedValue(false)

  return (
    <ScreenLayout
      customHeader={<Link href="/" text="Go back to home" withBackIcon />}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {cards.map((card, index) => (
          <TarotCard
            card={card}
            key={index}
            index={index}
            shuffleBack={shuffleBack}
          />
        ))}
      </View>
    </ScreenLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: "lightblue"
  }
})
