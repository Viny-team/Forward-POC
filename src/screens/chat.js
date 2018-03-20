// @flow

import * as React from "react"
import {
  AsyncStorage,
  Dimensions,
  ScrollView,
  View,
  Keyboard,
  FlatList
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
import { sleep } from "../utils/wait"
const { width, height } = Dimensions.get("window")

type Props = {
  navigation: any
}
type States = {
  actualId: number,
  username: string,
  messages: Message[],
  buttons: Button[]
}

type Message = {
  id: number,
  message: string,
  owned: boolean
}
type Button = {
  id: number,
  message: string,
  responseMessage: number
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
          id: 0,
          message: "Salut toi, tu veux quoi?",
          owned: false
        },
        {
          id: 1,
          message: "Je veux boiiiireee",
          owned: true
        }
      ],
      buttons: [
        {
          id: 0,
          message: "Je suis la première réponse",
          responseMessage: 1
        },
        {
          id: 2,
          message: "Je suis la deuxième réponse",
          responseMessage: 2
        }
      ],
      actualId: 2
    }
    this._bootstrap()
  }

  async _bootstrap() {
    const username: string = await AsyncStorage.getItem("username")
    this.setState({ username })
  }

  _renderMessage(info) {
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          marginBottom: 15
        }}
      >
        <View
          style={{
            alignSelf: info.item.owned ? "flex-end" : "flex-start",
            borderRadius: 25,
            width: 300,
            backgroundColor: "red",
            padding: 15
          }}
        >
          <RkText>{info.item.message}</RkText>
        </View>
      </View>
    )
  }

  _pushMessage(message: string, owned: boolean) {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          message: message,
          owned: owned,
          id: this.state.actualId
        }
      ],
      actualId: this.state.actualId + 1
    })
  }

  _renderAllButtons(buttons: Button[]) {
    let res = []
    buttons.forEach((button: Button, index: number) => {
      res.push(this._renderButton(button, index.toString()))
    })
    return res
  }

  _renderButton(button: Button, key: string) {
    return (
      <RkButton
        style={{ marginBottom: 15 }}
        rkType="rounded stretch"
        onPress={() =>
          this._handleButton(button.message, button.responseMessage)
        }
        key={key}
      >
        {button.message}
      </RkButton>
    )
  }

  _handleButton(message: string, responseMessage: number) {
    this._pushMessage(message, true)
    sleep(
      250,
      this._pushMessage.bind(this),
      "Je ne connais pas encore: " + responseMessage.toString(),
      false
    )
  }

  render() {
    return (
      <DrawerWrapper navigation={this.props.navigation}>
        <FlatList
          ref="list"
          style={{
            padding: 15,
            backgroundColor: "#333",
            width: width
          }}
          extraData={this.state}
          data={this.state.messages}
          renderItem={this._renderMessage}
          keyExtractor={(item: Message) => item.id.toString()}
        />
        <View style={{ width: width, padding: 15, paddingBottom: 0 }}>
          {this._renderAllButtons(this.state.buttons)}
        </View>
      </DrawerWrapper>
    )
  }
}
