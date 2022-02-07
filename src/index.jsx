import React from "react";
import ReactDom from "react-dom";
import { MainView } from './components/main-view/main-view';

import './index.scss'

class MovieListApplication extends React.Component {
    render() {
        return (
            <MainView />
        );
    }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDom.render(React.createElement(MovieListApplication), container);