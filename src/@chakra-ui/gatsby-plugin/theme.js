import { extendTheme } from "@chakra-ui/react"
import { colors, fonts, styles } from "../../theme"

const overrides = {
  styles,
  colors,
  fonts,
}

export default extendTheme(overrides)
