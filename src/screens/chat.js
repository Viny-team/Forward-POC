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
  username: string,
  messages: Message[],
  id: number
}

type Message = {
  message: string,
  owned: boolean,
  id: number
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
          owned: false,
          id: 0
        },
        {
          message: "Je veux boiiiireee",
          owned: true,
          id: 1
        }
      ],
      id: 2
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

  _handleButton() {
    this._pushMessage("Allô, t'es encore là?", true)
    sleep(
      250,
      this._pushMessage.bind(this),
      "Je suis encore là, mais mon développeur a oublié d'implémenter un semblant d'intelligence...",
      false
    )
  }

  _pushMessage(message: string, owned: boolean) {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          message: message,
          owned: owned,
          id: this.state.id
        }
      ],
      id: this.state.id + 1
    })
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
