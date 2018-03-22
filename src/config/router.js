// @flow

import { DrawerNavigator, SwitchNavigator } from "react-navigation"
import LoginScreen from "../screens/login"
import ChatScreen from "../screens/chat"
import HomeScreen from "../screens/home"
import ArticlesScreen from "../screens/articles"

export const ROUTE_APP = "App"
export const ROUTE_APP_MENU = "Menu"
export const ROUTE_APP_CHAT = "Chat"
export const ROUTE_APP_ARTICLES = "Articles"

const AppStack = DrawerNavigator(
  {
    Home: HomeScreen,
    Chat: ChatScreen,
    Articles: ArticlesScreen
  },
  {
    initialRouteName: "Home",
    drawerPosition: "left"
  }
)

export default SwitchNavigator(
  {
    Login: LoginScreen,
    App: AppStack
  },
  {
    initialRouteName: "Login"
  }
)
