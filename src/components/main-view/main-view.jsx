import React from 'react';
import axios from 'axios';

import {connect} from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom'; 

import { setMovies } from '../../actions/actions';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import MoviesList from '../movies-list/movies-list';
import {LoginView} from '../login-view/login-view';
import {RegistrationView} from "../registration-view/registration-view";
import {ProfileView} from "../profile-view/profile-view";
import {MovieView} from '../movie-view/movie-view';
import {DirectorView} from '../director-view/director-view'
import { GenreView } from '../genre-view/genre-view';
import {Navbar} from '../nav-bar/nav-bar'

import './main-view.scss'

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            user: null
        };
    }

    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    getMovies(token) {
        axios.get('https://movie-list-api-5858.herokuapp.com/movies', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            this.props.setMovies(response.data);
        })
        .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { movies } = this.props;
        const {  user } = this.state;

        
        return (
            <Router>
                <Navbar user={user} />
               <Row className="main-view justify-content-md-center">
                    <Route exact path ="/" render={() => {
                        if (!user) return (
                            <Row className="justify-content-md-center">
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            </Row>
                        )
                
                        if (movies.length === 0) return (
                            <Row className="justify-content-md-center">
                                 <Spinner animation="border"/>
                            </Row>
                        )

                         return <MoviesList movies={movies}/>
                    }}/>
                     <Route path="/register" render={() => {
                         return <Col md={4}>
                             <RegistrationView />
                         </Col>
                     }}/>
                    <Route path="/movies/:movieId" render={({match, history}) => {
                        if (!user) return (
                            <Row className="justify-content-md-center">
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            </Row>
                        )
                
                        if (movies.length === 0) return (
                            <Row className="justify-content-md-center">
                                 <Spinner animation="border"/>
                            </Row>
                        )
                        
                        return <Col md={11}>
                            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path="/directors/:name" render={({match, history}) => {
                        if (!user) return (
                            <Row className="justify-content-md-center">
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            </Row>
                        )
                
                        if (movies.length === 0) return (
                            <Row className="justify-content-md-center">
                                 <Spinner animation="border"/>
                            </Row>
                        )

                        return <Row className="main-view justify-content-md-center">
                            <Col>
                                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                            </Col>
                        </Row>
                    }} />

                    <Route path="/profile" render={({history}) => {
                        if (!user) return (
                            <Row className="justify-content-md-center">
                                <Col>
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
                                <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                        )}} />   

                    <Route path="/genre/:name" render={({match, history}) => {
                        if (!user) return (
                            <Row className="justify-content-md-center">
                                <Col>
                                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                                </Col>
                            </Row>
                        )
                
                        if (movies.length === 0) return (
                            <Row className="justify-content-md-center">
                                 <Spinner animation="border"/>
                            </Row>
                        )

                        return <Row className="main-view justify-content-md-center">
                            <Col md={12}>
                                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                            </Col>
                        </Row>
                    }} />
                    
                </Row>
            </Router>
        );
        
    }
}

let mapStateToProps = state => {
    return {movies: state.movies }
}

export default connect(mapStateToProps, {setMovies})(MainView);