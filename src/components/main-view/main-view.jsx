import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

import './main-view.scss'

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null
        };
    }

    componentDidMount(){
        axios.get('https://movie-list-api-5858.herokuapp.com/movies')
        .then(response => {
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
                console.log(error);
            });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

        if (!user) return (
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
            </Row>
        )

        if (movies.length === 0) return (
            <Row className="justify-content-md-center">
                 <Spinner animation="border"/>
            </Row>
        )
        
        return (
            <div className="main-view">
                {selectedMovie
                    ? (
                        <Row className="justify-content-md-center">
                            <Col md={8}>
                                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie); }}/>
                            </Col>
                        </Row>
                    )
                    : (
                        <Row className="justify-content-md-center">
                            {movies.map(movie => (
                                <Col md={3}>
                                    <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => {this.setSelectedMovie(newSelectedMovie) }} />
                                </Col>
                            ))}
                        </ Row>
                    )
                }
            </div>
        );
        
    }
}