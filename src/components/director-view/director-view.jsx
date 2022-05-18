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
        const { director, onBackClick } = this.props;

        return (
            <Card>
                <Card.Body>
                    <Card.Title>{director.Name}</Card.Title>
                    <Card.Text>{director.Bio}</Card.Text>
                    <Card.Text>Born: {director.Birth}</Card.Text>
                    <Card.Text>Died: {director.Death}</Card.Text>
                    <Button onClick={() => { onBackClick(); }}>Back</Button>
                </Card.Body>
            </Card>
        );
    }
}

DirectorView.propTypes = {
    onBackClick: PropTypes.func.isRequired
};