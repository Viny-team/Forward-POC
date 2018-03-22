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
import MapView from "react-native-maps"
import _ from "lodash"
const users = require("../assets/users.json").users

type Props = {
  navigation: any
}
type States = {
  username: string
}

export default class MapsScreen extends React.Component<Props, States> {
  static navigationOptions = {
    drawerLabel: "Carte",
    drawerIcon: <Icon name="google-maps" size={24} />
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
          <MapView
            style={{ width: "100%", height: "100%" }}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          />
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
