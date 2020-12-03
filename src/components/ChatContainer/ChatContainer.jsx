import React, { useState } from 'react';

import LandingContainer from '../LandingContainer'

import './ChatContainer.scss';

const ChatContainer = (props) => {
  const [input, setInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [name, setName] = useState('');

  const sendMessage = () => {
    props.sendMessage(input, name)

    setInput('');
  }

  const handleNameInput = e => {
    setNameInput(e.target.value)
  }

  return (
    <div className={`ChatContainer ${props.position}`}>
      <LandingContainer 
        handleNameInput={handleNameInput}
        nameInput={nameInput}
        name={name}
        setName={setName}
      />
      <div className="chat-title">
        {name ? `Welcome, ${name}` : null}
      </div>
      <div className="message-container">
        {props.messages.map((message, idx) => (
          <div
            className={`message ${message.name === name ? 'sent' : 'recieved'}`}
            key={`message-${idx}`}
          >
            {message.name}: {message.text}
          </div>
        )
        )}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          onClick={e => {
            e.preventDefault();
            sendMessage(input);
          }}
        >
          Send Message
        </button>
      </div>
    </div>
  )
}

export default ChatContainer;
