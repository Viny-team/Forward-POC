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
import _ from "lodash"
const { width, height } = Dimensions.get("window")
const chatJson = require("../assets/chat.json")

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

    const firstMessage = _.find(chatJson.messages, x => x.id == 0)

    this.state = {
      username: "",
      messages: [
        {
          id: firstMessage.id,
          message: firstMessage.message,
          owned: false
        }
      ],
      buttons: firstMessage.answers.map((x, i) => {
        return {
          id: i,
          message: x.message,
          responseMessage: x.next
        }
      }),
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
            padding: 15,
            backgroundColor: "#661D32"
          }}
        >
          <RkText style={{ color: "#fff" }}>{info.item.message}</RkText>
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
        style={{
          marginBottom: 15,
          backgroundColor: "#661D32"
        }}
        rkType="rounded stretch"
        onPress={() =>
          this._handleButton(button.message, button.responseMessage)
        }
        key={key}
      >
        <RkText
          style={{
            color: "#fff"
          }}
        >
          {button.message}
        </RkText>
      </RkButton>
    )
  }

  _handleButton(message: string, responseMessage: number) {
    this._pushMessage(message, true)
    sleep(300, this._pushChatbotMessage.bind(this), responseMessage)
  }

  _pushChatbotMessage(resId: number) {
    const responseMessage = _.find(chatJson.messages, x => x.id == resId)
    if (responseMessage == null) return
    if (responseMessage.type === "answers") {
      this._pushMessage(responseMessage.message, false)
      this.setState({
        buttons: responseMessage.answers.map((x, i) => {
          return {
            id: i,
            message: x.message,
            responseMessage: x.next
          }
        })
      })
    } else {
      this._pushMessage(
        "Je vous propose: " + responseMessage.ids.toString(),
        false
      )
      this.setState({ buttons: [] })
    }
  }

  render() {
    return (
      <DrawerWrapper navigation={this.props.navigation}>
        <FlatList
          ref="list"
          style={{
            padding: 15,
            width: width
          }}
          extraData={this.state}
          data={this.state.messages}
          renderItem={this._renderMessage}
          keyExtractor={(item: Message) => item.id.toString()}
        />
        <View
          style={{
            width: width,
            padding: 15,
            paddingBottom: 0,
            borderColor: "#661D32",
            borderTopWidth: 2
          }}
        >
          {this._renderAllButtons(this.state.buttons)}
        </View>
      </DrawerWrapper>
    )
  }
}
