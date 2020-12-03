import React, { useState, useEffect } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import keyConfiguration from "./config/pubnub-keys";

import ChatContainer from './components/ChatContainer';

import './App.scss';

const pubnub = new PubNub(keyConfiguration);

const Chat = () => {
  const pubnub = usePubNub();

  const [channels] = useState(['channel1']);
  const [messages, addMessage] = useState([]);
  
  useEffect(() => {
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({ channels });
  }, [pubnub, channels]);

  const handleMessage = e => {
    console.log(e)
    const { text, name } = e.message;
    addMessage(messages => [...messages, {text, name}]);
  };

  const sendMessage = (message, name) => {
    console.log(message, name)
    if (message) {
      pubnub.publish({ channel: channels[0], message: {text: message, name} })
    }
  };

  return (
    <div className="App">
      <ChatContainer
        position="left"
        sendMessage={sendMessage}
        messages={messages}
      />
      <ChatContainer
        position="right"
        sendMessage={sendMessage}
        messages={messages}
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
