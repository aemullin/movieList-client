import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import './login-view.scss'

export function LoginView(props) {
    const [ username, setUsername] = useState ('');
    const [password, setPassword ] = useState ('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios.post('https://movie-list-api-5858.herokuapp.com/login', {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data)
        })
        .catch(e => {
                console.log('user does not exist');
                window.alert('wrong username or password');
            });
    };

    return (
            <div>
                <h1>Log in to Movie List</h1>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
                </Form>
            </div>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func.isRequired
};