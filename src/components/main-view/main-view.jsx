import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./main-view.scss";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";

import { Menubar } from "../navbar/navbar";

export default class MainView extends React.Component {
    constructor() {
        super();
        // Initial state is set to null
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
        };
    }

    getMovies(token) {
        axios.get("https://movie-api-hoover.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                // Assign the result to the state
                this.setState({
                    movies: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token");
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem("user"),
            });
            this.getMovies(accessToken);
        }
    }

    /* When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie */

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie,
        });
    }

    /* When a user successfully logs in, this function updates the `user` property in state to that *particular user */

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username,
        });

        localStorage.setItem("token", authData.token);
        localStorage.setItem("user", authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
            user: null,
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        /* MovieView shows one movie, MoveCard shows all movies */

        return (
            <Router>
                <Menubar />

                <Route
                    exact
                    path="/"
                    render={() => {
                        if (!user) {
                            return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
                        }
                        if (movies.length === 0) {
                            return <div className="main-view" />;
                        }
                        return movies.map((m) => (
                            <Row className="justify-content-md-center">
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            </Row>
                        ));
                    }}
                />

                <Route
                    exact
                    path="/movies/:movieId"
                    render={({ match, history }) => {
                        if (!user) {
                            return <LoginView OnLoggedIn={(user) => this.onLoggedIn(user)} />;
                        }
                        if (movies.length === 0) {
                            return <div className="main-view" />;
                        }
                        return (
                            <Row className="justify-content-md-center">
                                <Col md={8}>
                                    <MovieView
                                        movie={movies.find((m) => m._Id === match.params.MovieId)}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            </Row>
                        );
                    }}
                />

                <Route
                    path="/register"
                    render={() => {
                        if (user) {
                            return <Redirect to="/" />;
                        }
                        return (
                            <Row className="justify-content-md-center">
                                <Col>
                                    <RegistrationView />
                                </Col>
                            </Row>
                        );
                    }}
                />

                <Route
                    exact
                    path="/genres/:name"
                    render={({ match }) => {
                        if (!user) {
                            return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
                        }
                        if (movies.length === 0) {
                            return <div className="main-view" />;
                        }
                        return (
                            <Row className="justify-content-md-center">
                                <Col md={8}>
                                    <GenreView
                                        genre={
                                            movies.find((m) => m.Genre.Name === match.params.name).Genre
                                        }
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            </Row>
                        );
                    }}
                />

                <Route
                    exact
                    path="/directors/:name"
                    render={({ match, history }) => {
                        if (!user) {
                            return <LoginView OnLoggedIn={(user) => this.onLoggedIn(user)} />;
                        }
                        if (movies.length === 0) {
                            return <div className="main-view" />;
                        }
                        return (
                            <Row className="justify-content-md-center">
                                <Col md={8}>
                                    <DirectorView
                                        director={
                                            movies.find((m) => m.Director.Name === match.params.name)
                                                .Director
                                        }
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            </Row>
                        );
                    }}
                />

                <Route
                    path="/users/:username"
                    render={({ history, match }) => {
                        if (!user) {
                            return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
                        }
                        if (movies.length === 0) {
                            return <div className="main-view" />;
                        }
                        return (
                            <Row className="justify-content-md-center">
                                <Col md={4}>
                                    <ProfileView
                                        history={history}
                                        movies={movies}
                                        user={user === match.params.username}
                                    />
                                </Col>
                            </Row>
                        );
                    }}
                />
            </Router>
        );
    }
}