// @flow

import * as React from "react"
import { AsyncStorage, View, Text } from "react-native"

type Props = {
  navigation: any
}
type States = {
  username: string
}

export default class MenuScreen extends React.Component<Props, States> {
  static navigationOptions = {
    title: "Menu Principal"
  }

  constructor(props: Props) {
    super(props)

    this.state = { username: "" }
    this._bootstrap()
  }

  _bootstrap = async () => {
    const username: string = await AsyncStorage.getItem("username")
    this.setState({ username })
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Bienvenue {this.state.username}</Text>
      </View>
    )
  }
}
