import React, { useState, useEffect } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import keyConfiguration from "./config/pubnub-keys";

import ChatContainer from './components/ChatContainer';

import './App.scss';

const pubnub = new PubNub(keyConfiguration);

const Chat = () => {
  const pubnub = usePubNub();

  const [activeTab, setActiveTab] = useState('left');
  const [channels] = useState(['channel1']);
  const [messages, addMessage] = useState([]);
  const [users, addUser] = useState([]);
  
  useEffect(() => {
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({ channels });
  }, [pubnub, channels]);

  const handleMessage = e => {
    console.log(e)
    const { text, user } = e.message;
    addMessage(messages => [...messages, {text, user}]);
  };

  const sendMessage = (message, user) => {
    console.log(message, user)
    if (message) {
      pubnub.publish({ channel: channels[0], message: {text: message, user} })
    }
  };

  const toggleTab = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div className="App">
      <div className="tabs">
        <div 
          onClick={() => toggleTab('left')}
          className={`tab-1 ${activeTab === 'left' ? 'active' : ''}`}
        >
          <p>User 1</p>
        </div>
        <div
          onClick={() => toggleTab('right')}
          className={`tab-2 ${activeTab === 'right' ? 'active' : null}`}
        >
          <p>User 2</p>
        </div>
      </div>
      <ChatContainer
        position="left"
        sendMessage={sendMessage}
        messages={messages}
        users={users}
        addUser={addUser}
        activeTab={activeTab}
      />
      <ChatContainer
        position="right"
        sendMessage={sendMessage}
        messages={messages}
        users={users}
        addUser={addUser}
        activeTab={activeTab}
      />
    </div>
  );
}

const App = () => {
  return (
    <PubNubProvider client={pubnub}>
      <Chat />
    </PubNubProvider>
  );
};

export default App;
