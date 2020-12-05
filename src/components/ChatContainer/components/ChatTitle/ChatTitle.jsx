import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import './ChatTitle.scss';

const ChatTitle = (props) => {
    return (
        <div className="ChatTitle">
            {props.chatWith ? (
                <div>
                    <p>Chatting with</p>
                    <div className="user-icon is-xxl">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <p>{props.chatWith.name}</p>
                </div>
            ) : null}
        </div>
    )
}

export default ChatTitle;
