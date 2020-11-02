import * as favoriteActionsTypes from './favoriteTypes';

export const addToFavorites = cityData => {
    return({
        type: favoriteActionsTypes.ADD_TO_FAVORITE,
        payload: cityData
    })
} 

export const removeFromFavorite = cityName => {
    return {
        type: favoriteActionsTypes.REMOVE_FROM_FAVORITE,
        payload: cityName
    }
}
