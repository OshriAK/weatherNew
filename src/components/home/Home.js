import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { addToFavorites } from '../../redux/favorite/favoriteActions'

import DayCard from './DayCard'
import Search from '../search/Search';

import './Home.css';

const Home = props => {
    const addToFavoritesHandler = () => {
        props.addToFavorites({
            cityName: props.homeState.cityName,
            cityIcon: props.homeState.cityIcon,
            cityTemp: props.homeState.cityTemp,
            cityForecastText: props.homeState.cityForecastText,
            cityFiveDay: props.homeState.fiveDayForecast
        });   
    }
    return (
        <React.Fragment>
            <Search />
            <div className="home">
                <div className="home-top">
                    <div className="home-top__left-side">
                        <h2 className="home-top__left-side__cityname">{props.homeState.cityName}</h2>
                        <h2 className="home-top__left-side__citytemp">{props.homeState.cityTemp}&deg;C</h2>
                    </div>
                    {props.favState.isCurrentCityFavorite ? null : <div className="home-top__right-side">
                        <div className="home-top__right-side__hearth-icon">
                            <FavoriteIcon style={{ fontSize: 28 }} color="secondary"/>
                        </div>
                        <Button variant="contained" color="secondary" size="large" onClick={addToFavoritesHandler} >
                            ADD TO FAVORITE
                        </Button>
                    </div>}
                </div>
                <div className="home-middle">
                    <h2>{props.homeState.cityForecastText}</h2>
                    <img src={`icons/${props.homeState.cityIcon}-s.png`} alt="icon" className="home-middle__cityIcon"/>
                </div>
                <div className="home-bottom">
                    {props.homeState.fiveDayForecast.DailyForecasts.map(item => {
                        return (
                            <DayCard
                                key={item.EpochDate}
                                epochDate={item.EpochDate}
                                icon={item.Day.Icon}
                                tempMin={item.Temperature.Minimum.Value}
                                tempMax={item.Temperature.Maximum.Value}
                            />
                        )
                    })}
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        homeState: state.homeReducer,
        favState: state.favRedcuer
    }
}

export default connect(mapStateToProps, { addToFavorites })(Home);
