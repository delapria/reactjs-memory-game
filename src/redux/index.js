import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { reducers as gameReducers } from './games';

const appReducer = combineReducers({
  ...gameReducers,
});

const { NODE_ENV } = process.env;

const composeEnhancers =
  NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(reduxThunk))
);

export default store;
