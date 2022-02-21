import React, {useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Container, Button, Row, Col, Form} from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

import './profile-view.scss';

export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: []
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken)
    }

    getUser = (token) => {
        const Username = localStorage.getItem('user');

        axios.get(`https://movie-list-api-5858.herokuapp.com/users/${Username}`, {
            headers: { Authorization : `Bearer ${token}`}
        })
        .then((response) => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday,
                FavoriteMovies: response.data.FavoriteMovies
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    editUser = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://movie-list-api-5858.herokuapp.com/users/${Username}`, {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthday: this.state.Birthday
        }, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birthday: response.data.Birthday
            });

            localStorage.setItem('user', this.state.Username);
            alert("Profile updated successfully");
            window.open('/profile', '_self');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onDeleteUser() {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://movie-list-api-5858.herokuapp.com/users/${Username}/`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        .then((response) => {
            console.log(response);
            alert("Profile deleted sucessfully");
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.open('/', '_self');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    setUsername(value) {
        this.setState({
            Username: value
        });
    }

    setPassword(value) {
        this.setState({
            Password: value
        });
    }

    setEmail(value) {
        this.setState({
            Email: value
        });
    }

    setBirthday(value) {
        this.setState({
            Birthday: value
        });
    }

    render() {
        const { user, movies, onBackClick} = this.props;
        const {FavoriteMovies, Username, Email, Password, Birthday} = this.state;

        if(!Username) {
            return null;
        }

        return(

            <Container fluid>
                <Row className="justify-content-md-center">
                    <h1>{Username}'s Profile</h1>
                </Row><br/> <br/>
                <Row >
                    <Col>
                        <h2>Profile information</h2>
                        <p>Username: {Username}</p>
                        <p>Email: {Email}</p>
                        <p>Birthday (Year-Month-Date): {Birthday}</p>
                        <Button variant="danger" onClick={() => this.onDeleteUser()}>Delete User</Button>
                    </Col>
                    <Col>
                        <h2>Update Profile</h2>
                        <Form className = 'profile-update-form' onSubmit={(e) => this.editUser(e, this.Username, this.Password, this.Email, this.Birthday)}>
                            <Form.Group>
                                <Form.Label>Username: </Form.Label>
                                <Form.Control type="text" name="Username" placeholder="Enter New Username" onChange={(e) => this.setUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password: </Form.Label>
                                <Form.Control type="password" name="Password" placeholder="Enter New Password" onChange={(e) => this.setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email: </Form.Label>
                                <Form.Control type="email" name="Email" placeholder="Enter New Email" onChange={(e) => this.setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Birthday: </Form.Label>
                                <Form.Control type="date" name="Birthday" placeholder="Enter Correct Birthday" onChange={(e) => this.setBirthday(e.target.value)} />
                            </Form.Group> <br/>
                            <Button variant="primary" type="submit" onClick={this.editUser}>Update User</Button>
                        </Form>
                    </Col>
                </Row> <br/>
                <Row className="justify-content-md-center" >
                    <h2>{Username}'s Favorite Movies</h2>
                </Row>
                <Row>
                    {FavoriteMovies.map(movie =>
                        <Col>
                            <MovieCard movie={movie} />
                        </Col>
                    )}
                </Row>
            </Container>
        )
    }

}