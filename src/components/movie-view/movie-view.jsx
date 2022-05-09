import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MovieView extends React.Component {

    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} crossorigin="anonymous" />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Card.Text><span className="bold">Genre:</span> {movie.Genre.Name}</Card.Text>
                    <Card.Text><span className="bold">Genre Description:</span> {movie.Genre.Description}</Card.Text>
                    <Card.Text><span className="bold">Director:</span> {movie.Director.Name}</Card.Text>
                    <Card.Text><span className="bold">Director Bio:</span> {movie.Director.Bio}</Card.Text>
                    <Card.Text><span className="bold">Born:</span> {movie.Director.Birth}</Card.Text>
                    <Card.Text><span className="bold">Died:</span> {movie.Director.Death}</Card.Text>
                    <Button onClick={() => { onBackClick(null); }}>Back</Button>
                </Card.Body>
            </Card>
            // <div className="movie-view">
            //     <div className="movie-poster">
            //         <img src={movie.ImagePath} crossorigin="anonymous" />
            //     </div>
            //     <div className="movie-title">
            //         <span className="label">Title: </span>
            //         <span className="value">{movie.Title}</span>
            //     </div>
            //     <div className="movie-description">
            //         <span className="label">Description: </span>
            //         <span className="value">{movie.Description}</span>
            //     </div>
            //     <div className="movie-genre">
            //         <span className="label">Genre: </span>
            //         <span className="value">{movie.Genre.Name}</span>
            //     </div>
            //     <div className="movie-genre-description">
            //         <span className="label">Genre Description: </span>
            //         <span className="value">{movie.Genre.Description}</span>
            //     </div>
            //     <div className="movie-director">
            //         <span className="label">Director: </span>
            //         <span className="value">{movie.Director.Name}</span>
            //     </div>
            //     <div className="movie-director-bio">
            //         <span className="label">Director Bio: </span>
            //         <span className="value">{movie.Director.Bio}</span>
            //     </div>
            //     <div className="movie-director-birth">
            //         <span className="label">Born: </span>
            //         <span className="value">{movie.Director.Birth}</span>
            //     </div>
            //     <div className="movie-director-death">
            //         <span className="label">Died: </span>
            //         <span className="value">{movie.Director.Death}</span>
            //     </div>
            //     <button onClick={() => { onBackClick(null); }}>Back</button>
            // </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};