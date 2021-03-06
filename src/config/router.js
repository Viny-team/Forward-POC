// @flow

import { DrawerNavigator, SwitchNavigator } from "react-navigation"
import LoginScreen from "../screens/login"
import ChatScreen from "../screens/chat"
import HomeScreen from "../screens/home"
import ArticlesScreen from "../screens/articles"
import CellarScreen from "../screens/cellar"
import ConseilsScreen from "../screens/conseils"
import MapsScreen from "../screens/maps"

export const ROUTE_APP = "App"
export const ROUTE_APP_MENU = "Menu"
export const ROUTE_APP_CHAT = "Chat"
export const ROUTE_APP_ARTICLES = "Articles"
export const ROUTE_APP_CONSEILS = "Conseils"
export const ROUTE_APP_CAVE = "Cave"
export const ROUTE_APP_CARTE = "Carte"

const AppStack = DrawerNavigator(
  {
    Home: HomeScreen,
    Chat: ChatScreen,
    Articles: ArticlesScreen,
    Conseils: ConseilsScreen,
    Cave: CellarScreen,
    Carte: MapsScreen
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
