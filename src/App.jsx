import React, { useState, useEffect } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';

import ChatContainer from './components/ChatContainer';
import Tab from './components/Tab';

import keyConfiguration from "./config/pubnub-keys";

import './App.scss';

const pubnub = new PubNub(keyConfiguration);

const Chat = () => {
    const pubnub = usePubNub();

    const [activeTab, setActiveTab] = useState('left');
    const [channels] = useState(['channel1']);
    const [messages, addMessage] = useState([]);
    const [users, addUser] = useState([]);
    const [isTyping, setIsTyping] = useState({ user: {} });

    useEffect(() => {
        pubnub.addListener({ message: handleMessage });
        pubnub.subscribe({ channels });
    }, [pubnub, channels]);

    const handleMessage = e => {
        const { text, user } = e.message;
        addMessage(messages => [...messages, { text, user }]);
    };

    const sendMessage = (message, user) => {
        if (message) {
            pubnub.publish({ channel: channels[0], message: { text: message, user } });
        }
    };

    const toggleTab = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div className="App">
            <div className="tabs">
                <Tab
                    position="left"
                    activeTab={activeTab}
                    toggleTab={toggleTab}
                    user={users.find(user => user.position === 'left')}
                />
                <Tab
                    position="right"
                    activeTab={activeTab}
                    toggleTab={toggleTab}
                    user={users.find(user => user.position === 'right')}
                />
            </div>
            <ChatContainer
                position="left"
                sendMessage={sendMessage}
                messages={messages}
                users={users}
                addUser={addUser}
                activeTab={activeTab}
                isTyping={isTyping}
                setIsTyping={setIsTyping}
            />
            <ChatContainer
                position="right"
                sendMessage={sendMessage}
                messages={messages}
                users={users}
                addUser={addUser}
                activeTab={activeTab}
                isTyping={isTyping}
                setIsTyping={setIsTyping}
            />
        </div>
    );
};

const App = () => {
    return (
        <PubNubProvider client={pubnub}>
            <Chat />
        </PubNubProvider>
    );
};

export default App;
