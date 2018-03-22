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
import { TabNavigator, TabBarBottom } from "react-navigation"
import _ from "lodash"
const users = require("../assets/users.json").users

type Props = {
  navigation: any
}
type States = {
  username: string,
  articles: any[]
}

class PersonalArticlesScreen extends RkComponent<Props, States> {
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
      <View style={{ flex: 1, alignItems: "center" }}>
        {(() => {
          if (this.state.articles.length === 0) {
            return <RkText>Oops, vous n'avez aucun articles...</RkText>
          } else {
            return (
              <FlatList
                ref="bottles"
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
    )
  }
}

class AllArticlesScreen extends RkComponent<Props, States> {
  constructor(props: Props) {
    super(props)

    this.state = { username: "", articles: [] }
    this._bootstrap()
  }

  async _bootstrap() {
    const username: string = await AsyncStorage.getItem("username")
    this.setState({
      username,
      articles: _.flatten(_.map(users, user => user.homepage))
    })
  }

  _renderArticle(info: any) {
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
      <View style={{ flex: 1, alignItems: "center" }}>
        {(() => {
          if (this.state.articles.length === 0) {
            return <RkText>Oops, vous n'avez aucun articles...</RkText>
          } else {
            return (
              <FlatList
                ref="bottles"
                style={{
                  padding: 15,
                  width: "100%"
                }}
                extraData={this.state}
                data={this.state.articles}
                renderItem={this._renderArticle}
                keyExtractor={(item, i) => i.toString()}
              />
            )
          }
        })()}
      </View>
    )
  }
}

export default class ArticlesScreen extends RkComponent<Props> {
  static navigationOptions = {
    drawerLabel: "Articles",
    drawerIcon: <Icon name="newspaper" size={24} />
  }

  render() {
    const Route = TabNavigator(
      {
        First: {
          screen: PersonalArticlesScreen,
          navigationOptions: {
            title: "Personnalisés",
            tabBarIcon: ({ tintColor }) => (
              <Icon
                name="account-check"
                size={40}
                style={{ color: "#661D32" }}
              />
            )
          }
        },
        Second: {
          screen: AllArticlesScreen,
          navigationOptions: {
            title: "Tous",
            tabBarIcon: ({ tintColor }) => (
              <Icon
                name="all-inclusive"
                size={40}
                style={{ color: "#661D32" }}
              />
            )
          }
        }
      },
      {
        tabBarComponent: props => {
          return <TabBarBottom {...props} style={{ backgroundColor: "#fff" }} />
        },
        tabBarPosition: "bottom",
        tabBarOptions: {
          activeTintColor: "#661D32",
          inactiveTintColor: "grey"
        },
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
