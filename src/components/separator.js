// @flow

import * as React from "react"
import { View } from "react-native"
import { RkComponent } from "react-native-ui-kitten"

type Props = {
  size: number
}
type States = {}

export class Separator extends RkComponent<Props, States> {
  render() {
    return <View style={{ height: this.props.size }} />
  }
}
