import React from 'react';
import PropTypes from 'prop-types';
import {Button, Container, Row} from 'react-bootstrap';

import './director-view.scss'

export class DirectorView extends React.Component {

    render() {
        const {director, onBackClick} = this.props;

        return (
            <div className="director-view">
                     <Row>
                        <Button variant="primary back-button" onClick={() => { onBackClick(); }} >Back</Button>
                    </Row>
                <br/>
                <div className='director'>
                    <h2 className="director-name">
                        <span className="value">{director.Name}</span>
                    </h2>
                </div>
                <div className='director-bio'>
                    <div>
                        <span className="label">Biography: </span>
                        <span className="value">{director.Bio}</span>
                    </div>
                </div>
                <div className='director-birth'>
                    <div>
                        <span className="label">Birth Year: </span>
                        <span className="value">{director.Birth}</span>
                    </div>
                </div>
            </div>
        );
    }
}