import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {

    render() {
        const { onBackClick } = this.props;

        return (
            <Card>
                <Card.Body>
                    <Card.Title>{movie.Director.Name}</Card.Title>
                    <Card.Text>{movie.Director.Bio}</Card.Text>
                    <Card.Text>{movie.Director.Birth}</Card.Text>
                    <Card.Text>{movie.Director.Death}</Card.Text>
                    <Button onClick={() => { onBackClick(); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}

DirectorView.propTypes = {
    onBackClick: PropTypes.func.isRequired
};