import React from "react";
import ReactDom from "react-dom";
import Container from 'react-bootstrap/Container';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/main-view/main-view';

import './index.scss'

const store = createStore(moviesApp, devToolsEnhancer());

class MovieListApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container fluid>
                    <MainView />
                </Container>
            </Provider>
        );
    }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDom.render(React.createElement(MovieListApplication), container);