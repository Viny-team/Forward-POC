// @flow

import { StackNavigator, SwitchNavigator } from "react-navigation"
import LoginScreen from "../screens/login"
import ChatScreen from "../screens/chat"
import HomeScreen from "../screens/home"

export const ROUTE_APP = "App"
export const ROUTE_APP_MENU = "Menu"
export const ROUTE_APP_CHAT = "Chat"

const AppStack = StackNavigator(
  {
    Menu: HomeScreen,
    Chat: ChatScreen
  },
  {
    initialRouteName: "Menu"
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
