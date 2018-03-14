import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FetchLocation from './components/FetchLocation'
import UsersMap from './components/UsersMap'

export default class App extends React.Component {
  state = {
    location: null
  }

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        }
      })
    }, err => {
      console.log(err)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <FetchLocation onGetLocation={this.getLocationHandler} />
        <UsersMap location={this.state.location} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
