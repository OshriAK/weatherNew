import { combineReducers } from 'redux';
import favoriteReducer from '../redux/favorite/favoriteReducer';
import homeReducer from '../redux/home/homeReducer';


const rootReducer = combineReducers({
    favRedcuer: favoriteReducer,
    homeReducer: homeReducer
})

export default rootReducer;

