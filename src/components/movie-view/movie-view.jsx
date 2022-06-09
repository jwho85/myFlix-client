import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import axios from "axios";

import { connect } from 'react-redux';
import { addFavorite } from "../../actions/actions";

export class MovieView extends React.Component {

    addFavorite(movie) {
        let user = localStorage.getItem("user");
        let token = localStorage.getItem("token");
        axios.post(`https://movie-api-hoover.herokuapp.com/users/${user}/movies/${movie._id}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
            .then(() => {
                alert(`"${movie.Title}" has been added to your favorites!`);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} crossorigin="anonymous" />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Link to={`/directors/${movie.Director.Name}`}>
                        <Button>Director</Button>
                    </Link>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button>Genre</Button>
                    </Link>
                    <Button
                        onClick={() => {
                            this.addFavorite(movie);
                        }}
                    >
                        Add to Favorites
                    </Button>
                    <Button
                        onClick={() => {
                            onBackClick();
                        }}
                    >
                        Back
                    </Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { addFavorite })(MovieView);