import React from 'react';
import ReactDOM from 'react-dom';
import './style/lib/animate.css';
import App from './App';
import { Provider} from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import store from './stores';


const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>
        , document.getElementById('root'));
}

render(App);

registerServiceWorker();