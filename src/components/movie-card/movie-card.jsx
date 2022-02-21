import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/card';

import { Link } from 'react-router-dom';

import './movie-card.scss'

export class MovieCard extends React.Component {
    onAddFavorite = (e,movie) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.post(`https://movie-list-api-5858.herokuapp.com/users/${Username}/favorites/${this.props.movie._id}`, {
            headers: {Authorization: `Bearer ${token}` }}
        )
        .then((response) => {
            console.log(response);
            alert(`${movie.Title} added to favorites`);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onRemoveFavorite = (e,movies) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://movie-list-api-5858.herokuapp.com/users/${Username}/favorites/${this.props.movie._id}`, {
            headers: {Authorization: `Bearer ${token}` }}
        )
        .then((response) => {
            console.log(response);
            alert(`${movie.Title} removed from favorites`);
            this.componentDidMount();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const { movie } = this.props;

        return (
            <Card className="text-center" height="600px">
                <div className="card-poster text-center">
                    <Card.Img variant="top" src={movie.ImagePath} crossOrigin="true"/>
                </div>
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title> 
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="primary">Open</Button>
                    </Link>
                    <Button variant="secondary" onClick={this.onAddFavorite}>+ Favorites</Button>
                    <Button variant="danger" onClick={this.onRemoveFavorite}> - Favorites </Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string
    })
};