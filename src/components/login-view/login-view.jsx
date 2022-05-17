import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import axios from 'axios';
import "./login-view.scss";

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // Declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    // validate user inputs
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

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            /* Send a request to the server for authentication */
            axios.post('https://movie-api-hoover.herokuapp.com/login', {
                Username: username,
                Password: password
            })
                .then(response => {
                    const data = response.data;
                    props.onLoggedIn(data);
                })
                .catch(e => {
                    console.log('no such user')
                });
        }
    };

    return (
        <Row className="login-view justify-content-md-center">
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
                    <div className="buttons">
                        <Button variant="primary" type="submit" onClick={handleSubmit} className="login-button">
                            Login
                        </Button>
                        <Link to={'/register'}>
                            <Button variant="primary" type="submit">Register</Button>
                        </Link>
                    </div>
                </Form>
            </Col>
        </Row>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }).isRequired,
    onLoggedIn: PropTypes.func.isRequired
};