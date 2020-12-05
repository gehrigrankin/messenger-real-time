import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import {
    Container,
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    Alert
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import './LandingContainer.scss'

const LandingContainer = (props) => {
    const [alert, setAlert] = useState(false);

    const submitName = e => {
        e.preventDefault();
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
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                </Container>
            ) : (
                <Container>
                    <form onSubmit={e => submitName(e)}>
                        <p className="mb-4">Enter name to begin chatting</p>
                        <InputGroup>
                            <Input
                                value={props.nameInput}
                                placeholder="John Doe"
                                onChange={e => props.handleNameInput(e)}
                            />
                            <InputGroupAddon addonType="append">
                                <Button type="submit">Submit</Button>
                            </InputGroupAddon>
                        </InputGroup>
                        {
                            alert ?
                                <Alert color="danger">
                                    Please enter a name
                                </Alert> :
                                null
                        }
                    </form>
                </Container>
                )}
        </div >
    )
}

export default LandingContainer
