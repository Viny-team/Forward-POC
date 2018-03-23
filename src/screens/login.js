// @flow

import * as React from "react"
import { ROUTE_APP } from "../config/router"
import { AsyncStorage, View, Image } from "react-native"
import {
  RkButton,
  RkTextInput,
  RkText,
  RkStyleSheet
} from "react-native-ui-kitten"
import { Screen } from "../components"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

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
          <RkText style={{ color: "#661D32", fontSize: 80, marginBottom: 40 }}>
            VINY
          </RkText>
          <RkTextInput
            rkType="rounded stretch large"
            label={
              <Icon name="account" size={32} style={{ paddingLeft: 15 }} />
            }
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
          <RkText style={{ fontSize: 10, marginTop: 5, textAlign: "center" }}>
            En vous connectant, vous confirmez être majeur et en droit de
            consommer de l'alcool.
          </RkText>
          <RkText style={{ fontSize: 10, textAlign: "center" }}>
            L'abus d'alcool est dangereux pour la santé.
          </RkText>
        </View>
      </Screen>
    )
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  button: {
    backgroundColor: "#661D32"
  }
}))
