// @flow

import * as React from "react"
import {
  AsyncStorage,
  Dimensions,
  ScrollView,
  View,
  Keyboard,
  FlatList,
  Image,
  ActivityIndicator
} from "react-native"
import {
  RkText,
  RkButton,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkComponent,
  RkCard
} from "react-native-ui-kitten"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { DrawerWrapper, Separator } from "../components"
import { scaleWidth } from "../utils/scale"
import { sleep } from "../utils/wait"
import _ from "lodash"
import { SwitchNavigator } from "react-navigation"
const { width, height } = Dimensions.get("window")
const chatJson = require("../assets/chat.json")
const bottlesJson = require("../assets/bouteilles.json").data
const users = require("../assets/users.json").users

type Props = {
  navigation: any
}
type States = {
  actualId: number,
  username: string,
  messages: Message[],
  buttons: Button[],
  actualMessage: any,
  vinyPhoto: string
}

type Message = {
  id: number,
  message: any,
  owned: boolean
}
type Button = {
  id: number,
  message: string,
  responseMessage: number
}

class FirstChatScreen extends RkComponent<Props, States> {
  constructor(props: Props) {
    super(props)

    const firstMessage = _.find(chatJson.messages, { id: 0 })

    this.state = {
      username: "",
      vinyPhoto: "base",
      actualMessage: (
        <RkText style={{ color: "#fff" }}>{firstMessage.message}</RkText>
      ),
      messages: [
        {
          id: firstMessage.id,
          message: (
            <RkText style={{ color: "#fff" }}>{firstMessage.message}</RkText>
          ),
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
    const user = _.find(users, { username })
    if (user != null) {
      this.setState({ vinyPhoto: user.viny })
    }
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
          {info.item.message}
        </View>
      </View>
    )
  }

  _pushMessage(message: any, owned: boolean) {
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

  async _handleButton(message: string, responseMessage: number) {
    this._pushMessage(
      <RkText style={{ color: "#fff" }}>{message}</RkText>,
      true
    )
    this.setState({
      actualMessage: <ActivityIndicator size="large" color="#fff" />,
      buttons: []
    })
    new Promise(r =>
      sleep(750, this._pushChatbotMessage.bind(this), responseMessage)
    )
  }

  async _pushChatbotMessage(resId: number) {
    const responseMessage = _.find(chatJson.messages, x => x.id == resId)
    if (responseMessage == null) return
    if (responseMessage.type === "answers") {
      this._pushMessage(
        <RkText style={{ color: "#fff" }}>{responseMessage.message}</RkText>,
        false
      )
      this.setState({
        actualMessage: (
          <RkText style={{ color: "#fff" }}>{responseMessage.message}</RkText>
        ),
        buttons: responseMessage.answers.map((x, i) => {
          return {
            id: i,
            message: x.message,
            responseMessage: x.next
          }
        })
      })
    } else {
      const message = (
        <RkText style={{ color: "#fff" }}>
          J'ai trouvé exactement ce qu'il vous faut !
        </RkText>
      )
      this._pushMessage(message, false)
      this.setState({
        actualMessage: message
      })
      new Promise(r =>
        sleep(1500, this.props.navigation.navigate, "Second", {
          bottleIds: responseMessage.ids
        })
      )
    }
  }

  render() {
    const imgMap = {
      mexicanos: require("../assets/images/VINY-mexicanos.png"),
      viking: require("../assets/images/VINY-viking.png"),
      texas: require("../assets/images/VINY-texas.png"),
      french: require("../assets/images/VINY-french.png"),
      base: require("../assets/images/VINY-base.png")
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ height: 120 }}>
            <View
              style={{
                borderRadius: 25,
                width: 300,
                padding: 15,
                backgroundColor: "#661D32"
              }}
            >
              {this.state.actualMessage}
            </View>
          </View>
          <Image
            style={{ width: 203, height: 250 }}
            source={imgMap[this.state.vinyPhoto]}
          />
        </View>
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
      </View>
    )
  }
}

class SecondChatScreen extends RkComponent<Props> {
  _renderMessage(info: any) {
    console.log(info)
    return (
      <RkCard style={{ marginBottom: 25 }}>
        <View
          rkCardContent
          style={{
            flex: 1,
            flexWrap: "wrap",
            flexDirection: "row"
          }}
        >
          <Image
            style={{ width: 100, height: 250 }}
            source={{ uri: info.item.photoUrl }}
          />
          <View style={{ width: 270 - 100, padding: 15 }}>
            <RkText style={{ fontSize: 20 }}>{info.item.name}</RkText>
            <RkText style={{ marginTop: 5, fontSize: 10 }}>
              Année: {info.item.age.toString()}
            </RkText>
            <RkText style={{ fontSize: 10 }}>
              {info.item.price.toString()}€
            </RkText>
          </View>
        </View>
      </RkCard>
    )
  }

  render() {
    const bottleIds = this.props.navigation.state.params.bottleIds
    const bottles = bottleIds.map(id => _.find(bottlesJson, { id }))
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          ref="list"
          style={{
            padding: 15,
            width: width
          }}
          extraData={this.state}
          data={bottles}
          renderItem={this._renderMessage}
          keyExtractor={(item, i) => i.toString()}
        />
        <RkButton
          style={{
            marginBottom: 15,
            marginLeft: 20,
            marginRight: 20,
            backgroundColor: "#661D32"
          }}
          rkType="rounded stretch"
          onPress={() => this.props.navigation.navigate("First")}
        >
          <RkText
            style={{
              color: "#fff"
            }}
          >
            Recommencer la recherche
          </RkText>
        </RkButton>
      </View>
    )
  }
}

export default class ChatScreen extends RkComponent<Props> {
  static navigationOptions = {
    drawerLabel: "Chat",
    drawerIcon: <Icon name="message-text" size={24} />
  }

  render() {
    const Route = SwitchNavigator(
      {
        First: FirstChatScreen,
        Second: SecondChatScreen
      },
      {
        initialRouteName: "First"
      }
    )
    return (
      <DrawerWrapper navigation={this.props.navigation}>
        <Route />
      </DrawerWrapper>
    )
  }
}
