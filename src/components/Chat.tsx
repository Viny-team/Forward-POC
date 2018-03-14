import * as React from 'react'
import {View, Text} from 'react-native'
import {GiftedChat, ChatMessage} from 'react-native-gifted-chat'

interface ChatProps {
    username: string
}

interface ChatState {
    id: number,
    messages: ChatMessage[]
}

class Chat extends React.Component<ChatProps, ChatState> {
    constructor(props: ChatProps) {
        super(props)

        this.state = {
            id: 1,
            messages: [
                {
                    createdAt: new Date(),
                    text: `Bonjour ${this.props.username}, que puis-je faire pour vous ?`,
                    user: {
                        _id: 1,
                        name: "Viny",
                        avatar: ""
                    },
                    _id: "0"
                }
            ]
        }
    }

    onSend(message: ChatMessage[]) {
        if (this.state.id == 1) {
            message.push({
                createdAt: new Date(),
                    text: `Veuillez m'excusez, mon développeur ne m'a pas permit de comprendre ce que vous venez de dire. Peut-être plus tard ?`,
                    user: {
                        _id: 1,
                        name: "Viny",
                        avatar: ""
                    },
                    _id: `${this.state.id}`
            })
        } else if (this.state.id == 2) {
            message.push({
                createdAt: new Date(),
                    text: `Frère, ferme ta gueule ok ?`,
                    user: {
                        _id: 1,
                        name: "Viny",
                        avatar: ""
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

export default Chat