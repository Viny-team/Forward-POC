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
import { ROUTE_APP_CHAT } from "../config/router"
const users = require("../assets/users.json").users

type Props = {
  navigation: any
}
type States = {
  username: string,
  vinyPhoto: string
}

export default class HomeScreen extends React.Component<Props, States> {
  static navigationOptions = {
    drawerLabel: "Accueil",
    drawerIcon: <Icon name="home" size={24} />
  }

  constructor(props: Props) {
    super(props)

    this.state = { username: "", vinyPhoto: "base" }
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

  render() {
    const imgMap = {
      mexicanos: require("../assets/images/VINY-mexicanos.png"),
      viking: require("../assets/images/VINY-viking.png"),
      texas: require("../assets/images/VINY-texas.png"),
      french: require("../assets/images/VINY-french.png"),
      base: require("../assets/images/VINY-base.png")
    }
    return (
      <DrawerWrapper navigation={this.props.navigation}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Image
            style={{ width: 203, height: 250 }}
            source={imgMap[this.state.vinyPhoto]}
          />
          <RkText style={{ fontSize: 40 }}>
            Bienvenue {this.state.username}
          </RkText>
          <Separator size={20} />
          <RkButton
            rkType="rounded"
            style={{ backgroundColor: "#661D32", width: 150 }}
            onPress={() => this.props.navigation.navigate(ROUTE_APP_CHAT)}
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
