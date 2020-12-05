import React from 'react'

import Message from '../Message';

import './ChatBody.scss'

const ChatBody = (props) => {
    return (
        <div
            className="ChatBody"
            id={`chat-body-${props.position}`}
        >
            {props.messages.map((message, idx) => (
                <Message
                    key={idx}
                    message={message}
                    user={props.user}
                    nextMessage={props.messages[idx + 1]}
                    prevMessage={props.messages[idx - 1]}
                />
            ))}
            {
                props.isTyping.user.uuid &&
                props.isTyping.user.uuid !== props.user.uuid ? (
                    <Message
                        typingMessage
                        message={{ user: props.user }}
                        user={props.isTyping.user}
                    />
                ) : null
            }

        </div>
    )
}

export default ChatBody
