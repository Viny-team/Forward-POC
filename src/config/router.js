// @flow

import { StackNavigator, SwitchNavigator } from "react-navigation"
import MenuScreen from "../components/MenuScreen"
import ChatScreen from "../components/ChatScreen"
import HomeScreen from "../components/HomeScreen"

export const ROUTE_APP = "App"
export const ROUTE_APP_MENU = "Menu"
export const ROUTE_APP_CHAT = "Chat"

const AppStack = StackNavigator(
  {
    Menu: MenuScreen,
    Chat: ChatScreen
  },
  {
    initialRouteName: "Menu"
  }
)

export default SwitchNavigator(
  {
    Home: HomeScreen,
    App: AppStack
  },
  {
    initialRouteName: "Home"
  }
)
