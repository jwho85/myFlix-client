import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import "./genre-view.scss";

export class GenreView extends React.Component {

    render() {
        const { genre, movies, onBackClick } = this.props;

        return (
            <Card>
                <Card.Body>
                    <Card.Title>{movies.Genre.Name}</Card.Title>
                    <Card.Text>{movies.Genre.Description}</Card.Text>
                    <Button onClick={() => { onBackClick(); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}

GenreView.propTypes = {
    onBackClick: PropTypes.func.isRequired
};