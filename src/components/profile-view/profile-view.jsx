import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import "./profile-view.scss";

export class ProfileView extends React.Component {

    constructor() {
        super();

        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: []
        };
    }

    getUserDetails(token) {
        const Username = localStorage.getItem('user');
        let token = localStorage.getItem('token');

        axios.get('https://movie-api-hoover.herokuapp.com/users/${Username}', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    editUserDetails = (e) => {
        e.preventDefault();

        const Username = localStorage.getItem('user');
        let token = localStorage.getItem('token');

        axios.put('https://movie-api-hoover.herokuapp.com/user/${Username}', {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthday: this.state.Birthday
        }),
        .then(response => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday
            })
            localStorage.setItem('user', this.state.Username);
            alert("Profile has been updated");
            window.open('/', '_self'); // So the page will open in the current tab
        })
                .catch(response => {
                    console.error(response);
                });
    };

    deleteProfile() => {

    let result = confirm("Are you sure you want to delete your profile?");

    if (result) {

        const Username = localStorage.getItem('user');
        let token = localStorage.getItem('token');

        axios.delete('https://movie-api-hoover.herokuapp.com/user/${Username}', {
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
}

removeFavorite() => {

    const Username = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    axios.delete('https://movie-api-hoover.herokuapp.com/user/${Username}/movies/${movie._id}', {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(response => {
            FavoriteMovies.filter(movie => movie._id != match.params.movie._id);
            alert("Movie has been removed.")
        });
        .catch (function (error) {
        console.log(error);
    });
}

return (
    <Row className="profile-view justify-content-md-center">
    {FavoriteMovies.map(movie => {
        return (
            <Col md={3}>
            {movie.Title}
            </Col>
        )
    })}
    </Row>

    <Row className="profile-view justify-content-md-center">
        <Col md={6}>
            <Form>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Enter new username" value={Username} onChange={editUserDetails(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter new password" value={Password} onChange={editUserDetails(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter new email" value={Email} onChange={editUserDetails(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control type="date" onChange={editUserDetails(e.target.value)} />
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