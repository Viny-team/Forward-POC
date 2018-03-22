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
import MapView, { Marker } from "react-native-maps"
import _ from "lodash"
const users = require("../assets/users.json").users
const cavistes = require("../assets/cavistes.json").cellarmen

type Props = {
  navigation: any
}
type States = {
  username: string,
  position: Position
}

type Position = {
  latitude: number,
  longitude: number
}

export default class MapsScreen extends React.Component<Props, States> {
  static navigationOptions = {
    drawerLabel: "Carte",
    drawerIcon: <Icon name="google-maps" size={24} />
  }

  constructor(props: Props) {
    super(props)

    const position = navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        position: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      })
    })
    this.state = { username: "", position: { latitude: 0, longitude: 0 } }
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
              latitude: this.state.position.latitude,
              longitude: this.state.position.longitude,
              latitudeDelta: 0.07,
              longitudeDelta: 0.07
            }}
          >
            {cavistes.map(caviste => (
              <Marker
                key={caviste.id}
                coordinate={{
                  latitude: caviste.latitude,
                  longitude: caviste.longitude
                }}
                title={caviste.name}
                description={caviste.description}
              />
            ))}
          </MapView>
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
