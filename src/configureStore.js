import {interactionReducer} from '@imp_pat/ui-kit/utils/interactionUtils';
import {baseRestActionHandlers} from '@imp_pat/ui-kit/utils/actionUtils';
import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import {enableBatching} from 'redux-batched-actions';
import reduxThunk from 'redux-thunk';
import {browserHistory} from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux'

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      }) : compose;

const enhancer = composeEnhancers(
	applyMiddleware(reduxThunk, routerMiddleware(browserHistory)),
);

export default createStore(
	enableBatching(
		combineReducers({
      interactions: interactionReducer,
      baseRest: baseRestActionHandlers,
      routing:  routerReducer,
    })
	),
	enhancer
);
