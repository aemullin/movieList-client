import React from 'react';
import PropTypes from 'prop-types';

import './movie-card.scss'

export class MovieCard extends React.Component {
    render() {
        const { movie, onMovieClick } = this.props;

        return <div className='movie-card-list'>
                    <div className="movie-card" onClick={() => {onMovieClick(movie);}}>{movie.Title}</div><br></br>
                </div>;
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};