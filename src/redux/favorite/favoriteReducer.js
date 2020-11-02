import * as favoriteActionsTypes from './favoriteTypes';

const initialState = {
    favoritesList: [],
    isCurrentCityFavorite: false
}

const favoriteReducer = (state = initialState, action) => {
    switch(action.type) {
        case favoriteActionsTypes.ADD_TO_FAVORITE: 
            return {
                ...state,
                favoritesList: [...state.favoritesList, action.payload],
                isCurrentCityFavorite: true
            }
        case favoriteActionsTypes.REMOVE_FROM_FAVORITE:
            return {
                ...state,
                favoritesList: state.favoritesList.filter(ele => ele.cityName !== action.payload),
                isCurrentCityFavorite: false
            }
        default: return state
    }
}

export default favoriteReducer;