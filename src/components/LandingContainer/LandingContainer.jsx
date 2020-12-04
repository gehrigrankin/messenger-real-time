import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import {
    Container,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button,
    Alert
} from 'reactstrap';

import './LandingContainer.scss'

const LandingContainer = (props) => {
    const [alert, setAlert] = useState(false);

    const submitName = () => {
        if (props.nameInput) {
            props.setUser({ name: props.nameInput, uuid: uuid() })
        } else {
            setAlert(true)
        }
    }

    useEffect(() => {
        if (props.nameInput) {
            setAlert(false)
        }
    }, [props.nameInput])

    return (
        <div className={`Landing ${props.users.length > 1 ? 'hide' : 'show'}`}>

            {props.user.name && props.users.length < 2 ? (
                <Container>
                    <p className="mb-4">Waiting for other user...</p>
                </Container>
            ) : (
                <Container>
                    <p className="mb-4">Enter name to begin chatting</p>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Name</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            value={props.nameInput}
                            placeholder="John Doe"
                            onChange={e => props.handleNameInput(e)}
                        />
                        <InputGroupAddon addonType="append">
                            <Button onClick={submitName} color="secondary">Submit</Button>
                        </InputGroupAddon>
                    </InputGroup>
                    {
                        alert ?
                            <Alert color="danger">
                                Please enter a name
                            </Alert> :
                            null
                    }
                </Container>
                )}
        </div >
    )
}

export default LandingContainer
