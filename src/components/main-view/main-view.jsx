import React from 'react';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [
                { "_id" : "61eda33c2db24d3bf8793079", "Title" : "Avatar", "Description" : "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home. When his brother is killed in a robbery, paraplegic Marine Jake Sully decides to take his place in a mission on the distant world of Pandora.", "Genre" : { "Name" : "Science Fiction", "Description" : "Speculative fiction that contains imagined elements that do not exist in the real world." }, "Director" : { "Name" : "James Cameron", "Bio" : "James Francis Cameron is a Canadian filmmaker. Best known for making science fiction and epic films. Popular films include Avatar and Titanic.", "Birth" : "1954" }, "ImagePath" : "../jpg/avatar.jpg", "Featured" : true },
                { "_id" : "61eda4992db24d3bf879307a", "Title" : "The Terminator", "Description" : "Disguised as a human, a cyborg assassin known as a Terminator travels from 2029 to 1984 to kill Sarah Connor. Sent to protect Sarah is Kyle Reese, who divulges the coming of Skynet, an artificial intelligence system that will spark a nuclear holocaust.", "Genre" : { "Name" : "Action", "Description" : "A genre where the main character must accomplish a goal through lots of violence, explosions and fighting" }, "Director" : { "Name" : "James Cameron", "Bio" : "James Francis Cameron is a Canadian filmmaker. Best known for making science fiction and epic films. Popular films include Avatar and Titanic.", "Birth" : "1954" }, "ImagePath" : "../jpg/Terminator.jpg", "Featured" : true },
                { "_id" : "61eda67a2db24d3bf879307b", "Title" : "Saw", "Description" : "The film tells a nonlinear narrative, revolving around the mystery of the Jigsaw Killer, who tests his victims will to live by putting them through deadly games where they must inflict great physical pain upon themselves to survive.", "Genre" : { "Name" : "Horror", "Description" : "A genre in which the movie creates feelings of fear keeping the audience on the edge of their seats." }, "Director" : { "Name" : "James Wan", "Bio" : "James Wan is an Australian film producer, screenwriter and film director of Malaysian Chinese descent. He is widely known for directing horror films.", "Birth" : "1977" }, "ImagePath" : "../jpg/saw.jpg", "Featured" : true }
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0)
            return <div className="main-view"> The list is empty!</div>;
        
        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => {this.setSelectedMovie(newSelectedMovie); }}/>
                    : movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => {this.setSelectedMovie(movie) }} />)}
            </div>
        );
        
    }
}