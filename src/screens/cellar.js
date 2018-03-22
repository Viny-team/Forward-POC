// @flow

import * as React from "react"
import { AsyncStorage, View, FlatList, Image, Keyboard } from "react-native"
import {
  RkText,
  RkButton,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkCard,
  RkComponent
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
  bottles: any[]
}

export default class ArticlesScreen extends RkComponent<Props, States> {
  static navigationOptions = {
    drawerLabel: "Cave",
    drawerIcon: <Icon name="database" size={24} />
  }

  constructor(props: Props) {
    super(props)

    this.state = { username: "", bottles: [] }
    this._bootstrap()
  }

  async _bootstrap() {
    const username: string = await AsyncStorage.getItem("username")
    const user = _.find(users, { username })
    if (user != null) this.setState({ bottles: user.cellar })
    this.setState({ username })
  }

  _renderBottle(info: any) {
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
            source={{ uri: info.item.image }}
          />
          <View style={{ width: 270 - 100, padding: 15 }}>
            <RkText style={{ fontSize: 20 }}>{info.item.name}</RkText>
            <RkText style={{ fontSize: 12 }}>{info.item.date}</RkText>
          </View>
        </View>
      </RkCard>
    )
  }

  render() {
    return (
      <DrawerWrapper navigation={this.props.navigation}>
        <View style={{ flex: 1, alignItems: "center" }}>
          {(() => {
            if (this.state.bottles.length === 0) {
              return (
                <RkText>
                  Oops, vous n'avez aucune bouteille dans votre cave...
                </RkText>
              )
            } else {
              return (
                <FlatList
                  ref="articles"
                  style={{
                    padding: 15,
                    width: "100%"
                  }}
                  extraData={this.state}
                  data={this.state.bottles}
                  renderItem={this._renderBottle}
                  keyExtractor={item => item.name}
                />
              )
            }
          })()}
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
