import { Link as ExpoLink } from "expo-router"
import { ArrowLeft, ArrowRight } from "lucide-react-native"
import { Text, TouchableOpacity } from "react-native"

import { showDevBorder } from "@/utils/show-dev-border"

export const Link = ({
  href,
  text,
  withBackIcon
}: {
  href: string
  text: string
  withBackIcon?: boolean
}) => {
  return (
    <ExpoLink href={href} asChild>
      <TouchableOpacity
        className={`z-50 flex flex-row items-center space-x-2 p-3 ${showDevBorder(
          "border-red-500"
        )}`}>
        {withBackIcon && <ArrowLeft size={20} className="text-white" />}
        <Text className="text-lg text-white">{text}</Text>
        {!withBackIcon && <ArrowRight size={20} className="ml-2 text-white" />}
      </TouchableOpacity>
    </ExpoLink>
  )
}
