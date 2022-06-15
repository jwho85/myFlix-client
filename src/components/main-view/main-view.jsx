import React from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./main-view.scss";

import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// #0
import {
    setMovies,
    setUser
} from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";

import Menubar from "../navbar/navbar";
import { FooterView } from "../footer/footer";

class MainView extends React.Component {
    constructor() {
        super();
    }

    getMovies(token) {
        axios.get("https://movie-api-hoover.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                // #4
                this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem("token");
        if (accessToken !== null) {
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
        this.props.setUser(authData.user);
        localStorage.setItem("token", authData.token);
        localStorage.setItem("user", authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    render() {
        // #5 movies is extracted from this.props rather than from the this.state
        let { movies } = this.props;
        let { user } = this.props;
        console.log(user);

        /* MovieView shows one movie, MoveCard shows all movies */

        return (
            <Router>
                <Menubar />
                <Row className="justify-content-md-center">
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
                            // #6
                            return <MoviesList movies={movies} />;
                        }}
                    />
                </Row>

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
                                        movie={movies.find((movie) => movie._id === match.params.movieId)}
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
                    render={({ match, history }) => {
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
                                            movies.find((m) => m.Director.Name === match.params.name).Director
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
                            <ProfileView
                                history={history}
                                movies={movies}
                            />
                        );
                    }}
                />
                <FooterView />
            </Router>
        );
    }
}

// #7
let mapStateToProps = state => {
    return { movies: state.movies, user: state.user }
}

// #8
export default connect(mapStateToProps, { setMovies, setUser })(MainView);