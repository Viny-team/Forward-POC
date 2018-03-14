import React from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import {Platform, StyleSheet} from 'react-native'
import {Actions} from 'react-native-router-flux'

export default class Home extends React.Component {
    state = {
        name: ''
    }

    render() {
        return (
            <View>
                <Text style={styles.title}>Quel est votre prénom ?</Text>
                <TextInput 
                    style={styles.nameInput}
                    placeholder='Renseignez votre prénom...'
                    onChangeText={text => {
                        this.setState({
                            name: text
                        })
                    }}
                    value={this.state.name}
                />
                <TouchableOpacity
                    onPress={() => {
                        if (this.state.name === '') alert('Vous devez taper un prénom afin d\'accéder au chat')
                        else Actions.chat({
                            username: this.state.name
                        })
                    }}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20
    },
    nameInput: {
        padding: 5,
        height: 40,
        borderWidth: 0,
        margin: 2
    },
    buttonText: {
        marginLeft: 20,
        fontSize: 20
    }
})
