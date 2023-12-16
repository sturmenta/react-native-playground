import { SafeAreaView } from "react-native-safe-area-context"

export const ScreenLayout = ({
  children,
  customHeader
}: {
  children: React.ReactNode
  customHeader?: React.ReactNode
}) => {
  return (
    <SafeAreaView className="flex-1 bg-emerald-700">
      {customHeader}
      {children}
    </SafeAreaView>
  )
}
