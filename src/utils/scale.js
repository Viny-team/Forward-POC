import { Dimensions } from "react-native"
const { width, height } = Dimensions.get("window")

const scaleWidth = size => {
  return width * 100 / size
}
const scaleHeight = size => {
  return height * 100 / size
}

export { scaleWidth, scaleHeight }
