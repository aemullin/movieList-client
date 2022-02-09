import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
        <form>
            <label className='label'>  
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
            <label className='label'>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <label className='label'>
                Email:
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <label className='label'>
                Birthday:
                <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </label>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
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