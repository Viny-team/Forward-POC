// @flow

import * as React from "react"
import {
  AsyncStorage,
  Dimensions,
  ScrollView,
  View,
  Keyboard
} from "react-native"
import {
  RkText,
  RkButton,
  RkAvoidKeyboard,
  RkStyleSheet
} from "react-native-ui-kitten"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { DrawerWrapper, Separator } from "../components"
import { scaleWidth } from "../utils/scale"
const { width, height } = Dimensions.get("window")

type Props = {
  navigation: any
}
type States = {
  username: string,
  messages: Message[]
}
type Message = {
  message: string,
  owned: boolean
}

export default class ChatScreen extends React.Component<Props, States> {
  static navigationOptions = {
    drawerLabel: "Chat",
    drawerIcon: <Icon name="message-text" size={24} />
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      username: "",
      messages: [
        {
          message: "Salut toi, tu veux quoi?",
          owned: false
        },
        {
          message: "Je veux boiiiireee",
          owned: true
        }
      ]
    }
    this._bootstrap()
  }

  async _bootstrap() {
    const username: string = await AsyncStorage.getItem("username")
    this.setState({ username })
  }

  _renderAllMessages(messages: Message[]) {
    let resp = []
    messages.forEach((m, key) => resp.push(this._renderMessage(m, key)))
    return resp
  }

  _renderMessage(m: Message, key: number) {
    return (
      <View style={{ flex: 1, width: "100%" }} key={key}>
        <View
          style={{
            alignSelf: m.owned ? "flex-end" : "flex-start",
            borderRadius: 25,
            width: 300,
            backgroundColor: "red",
            padding: 15
          }}
        >
          <RkText>{m.message}</RkText>
        </View>
        <Separator size={15} />
      </View>
    )
  }

  _handleButton() {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          message: "Allô, t'es encore là?",
          owned: true
        }
      ]
    })
  }

  render() {
    return (
      <DrawerWrapper navigation={this.props.navigation}>
        <ScrollView
          style={{
            width: width,
            backgroundColor: "#333",
            padding: 15
          }}
        >
          {this._renderAllMessages(this.state.messages)}
        </ScrollView>
        <View style={{ width: width, padding: 15 }}>
          <RkButton
            rkType="rounded stretch"
            onPress={() => this._handleButton()}
          >
            Reponse 1
          </RkButton>
          <Separator size={15} />
          <RkButton rkType="rounded stretch">Reponse 2</RkButton>
        </View>
      </DrawerWrapper>
    )
  }
}
