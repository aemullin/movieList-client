import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
        <div>
            <form className='form'>
                <label className='form-label'>
                    Username:<span>  </span>
                    <input type="text" className='form-input' placeholder='Enter Username' value={username} onChange={e => setUsername(e.target.value)} />
                </label><br></br><br></br>
                <label className='form-label'>
                    Password:<span>  </span>
                    <input type="password" className='form-input' value={password} placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
                </label><br></br><br></br>
                <button type="submit" className='login-view-button' onClick={handleSubmit}>Submit</button><br></br><br></br>
                <button className='login-view-button'>No account? Click Here to Register</button>
            </form>
        </div>
    )
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }).isRequired,
    onLoggedIn: PropTypes.func.isRequired
};