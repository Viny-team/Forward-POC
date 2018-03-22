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
  articles: any[]
}

export default class ArticlesScreen extends RkComponent<Props, States> {
  static navigationOptions = {
    drawerLabel: "Articles",
    drawerIcon: <Icon name="newspaper" size={24} />
  }

  constructor(props: Props) {
    super(props)

    this.state = { username: "", articles: [] }
    this._bootstrap()
  }

  async _bootstrap() {
    const username: string = await AsyncStorage.getItem("username")
    const user = _.find(users, { username })
    if (user != null) {
      this.setState({ articles: user.homepage })
    }
    this.setState({ username })
  }

  _renderArticle(info: any) {
    return (
      <RkCard style={{ marginBottom: 25 }}>
        <View rkCardHeader>
          <RkText>{info.item.title}</RkText>
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
            if (this.state.articles.length === 0) {
              return <RkText>Oops, vous n'avez aucun articles...</RkText>
            } else {
              return (
                <FlatList
                  ref="articles"
                  style={{
                    padding: 15,
                    width: "100%"
                  }}
                  extraData={this.state}
                  data={this.state.articles}
                  renderItem={this._renderArticle}
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
