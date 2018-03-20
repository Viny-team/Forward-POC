// @flow

import * as React from "react"
import { View, Keyboard, TouchableOpacity } from "react-native"
import { RkButton, RkAvoidKeyboard, RkStyleSheet } from "react-native-ui-kitten"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Screen, Header } from "."

type Props = {
  navigation: any,
  children: any
}
type States = {}

export class DrawerWrapper extends React.Component<Props, States> {
  render() {
    return (
      <Screen>
        <Header navigation={this.props.navigation} />
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {this.props.children}
        </View>
      </Screen>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
}))
