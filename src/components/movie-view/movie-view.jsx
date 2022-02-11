import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

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


    render() {
        const {movie, onBackClick} = this.props;

        return (
            <div className="movie-view">
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
                    <div className="director-name">
                        <span className="label">Director: </span>
                        <span className="value">{movie.Director.Name}</span>
                    </div>
                </div>
                <Button variant="primary" onClick={() => { onBackClick(null); }} >Back</Button>
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
    }).isRequired
};