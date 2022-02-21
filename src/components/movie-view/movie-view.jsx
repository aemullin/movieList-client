import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Button, Row} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-view.scss'

export class MovieView extends React.Component {

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    onAddFavorite = (e,movie) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.post(`https://movie-list-api-5858.herokuapp.com/users/${Username}/favorites/${this.props.movie._id}`, {
            FavoriteMovies: this.props.movie._id
        }, 
        {
            headers: {Authorization: `Bearer ${token}` }}
        )
        .then((response) => {
            console.log(response);
            alert(`${this.props.movie.Title} added to favorites`);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onRemoveFavorite = (e,movie) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://movie-list-api-5858.herokuapp.com/users/${Username}/favorites/${this.props.movie._id}`, {
            headers: {Authorization: `Bearer ${token}` }}
        )
        .then((response) => {
            console.log(response);
            alert(`${this.props.movie.Title} removed from favorites`);
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    render() {
        const {movie, onBackClick} = this.props;

        return (
            <div className="movie-view">
                <Row>
                    <Button variant="primary back-button" onClick={() => { onBackClick(); }} >Back</Button>
                </Row>
                <br/>
                <div >
                    <img  className="movie-poster" src={movie.ImagePath} crossOrigin="true" width='200px' height='300px' />
                </div>
                <div className='movie-info'>
                    <h2 className="movie-title">
                        <span className="value">{movie.Title}</span>
                    </h2>
                    <div className='movie-description'>
                        <div>
                            <span className="value">{movie.Description}</span>
                        </div>
                    </div>
                    <span className='movie-genre'>
                        <span>
                            <span className="label">Genre:</span>
                            <Link to={`/genre/${movie.Genre.Name}`}>
                                <Button variant="link">{movie.Genre.Name}</Button>
                            </Link>
                        </span>
                    </span>    
                    <span className="director-name">
                        <span className="label">Director:</span>
                        <Link to={`/directors/${movie.Director.Name}`}>
                            <Button variant="link">{movie.Director.Name}</Button>
                        </Link>
                    </span>
                </div>
                <Button variant="secondary" onClick={this.onAddFavorite}>+ Favorites</Button>
                <Button variant="danger" onClick={this.onRemoveFavorite}> - Favorites </Button>
            </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        ImagePath: PropTypes.string.isRequired
    })
};