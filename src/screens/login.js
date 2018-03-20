// @flow

import * as React from "react"
import { ROUTE_APP } from "../config/router"
import { AsyncStorage, View } from "react-native"
import {
  RkButton,
  RkTextInput,
  RkText,
  RkStyleSheet
} from "react-native-ui-kitten"
import { scale, scaleModerate, scaleVertical } from "../utils/scale"
import { Screen } from "../components"

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
      <Screen>
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
      </Screen>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    paddingHorizontal: 17,
    alignItems: "center",
    flex: -1
  },
  button: {
    backgroundColor: theme.colors.button.highlight
  }
}))
