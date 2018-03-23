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
  advices: any[]
}

export default class ConseilsScreen extends RkComponent<Props, States> {
  static navigationOptions = {
    drawerLabel: "Conseils",
    drawerIcon: <Icon name="information" size={24} />
  }

  constructor(props: Props) {
    super(props)

    this.state = { username: "", advices: [] }
    this._bootstrap()
  }

  async _bootstrap() {
    const username: string = await AsyncStorage.getItem("username")
    const user = _.find(users, { username })
    if (user != null) {
      this.setState({ advices: user.advice })
    }
    this.setState({ username })
  }

  _renderAdvice(info: any) {
    return (
      <RkCard style={{ marginBottom: 25 }}>
        <View rkCardHeader>
          <RkText style={{ fontSize: 20 }}>{info.item.title}</RkText>
        </View>
        <Image
          rkCardImg
          source={{
            uri: info.item.image
          }}
        />
        <View rkCardContent>
          <RkText>{info.item.description}</RkText>
        </View>
      </RkCard>
    )
  }

  render() {
    return (
      <DrawerWrapper navigation={this.props.navigation}>
        <View style={{ flex: 1, alignItems: "center" }}>
          {(() => {
            if (this.state.advices.length === 0) {
              return <RkText>Oops, vous n'avez aucun conseil...</RkText>
            } else {
              return (
                <FlatList
                  ref="bottles"
                  style={{
                    padding: 15,
                    width: "100%"
                  }}
                  extraData={this.state}
                  data={this.state.advices}
                  renderItem={this._renderAdvice}
                  keyExtractor={item => item.title}
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
