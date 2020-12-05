import React, { useState, useEffect } from 'react';
import { animateScroll } from 'react-scroll';

import LandingContainer from '../LandingContainer';

import ChatTitle from './components/ChatTitle';
import ChatBody from './components/ChatBody';
import ChatInput from './components/ChatInput';

import './ChatContainer.scss';

const ChatContainer = (props) => {
    const [nameInput, setNameInput] = useState('');
    const [user, setUser] = useState({
        name: '',
        uuid: ''
    });

    const { addUser, users, position, messages } = props;

    useEffect(() => {
        if (user.name) {
            user.position = position;
            addUser([...users, user])
        }
        // linter wants to add users to dependencies
        // but it breaks code
        // eslint-disable-next-line
    }, [user, addUser, position]);

    useEffect(() => {
        // Scroll to bottom of ChatBody after new message
        animateScroll.scrollToBottom({
            containerId: "chat-body-" + position,
            smooth: true,
            duration: 200
        });
    }, [messages, position]);

    const handleNameInput = e => {
        setNameInput(e.target.value);
    }

    const isTabOpen = () => {
        return props.activeTab === position ? 'tab-active' : '';
    }

    const sendMessage = message => {
        props.sendMessage(message, user);
    }

    const isTyping = () => {
        props.setIsTyping({ user });
    }

    const isntTyping = () => {
        props.setIsTyping({ user: '' });
    }

    const chatWith = users.find(person => person.uuid !== user.uuid);

    return (
        <div
            className={`ChatContainer ${isTabOpen()}`}
            style={{[position]: 0}}
        >
            <LandingContainer
                handleNameInput={handleNameInput}
                nameInput={nameInput}
                user={user}
                setUser={setUser}
                users={users}
            />
            <ChatTitle
                chatWith={chatWith}
            />
            <ChatBody
                position={position}
                messages={messages}
                user={user}
                isTyping={props.isTyping}
            />
            <ChatInput
                sendMessage={sendMessage}
                isTyping={isTyping}
                isntTyping={isntTyping}
            />
        </div>
    )
}

export default ChatContainer;
