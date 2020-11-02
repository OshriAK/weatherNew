import React from 'react';
import { connect } from 'react-redux';

import './DayCard.css';

const getDayfromEpochDate = (epochDate) => {
    return  (new Date(epochDate * 1000)).toLocaleDateString('en-us', { weekday: 'short' })
}

const DayCard = (props) => {
    return (
        <div className="dayCard">
            <div className="dayCard__name">
                {getDayfromEpochDate(props.epochDate)}
            </div>
            <img src={`icons/${props.icon}-s.png`} alt="icon" className="dayCard__icon"/>
            <div className="dayCard__temp">
            {((props.tempMin-32)/1.8).toFixed()} - {((props.tempMax-32)/1.8).toFixed()} &deg;C
            </div>  
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        homeState: state.homeRed
    }
}

export default connect((mapStateToProps))(DayCard);
