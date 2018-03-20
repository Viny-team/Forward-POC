// @flow

import * as React from "react"
import { Keyboard } from "react-native"
import {
  RkComponent,
  RkAvoidKeyboard,
  RkStyleSheet
} from "react-native-ui-kitten"

type Props = {
  children: any
}
type States = {}

export class Screen extends RkComponent<Props, States> {
  render() {
    return (
      <RkAvoidKeyboard
        onStartShouldSetResponder={e => true}
        onResponderRelease={e => Keyboard.dismiss()}
        style={styles.screen}
      >
        {this.props.children}
      </RkAvoidKeyboard>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: theme.colors.screen.base
  }
}))
