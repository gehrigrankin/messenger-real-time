import React, { useState, useEffect } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons'

import LandingContainer from '../LandingContainer'
import Message from '../Message';

import './ChatContainer.scss';

const ChatContainer = (props) => {
  const [input, setInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [user, setUser] = useState({
    name: '',
    uuid: ''
  });

  useEffect(() => {
    if(user.name) {
      props.addUser([...props.users, user])
    }
  }, [user])

  const sendMessage = () => {
    props.sendMessage(input, user)

    setInput('');
  }

  const handleNameInput = e => {
    setNameInput(e.target.value)
  }

  const isTabOpen = () => {
    return props.activeTab === props.position ? 'tab-active' : ''
  }

  const chatWith = props.users.find(person => person.uuid !== user.uuid);

  return (
    <div className={`ChatContainer ${props.position} ${isTabOpen()}`}>
      <LandingContainer
        handleNameInput={handleNameInput}
        nameInput={nameInput}
        user={user}
        setUser={setUser}
        users={props.users}
      />
      <div className="chat-title">
        {chatWith ? (
          <div>
            <p>Chatting with</p>
            <div className="user-icon is-xxl">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <p>{chatWith.name}</p>
          </div>
        ) : null}
      </div>
      <div className="chat-body">
        {props.messages.map((message, idx) => (
          <Message
            key={idx}
            message={message}
            user={user}
          />
        ))}
      </div>
      <div className="chat-input">
        <InputGroup>
          <Input
            value={input}
            placeholder="Start a message"
            onChange={e => setInput(e.target.value)}
          />
          <InputGroupAddon addonType="append">
            <Button onClick={e => {
              e.preventDefault();
              sendMessage(input);
            }} color="primary">
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </div>
  )
}

export default ChatContainer;
