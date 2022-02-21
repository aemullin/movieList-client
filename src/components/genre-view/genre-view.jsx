import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import './genre-view.scss'

export class GenreView extends React.Component {

    render() {
        const {genre, onBackClick} = this.props;

        return (
            <div className="genre-view">
                <div className='genre'>
                    <h2 className="genre-name">
                        <span className="value">{genre.Name}</span>
                    </h2>
                </div>
                <div className='genre-description'>
                    <div>
                        <span className="value">{genre.Description}</span>
                    </div>
                </div>
                <Button variant="primary" onClick={() => { onBackClick(); }} >Back</Button>
            </div>
        );
    }
}