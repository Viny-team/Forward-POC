import React from 'react'
import {View, Text} from 'react-native'
import {GiftedChat} from 'react-native-gifted-chat'

export default class Chat extends React.Component {
    state = {
        id: 1,
        messages: [
            {
                createdAt: new Date(),
                text: `Bonjour ${this.props.username}, que puis-je faire pour vous ?`,
                user: {
                    _id: 1,
                    name: "Viny"
                },
                _id: "0"
            }
        ]
    }

    onSend(message) {
        if (this.state.id == 1) {
            message.push({
                createdAt: new Date(),
                    text: `Veuillez m'excusez, mon développeur ne m'a pas permit de comprendre ce que vous venez de dire. Peut-être plus tard ?`,
                    user: {
                        _id: 1,
                        name: "Viny"
                    },
                    _id: `${this.state.id}`
            })
        } else if (this.state.id == 2) {
            message.push({
                createdAt: new Date(),
                    text: `Frère, ferme ta gueule ok ?`,
                    user: {
                        _id: 1,
                        name: "Viny"
                    },
                    _id: `${this.state.id}`
            })
        }
        this.setState(previousState => {
            return {
                id: previousState.id + 1,
                messages: GiftedChat.append(previousState.messages, message)
            }
        })
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend.bind(this)}
                user={{
                    _id: 2,
                    name: this.props.username
                }}
            />
        )
    }
}

Chat.defaultProps = {
    username: ''
}
