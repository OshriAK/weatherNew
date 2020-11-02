import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { getCurrentWeather } from '../../redux/home/homeActions';

import './SimpleSearch.css'

const SimpleSearch = (props) => {
    const [query, setQuery] = useState('');

    const onClickHandler = () => {
        if(!query)
        {
            return;
        }
        
        props.getCurrentWeather(query);
        props.favState.isCurrentCityFavorite = false
    }

    return (
        <div className="search">
            <div className="container">
                <input className="container__input" type="text" placeholder="Search..." onChange={(e)=> setQuery(e.target.value)}/>
                <SearchIcon fontSize="large" className="container__icon" onClick={onClickHandler}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        favState: state.favRedcuer
    }
}

export default connect(mapStateToProps, {getCurrentWeather})(SimpleSearch);
