import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import "./director-view.scss";


export class DirectorView extends React.Component {

    render() {
        const { director, movies, onBackClick } = this.props;

        return (
            <Card>
                <Card.Body>
                    <Card.Title>{movies.director.Name}</Card.Title>
                    <Card.Text>{movies.director.Bio}</Card.Text>
                    <Card.Text>{movies.director.Birth}</Card.Text>
                    <Card.Text>{movies.director.Death}</Card.Text>
                    <Button onClick={() => { onBackClick(); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}

DirectorView.propTypes = {
    onBackClick: PropTypes.func.isRequired
};