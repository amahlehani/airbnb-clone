import React, { useState } from 'react';
import './SignIn.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerSuccess, logout } from "../../redux/reducers/userReducer"; 

const SignIn = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); 
    const [isRegistering, setIsRegistering] = useState(false);  

    const dispatch = useDispatch();
    const { error, welcomeMessage, isAuthenticated } = useSelector((state) => state.user);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    const handleRegister = (e) => {
        e.preventDefault();

        const newUser = {
            name,
            email,
            password,
            id: Date.now(), 
        };

        dispatch(registerSuccess(newUser));
        dispatch(loginUser({ email, password }));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className='modal'>
            <div className='modal-content'>
                <h2>Welcome to Airbnb</h2>
                <h3>{isRegistering ? 'Register' : 'Sign In'}</h3>
                {error && <p className="error">{error}</p>} 
                
                {isAuthenticated ? (
                    <div>
                        <h4>{welcomeMessage}</h4>
                        <button className='signin-btn' onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <form onSubmit={isRegistering ? handleRegister : handleLogin} className='modal-form'>
                        {isRegistering && (
                            <input
                                type='text'
                                placeholder='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        )}
                        <input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type='submit' className='signin-btn'>{isRegistering ? 'Register' : 'Sign In'}</button>
                    </form>
                )}

                <div className="switch-form">
                    {isRegistering ? (
                        <p>
                            Already have an account?{' '}
                            <button onClick={() => setIsRegistering(false)} className='reg-btn'>Sign In</button>
                        </p>
                    ) : (
                        <p>
                            Don't have an account?{' '}
                            <button onClick={() => setIsRegistering(true)} className='reg-btn'>Register</button>
                        </p>
                    )}
                </div>

                <button className='reg-btn' onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default SignIn;
