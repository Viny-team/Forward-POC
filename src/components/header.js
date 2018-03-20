// @flow

import * as React from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

type Props = {
  navigation: any
}
type States = {}

export class Header extends React.Component<Props, States> {
  render() {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("DrawerOpen")}
        >
          <Icon style={styles.icon} name="menu" size={32} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  icon: {
    paddingLeft: 10
  }
})
