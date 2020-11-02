import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
 
import { removeFromFavorite } from '../../redux/favorite/favoriteActions'
import { moveToHomePage } from '../../redux/home/homeActions'
// import VisibilityIcon from '@material-ui/icons/Visibility';

import './FavoriteCard.css';

const FavoriteCard = props => {
    const onClickDeleteFavoriteHandler = () => {
        props.removeFromFavorite(props.cityName)
    }

    const moveToHomepageHandler = () => {
        props.moveToHomePage(props)
    }

    return (
        <div className="favoriteCard">
            <Link to="/" className="favoriteCard__cityName" onClick={moveToHomepageHandler}>{props.cityName}</Link>
            <img className="favoriteCard__cityIcon" src={`icons/${props.cityIcon}-s.png`} alt="icon" />
            <h3 className="favoriteCard__cityTemp">{props.cityTemp}&deg;C</h3>
            <div className="favoriteCard-actions">
                {/* <VisibilityIcon /> */}
                <DeleteIcon className="favoriteCard-actions__delete" fontSize="large" onClick={onClickDeleteFavoriteHandler}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        favState: state.favRedcuer
    }
}

export default connect(mapStateToProps, { removeFromFavorite, moveToHomePage })(FavoriteCard)
