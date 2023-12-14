import { DEV__SHOW_BORDER_COLORS } from "@/config/dev"

export const showDevBorder = (tw_border: string) =>
  DEV__SHOW_BORDER_COLORS ? "border " + tw_border : ""
