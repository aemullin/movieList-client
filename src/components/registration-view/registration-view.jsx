import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss'

export function RegistrationView(props) {
    const [ username, setUsername ] = useState ('');
    const [ password, setPassword ] = useState ('');
    const [ email, setEmail ] = useState ('');
    const [birthday, setBirthday ] = useState ('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username,password, email, birthday);
        props.onLoggedIn(username);
    };

    return (
        <Form>
            <Form.Group controlId="formUsername">  
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
            </Form.Group>
            <Button type="submit" onClick={handleSubmit}>Submit</button>
        </Form>
    )
}

RegistrationView.propTypes = {
    user: PropType.shape({
        username: PropType.string.isRequired,
        password: PropType.string.isRequired,
        email: PropType.string.isRequired,
        birthday: PropType.string.isRequired
    }).isRequired,
    onLoggedIn: PropTypes.func.isRequired
};