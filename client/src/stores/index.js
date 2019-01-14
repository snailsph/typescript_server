import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';
import { createStore,applyMiddleware} from 'redux';
// import Perf from 'react-addons-perf'

// const win = window;
// win.Perf = Perf

const middlewares = [thunkMiddleware];
// // if (process.env.NODE_ENV !== 'production') {
// //   middlewares.push(require('redux-immutable-state-invariant')());
// // }


export default createStore(reducers,applyMiddleware(...middlewares));