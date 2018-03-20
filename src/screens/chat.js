// @flow

import * as React from "react"
import { AsyncStorage, View, Keyboard } from "react-native"
import {
  RkText,
  RkButton,
  RkAvoidKeyboard,
  RkStyleSheet
} from "react-native-ui-kitten"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import DrawerWrapper from "../components/drawerWrapper"

type Props = {
  navigation: any
}
type States = {
  username: string
}

export default class ChatScreen extends React.Component<Props, States> {
  static navigationOptions = {
    drawerLabel: "Chat",
    drawerIcon: <Icon name="message-text" size={24} />
  }

  constructor(props: Props) {
    super(props)

    this.state = { username: "" }
    this._bootstrap()
  }

  async _bootstrap() {
    const username: string = await AsyncStorage.getItem("username")
    this.setState({ username })
  }

  render() {
    return (
      <DrawerWrapper navigation={this.props.navigation}>
        <RkText>I Chat with you {this.state.username}</RkText>
      </DrawerWrapper>
    )
  }
}
