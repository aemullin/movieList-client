import React, {useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss'

export class MovieCard extends React.Component {



    render() {
        const { movie } = this.props;

        const [isFavorite, toggleFavorite] = this.setState(false)

        onAddFavorite = (e) => {
            e.preventDefault();
            const Username = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            toggleFavorite((prev) => !prev);
    
            axios.post(`https://movie-list-api-5858.herokuapp.com/users/${Username}/favorites/${this.props.movie._id}`, {
                FavoriteMovies: this.props.movie._id
            },
             {
                headers: { Authorization: `Bearer ${token}`}}
            )
            .then((response) => {
                console.log(response);
                alert(`${this.props.movie.Title} added to favorites`);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    
        onRemoveFavorite = (e) => {
            e.preventDefault();
            const Username = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            toggleFavorite((prev) => !prev);
    
            axios.delete(`https://movie-list-api-5858.herokuapp.com/users/${Username}/favorites/${this.props.movie._id}`, {
                headers: {Authorization: `Bearer ${token}` }}
            )
            .then((response) => {
                console.log(response);
                alert(`${this.props.movie.Title} removed from favorites`);
                window.location.reload(false)
            })
            .catch(function (error) {
                console.log(error);
            });
        }


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
                    {isFavorite ? <Button variant="danger" onClick={this.onRemoveFavorite}> - Favorites </Button> : <Button variant="secondary" onClick={this.onAddFavorite}>+ Favorites</Button>}
                    
                    
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