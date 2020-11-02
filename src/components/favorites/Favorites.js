import React from 'react';
import {connect} from 'react-redux';
import { removeFromFavorite } from '../../redux/favorite/favoriteActions';

import FavoriteCard from './FavoriteCard'

import './Favorites.css'

const Favorites = props => {
    return (
        <React.Fragment>
            <div className="favorite-title">Favorites list:</div>
            <div className="favorite-container">
                {props.Favorites.favoritesList.length !== 0 ? props.Favorites.favoritesList.map((city,index) => {
                    return (
                        <FavoriteCard 
                            key={index}
                            cityName={city.cityName}
                            cityIcon={city.cityIcon}
                            cityTemp={city.cityTemp}
                            cityForecastText = {city.cityForecastText}
                        />
                    )
                }) : <h1 className="favorite-container__empty">"You dont have any favorites cities, add one?"</h1>}
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        Favorites: state.favRedcuer
    }
}

export default connect(mapStateToProps, { removeFromFavorite })(Favorites);
