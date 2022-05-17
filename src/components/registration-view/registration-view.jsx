import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import axios from "axios";
import "./registration-view.scss";

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    // Declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [birthdayErr, setBirthdayErr] = useState('');

    // Validate user inputs
    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be 2 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPassword('Password must be 6 characters long');
            isReq = false;
        }
        if (!email) {
            setEmailErr('Email Required');
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setEmailErr('Email is invalid');
            isReq = false;
        }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            /* Send a request to the server for authentication */
            axios.post('https://movie-api-hoover.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    alert('Registration successful, please login!');
                    window.open('/', '_self'); // So the page will open in the current tab
                })
                .catch(response => {
                    console.error(response);
                    alert('Unable to register');
                });
        }
    };

    return (
        <Row className="registration-view justify-content-md-center">
            <Col md={6}>
                <Form>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                        {/* code added here to display validation error */}
                        {usernameErr && <p className="login-error">{usernameErr}</p>}
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        {/* code added here to display validation error */}
                        {passwordErr && <p className="login-error">{passwordErr}</p>}
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        {/* code added here to display validation error */}
                        {emailErr && <p className="login-error">{emailErr}</p>}
                    </Form.Group>
                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Register
                    </Button>
                    <p></p>
                    <p class="white-text">Already registered? <Link to={'/'}>Sign in</Link> here.</p>
                </Form>
            </Col>
        </Row>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    })
};