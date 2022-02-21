import React from 'react';
import PropTypes from 'prop-types';
import {Row, Button} from 'react-bootstrap';

import './genre-view.scss'

export class GenreView extends React.Component {

    render() {
        const {genre, onBackClick} = this.props;

        return (
            <div className="genre-view">
                 <Row>
                    <Button variant="primary back-button" onClick={() => { onBackClick(); }} >Back</Button>
                </Row>
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
            </div>
        );
    }
}