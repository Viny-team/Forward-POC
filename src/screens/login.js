// @flow

import * as React from "react"
import { ROUTE_APP } from "../config/router"
import { AsyncStorage, Keyboard, View } from "react-native"
import {
  RkAvoidKeyboard,
  RkButton,
  RkTextInput,
  RkText,
  RkStyleSheet
} from "react-native-ui-kitten"
import { scale, scaleModerate, scaleVertical } from "../utils/scale"

type Props = {
  navigation: any
}
type States = {
  text: string
}

export default class LoginScreen extends React.Component<Props, States> {
  state = {
    text: ""
  }

  _onButtonPress = async () => {
    if (this.state.text === "")
      alert(
        "Vous devez d'abord renseigner votre nom d'utilisateur pour accéder au chat"
      )
    else {
      await AsyncStorage.setItem("username", this.state.text)
      this.props.navigation.navigate(ROUTE_APP)
    }
  }

  render() {
    return (
      <RkAvoidKeyboard
        onStartShouldSetResponder={e => true}
        onResponderRelease={e => Keyboard.dismiss()}
        style={styles.screen}
      >
        <View style={styles.container}>
          <RkTextInput
            rkType="rounded stretch large"
            placeholder="Nom d'utilisateur"
            onChangeText={(text: string) => this.setState({ text })}
          />
          <RkButton
            style={styles.button}
            onPress={() => this._onButtonPress()}
            rkType="rounded stretch"
          >
            Se connecter
          </RkButton>
        </View>
      </RkAvoidKeyboard>
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
    paddingHorizontal: 17,
    alignItems: "center",
    flex: -1
  },
  button: {
    backgroundColor: theme.colors.button.highlight
  }
}))
