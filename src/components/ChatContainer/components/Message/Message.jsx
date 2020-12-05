import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import './Message.scss'

const Message = (props) => {
    const { user, text } = props.message

    const isMyMessage = user.uuid === props.user.uuid ? true : false;

    const nextMessageSameUser =
        props.nextMessage &&
        props.nextMessage.user.uuid === user.uuid;

    const prevMessageSameUser =
        props.prevMessage &&
        props.prevMessage.user.uuid === user.uuid;

    if (props.typingMessage) {
        return (
            <div className="Message recieved is-typing">
                <div className="user-icon is-xl">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="text">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        )
    }

    if (isMyMessage) {
        return (
            <div className="Message sent">
                <div className={`text ${prevMessageSameUser ? 'same-user' : ''}`}>
                    {text}
                </div>
            </div>
        )
    }

    return (
        <div className="Message recieved">
            { !nextMessageSameUser ? (
                <div className="user-icon is-xl">
                    <FontAwesomeIcon icon={faUser} />
                </div>
            ) : null}
            <div className={`text ${prevMessageSameUser ? 'same-user' : ''}`}>
                {text}
            </div>
        </div>
    )
}

export default Message
