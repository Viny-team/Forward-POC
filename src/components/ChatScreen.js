// @flow

import * as React from "react"
import { View, Text } from "react-native"

type Props = {
  navigation: any
}
type States = {}

export default class ChatScreen extends React.Component<Props, States> {
  static navigationOptions = {
    title: "Chat"
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Chat Screen</Text>
      </View>
    )
  }
}
