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
        const { genre, onBackClick } = this.props;

        return (
            <Card>
                <Card.Body>
                    <Card.Title>{genre.Name}</Card.Title>
                    <Card.Text>{genre.Description}</Card.Text>
                    <Button onClick={() => { onBackClick(); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}

GenreView.propTypes = {
    onBackClick: PropTypes.func.isRequired
};