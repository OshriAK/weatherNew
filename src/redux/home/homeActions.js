import * as homeActionTypes from './homeTypes';
import axios from 'axios'

import { apiKey } from '../../apiKey';

export const autoComplete = () => {
    return {
        type: homeActionTypes.LOCATION_AUTOCOMPLETE,
    }
}

export const getCurrentWeather = (q) => async dispatch => {
    const cityKey = await axios.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=' + apiKey + "&q=" + q)
    const response = await axios.get('http://dataservice.accuweather.com/currentconditions/v1/' + cityKey.data[0].Key + "?apikey=" + apiKey)
    const fiveDay = await axios.get('http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + cityKey.data[0].Key + "?apikey=" + apiKey)
    dispatch({
        type: homeActionTypes.GET_CURRENT_WEATHER,
        payload: {response: response, cityName: cityKey.data[0].LocalizedName, fiveDay: fiveDay}
    })
}

export const moveToHomePage = cityData => {
    return {
        type: homeActionTypes.MOVE_TO_HOMEPAGE,
        payload: cityData
    }
}

export const getCurrentWeatherByLocation = (lat, lon) => async dispatch => {
    const cityKey = await axios.get("http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=" + apiKey + "&q=" + lat + ", " + lon)
    const response = await axios.get('http://dataservice.accuweather.com/currentconditions/v1/' + cityKey.data.Key + "?apikey=" + apiKey)
    const fiveDay = await axios.get('http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + cityKey.data.Key + "?apikey=" + apiKey)
    dispatch({
        type: homeActionTypes.GET_CURRENT_WEATHER,
        payload: {response: response, cityName: cityKey.data.LocalizedName, fiveDay: fiveDay}
    })
}