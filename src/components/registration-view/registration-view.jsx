import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss'
import axios from 'axios';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState ('');
    const [ password, setPassword ] = useState ('');
    const [ email, setEmail ] = useState ('');
    const [birthday, setBirthday ] = useState ('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    const validate = () => {
        let isReq = true;

        if(!username) {
            setUsernameError('Username is Required');
            isReq=false;
        } else if(username<5) {
            setUsernameError('Username must be at least 5 characters long')
            isReq=false
        } 

        if(!password) {
            setPasswordError('Password is Required');
            isReq=false;
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            isReq = false;
          }
      
        if (!email) {
            setEmailError('Email is required');
            isReq = false;
          } else if (email.indexOf('@') === -1) {
            setEmailError('Email is not valid');
            isReq = false;
          }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const isReq = validate();
        
        if (isReq) {
            axios.post('https://movie-list-api-5858.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self');
            })
            .catch(e => {
                console.log('error with registration')
            });
        }
    };

    return (
       <div> 
           <h1>Sign up for Movie List</h1>
            <Form>
                <Form.Group controlId="formUsername">  
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                    {usernameError && <p className="error">{usernameError}</p>}
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                    {passwordError && <p className="error">{passwordError}</p>}
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="text" onChange={e => setEmail(e.target.value)} />
                    {emailError && <p className="error">{emailError}</p>}
                </Form.Group>
                <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
                </Form.Group>
                <Button type="submit" onClick={handleSubmit}>Submit</Button>
            </Form>
        </div>  
    )
}

RegistrationView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.string.isRequired
    }),
    onLoggedIn: PropTypes.func
};