import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import './Message.scss'

const Message = (props) => {
    const {user, text} = props.message

    const isMyMessage = user.uuid === props.user.uuid ? true : false;

    if (isMyMessage) {
        return (
            <div className="Message sent">
                <div className="text">
                    {text}
                </div>
            </div>
        )
    }

    return (
        <div className="Message recieved">
            <div className="user-icon is-xl">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="text">
                {text}
            </div>
            {/* {!isMyMessage ? (
                <span className="message-info">{user.name}</span>
            ) : null} */}
        </div>
    )
}

export default Message
