import { RkTheme } from "react-native-ui-kitten"
import { Theme } from "./theme"

export let bootstrap = () => {
  RkTheme.setTheme(Theme, null)
}
