import * as homeActionTypes  from './homeTypes';
import { dummyData } from '../../dummyData';

const initialState = {
    cityName: 'Holon',
    cityTemp: '100',
    cityForecastText: 'Coldddd!',
    cityIcon: 1,
    fiveDayForecast: dummyData,
}

const homeReducer = (state = initialState, action) => {
    switch(action.type) {
        case homeActionTypes.LOCATION_AUTOCOMPLETE: 
            return {
                ...state
            }
        case homeActionTypes.GET_CURRENT_WEATHER: 
            return {
                ...state,
                cityName: action.payload.cityName,
                cityTemp: action.payload.response.data[0].Temperature.Metric.Value,
                cityForecastText: action.payload.response.data[0].WeatherText,
                cityIcon: action.payload.response.data[0].WeatherIcon,
                fiveDayForecast: action.payload.fiveDay.data,
            }
        case homeActionTypes.FIVE_DAY_DAILY_FORECAST:
            return {
                ...state
            } 
        case homeActionTypes.MOVE_TO_HOMEPAGE:
            const index = action.payload.favState.favoritesList.findIndex(element => element.cityName === action.payload.cityName)
            return {
                ...state,
                cityName: action.payload.cityName,
                cityTemp: action.payload.cityTemp,
                cityIcon: action.payload.cityIcon,
                cityForecastText: action.payload.cityForecastText,
                fiveDayForecast: action.payload.favState.favoritesList[index].cityFiveDay
            }
        default: return state
    }
}

export default homeReducer;

