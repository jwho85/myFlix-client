import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

export class ProfileView extends React.Component {

    getUserDetails(token) => {
    axios.get('https://movie-api-hoover.herokuapp.com/user/${user}', {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(response => {
            this.setState({
                username: response.data.username,
                password: response.data.password,
                email: response.data.email,
                birthday: response.data.birthday,
                favoriteMovies: response.data.favoriteMovies
            });
        })
        .catch(function (error) {
            console.log(error);
        });
}

editUserDetails(token) => {
    axios.put('https://movie-api-hoover.herokuapp.com/user/${user}', {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(response => {
            this.setState({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                birthday: this.state.birthday,
            });
            alert("Profile has been updated");
            window.open('/', '_self'); // So the page will open in the current tab
        })
        .catch(function (error) {
            console.log(error);
        });
}

deleteProfile(token) => {
    axios.delete('https://movie-api-hoover.herokuapp.com/user/${user}', {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(response => {
            alert("Profile has been deleted.")
            window.open('/', '_self'); // So the page will open in the current tab
        });
        .catch (function (error) {
        console.log(error);
    });
}

removeFavorite(token) => {
    axios.delete('https://movie-api-hoover.herokuapp.com/user/${user}/movies/${movieid}', {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(response => {
            alert("Movie has been removed.")
        });
        .catch (function (error) {
        console.log(error);
    });
}

return (
    <Row className="profile-view justify-content-md-center">
        <Col md={6}>
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Enter new username" value={username} onChange={this.editUserDetails(username)} />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter new password" value={password} onChange={this.editUserDetails(password)} />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter new email" value={email} onChange={this.editUserDetails(email)} />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control type="date" onChange={this.editUserDetails(birthday)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={editUserDetails}>
                    Update Information
                </Button>
                <Button variant="danger" type="submit" onClick={deleteProfile}>
                    Delete Profile
                </Button>
            </Form>
        </Col>
    </Row>
);
}