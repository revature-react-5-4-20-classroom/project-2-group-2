import {compose, applyMiddleware, Store, createStore} from 'redux';
import thunk from 'redux-thunk';
import {state} from './reducers';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const enhancer = composeEnhancers(
    applyMiddleware(thunk)
)



export const store : Store<any> = createStore(
    state,
    enhancer
)

    
  