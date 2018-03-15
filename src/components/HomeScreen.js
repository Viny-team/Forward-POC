// @flow

import * as React from "react"
import {
  AsyncStorage,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native"
import { ROUTE_APP } from "../config/router"

type Props = {
  navigation: any
}
type States = {
  text: string
}

export default class HomeScreen extends React.Component<Props, States> {
  state = {
    text: ""
  }

  onButtonPress = async () => {
    if (this.state.text === "")
      alert("Vous devez d'abord renseigner votre prénom pour accéder au chat")
    else {
      await AsyncStorage.setItem("username", this.state.text)
      this.props.navigation.navigate(ROUTE_APP)
    }
  }

  render() {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ marginTop: 40 }}>Bienvenue sur le prototype Viny !</Text>
        <TextInput
          style={{ width: "80%" }}
          placeholder="Merci de renseigner votre prénom"
          onChangeText={text => this.setState({ text })}
        />
        <TouchableOpacity
          style={{ marginTop: 40 }}
          onPress={() => this.onButtonPress()}
        >
          <Text>Valider</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
