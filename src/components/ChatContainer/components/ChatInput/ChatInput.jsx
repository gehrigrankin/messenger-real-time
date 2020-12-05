import React, { useState } from 'react';
import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import './ChatInput.scss';

const ChatInput = (props) => {
    const [messageInput, setMessageInput] = useState('');

    const sendMessage = () => {
        props.sendMessage(messageInput);

        setMessageInput('');
    }

    return (
        <form
            className="ChatInput"
            onSubmit={e => {
                e.preventDefault();
                sendMessage();
            }}
        >
            <InputGroup>
                <Input
                    value={messageInput}
                    placeholder="Start a message"
                    onChange={e => setMessageInput(e.target.value)}
                    onFocus={props.isTyping}
                    onBlur={props.isntTyping}
                />
                <InputGroupAddon addonType="append">
                    <Button type="submit" color="primary">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        </form>
    )
}

export default ChatInput;
