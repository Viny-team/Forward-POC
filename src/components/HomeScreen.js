// @flow

import * as React from "react"
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Button,
  Keyboard,
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
      Keyboard.dismiss
      this.props.navigation.navigate(ROUTE_APP)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../res/images/viny.png")}
        />
        <Text style={styles.title}>Viny</Text>
        <Text style={styles.text}>Bienvenue sur le prototype Viny !</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text: string) => this.setState({ text })}
          blurOnSumbit={true}
        />
        <Button
          title={"Valider"}
          style={styles.button}
          onPress={() => this.onButtonPress()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#661D32"
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20
  },
  title: {
    fontSize: 50,
    color: "#fff5df",
    marginBottom: 75
  },
  text: {
    color: "#fff5df"
  },
  textInput: {
    width: "60%",
    color: "#fff5df"
  },
  button: {
    backgroundColor: "#111",
    color: "#fff5df",
    borderRadius: 5,
    padding: 15,
    marginTop: 20
  }
})
