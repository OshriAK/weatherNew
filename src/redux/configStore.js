import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        alert('Problem to save in LocalStory');
    } 
}

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) 
            return undefined;
        return JSON.parse(serializedState);
    } catch {
        alert('Problem to load from LocalStory');
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedState = loadFromLocalStorage();

const configStore = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(thunk)));

configStore.subscribe(() => {
    saveToLocalStorage({
        favRedcuer: configStore.getState().favRedcuer
    });
});

export default configStore;