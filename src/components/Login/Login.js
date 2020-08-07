import React, { useContext, useState } from 'react';
import './Login.css';
import config from '../../config';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

export default function Login(props) {
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleCancel() {
        props.history.push(`/`);
    };

    const handleSubmit = e => {
        e.preventDefault();
        postLoginUser({
            email: username,
            password,
        });
    };

    function postLoginUser(credentials) {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
            .then((res) => {
                return !res.ok
                    ? res.json().then((e) => Promise.reject(e))
                    : res.json();
            })
            .then(async (res) => {
                const { authToken } = res
                await storeToken(authToken)
                // await context.handleGetCategories()
                // await context.handleGetRecipes()
                // sessionStorage.setItem('currentCategoryId', '0')
                props.history.push('/habits')
            })
            .catch(err => {
                setError(
                    <div className="login-error">
                        Incorrect username or password</div>
                )
                // console.log('err', err);'err', err)
            });
    };

    async function storeToken(authToken) {
        await localStorage.setItem('authToken', authToken);
        // context.handleChangeIsLoggedIn(true);
    };

    return (
        <div className='Login__login-form-container-wrapper'>
            {/* <BackButton handleClickBack={handleClickBack} /> */}
            <h1 className='Login__login-title'>Login</h1>
            <div className='Login__login-form-container'>
                <form id='login-form' 
                onSubmit={handleSubmit}
                >
                    <div className='Login__label-input-wrapper'>
                        <label htmlFor="email">Email </label>
                        <input placeholder='Email' type="text"
                            name='email' id='email'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            autoFocus />
                    </div>
                    <div className='Login__label-input-wrapper'>
                        <label htmlFor="password">Password </label>
                        <input placeholder='password' type="password"
                            name='password' id='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required />
                    </div>
                    {error}
                    <div className='login-form-buttons-wrapper'>
                        <button type='button' onClick={handleCancel}>Cancel</button>
                        <button type='submit'>Log In</button>
                    </div>
                </form>
                <div className='demo-credentials'>
                    Demo user credentials:
                <div className='credential-wrapper'>
                        <p className='credential'>
                            Email:
                            <span className='credential-bold'>  user1@gmail.com</span>
                        </p>
                        <button className="copy-to-clipboard"
                            aria-label='copy-to-clipboard'
                            onClick={() => navigator.clipboard.writeText(`user1@gmail.com`)}
                        >
                            <FontAwesomeIcon icon={faClipboardList} size="2x" />
                        </button>
                    </div>
                    <div className='credential-wrapper'>
                        <p className='credential'>
                            Password:
                            <span className='credential-bold'>  Password1!</span>
                        </p>
                        <button className="copy-to-clipboard"
                            aria-label='copy-to-clipboard'
                            onClick={() => navigator.clipboard.writeText(`Password1!`)}
                        >
                            <FontAwesomeIcon icon={faClipboardList} size="2x" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};