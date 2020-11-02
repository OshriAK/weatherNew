import React, { useEffect }  from 'react';
import {connect} from 'react-redux';
import { getCurrentWeatherByLocation } from './redux/home/homeActions'

import Navbar from './components/navbar/Navbar';
import './App.css';

const App = props => {
  useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
            props.getCurrentWeatherByLocation(position.coords.latitude, position.coords.longitude);
            return;
        })      
      } else {
          alert("geolocation is not supported");
        }   
    });

  return (
    <div className="app">
      <Navbar />
    </div>
  );
}

export default connect(null, { getCurrentWeatherByLocation })(App);
