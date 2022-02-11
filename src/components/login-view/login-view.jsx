import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import './login-view.scss'

export function LoginView(props) {
    const [ username, setUsername] = useState ('');
    const [password, setPassword ] = useState ('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username,password);
        props.onLoggedIn(username);
    };

    return (
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Stack>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
                    <Button variant="secondary">No account? Sign up here!</Button>
                </Stack>
            </Form>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }).isRequired,
    onLoggedIn: PropTypes.func.isRequired
};