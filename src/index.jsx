import React from "react";
import ReactDom from "react-dom";
import './index.scss'

class MovieListApplication extends React.Component {
    render() {
        return (
            <div className="movie-list">
                <div>Good morning</div>
            </div>
        );
    }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDom.render(React.createElement(MovieListApplication), container);