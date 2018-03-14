import React from 'react'

import Home from './components/Home'
import Chat from './components/Chat'

import {Router, Scene} from 'react-native-router-flux'

import {Platform, StyleSheet} from 'react-native'

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Scene key='root' style={styles.rootScene}>
                    <Scene key='home' component={Home} title='Home' />
                    <Scene key='chat' component={Chat} title='Chat' />
                </Scene>
            </Router>
        )
    }
}

const styles = StyleSheet.create({
    rootScene: {
        ...Platform.select({
            ios: {
                paddingTop: 64
            },
            android: {
                paddingTop: 54
            }
        })
    }
})