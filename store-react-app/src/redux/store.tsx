import {compose, applyMiddleware, Store, createStore} from 'redux';
import thunk from 'redux-thunk';
import {state} from './reducers';


//const iterate = require('redux-iterate');


const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const enhancer = composeEnhancers(
    applyMiddleware(thunk)
    // applyMiddleware(iterate)
    
)



export const store : Store<any> = createStore(
    state,
    enhancer
)

    
  