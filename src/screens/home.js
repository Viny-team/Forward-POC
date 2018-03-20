// @flow

import * as React from "react"
import { AsyncStorage, View, Keyboard } from "react-native"
import {
  RkText,
  RkButton,
  RkAvoidKeyboard,
  RkStyleSheet
} from "react-native-ui-kitten"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import DrawerWrapper from "../components/drawerWrapper"

type Props = {
  navigation: any
}
type States = {
  username: string
}

export default class HomeScreen extends React.Component<Props, States> {
  static navigationOptions = {
    drawerLabel: "Accueil",
    drawerIcon: () => <Icon name="home" size={24} />
  }

  constructor(props: Props) {
    super(props)

    this.state = { username: "" }
    this._bootstrap()
  }

  _bootstrap = async () => {
    const username: string = await AsyncStorage.getItem("username")
    this.setState({ username })
  }

  render() {
    return (
      <DrawerWrapper navigation={this.props.navigation}>
        <RkText>Hello {this.state.username}</RkText>
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
