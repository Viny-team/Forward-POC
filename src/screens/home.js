// @flow

import * as React from "react"
import { AsyncStorage, View, FlatList, Image, Keyboard } from "react-native"
import {
  RkText,
  RkButton,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkCard
} from "react-native-ui-kitten"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { DrawerWrapper, Separator } from "../components"
import _ from "lodash"
const users = require("../assets/users.json").users

type Props = {
  navigation: any
}
type States = {
  username: string,
  articles: any[]
}

export default class HomeScreen extends React.Component<Props, States> {
  static navigationOptions = {
    drawerLabel: "Accueil",
    drawerIcon: <Icon name="home" size={24} />
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
        <View style={{ flex: 1, alignItems: "center" }}>
          <RkText style={{ fontSize: 40 }}>
            Bienvenue {this.state.username}
          </RkText>
          <Separator size={20} />
          <RkButton
            rkType="rounded"
            style={{ backgroundColor: "#661D32", width: 150 }}
          >
            Commencer une discussion
          </RkButton>
        </View>
      </DrawerWrapper>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: theme.colors.screen.base
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
}))
