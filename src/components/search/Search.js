import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCurrentWeather } from '../../redux/home/homeActions';
import { apiKey } from '../../apiKey';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Search.css';


const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const SearchAutoComplete = props => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState('');
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }

    if (query) {
      (async () => {
        const response = await fetch('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=' + apiKey + '&q=' + query);
        const cities = await response.json();
        if (active) {
          setOptions(cities.map(city => ({name: city.LocalizedName})))
        }
      })();
    }

    return () => {
      active = false;
    };
  }, [loading, query]);


  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  var returnedFunction = debounce(async (event, value) => {
    if(!value) {
      return;
    }
    
    setQuery(value);
    const response = await fetch('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=' + apiKey + '&q=' + value);
    const cities = await response.json();
    
    setOptions(cities.map(city => ({name: city.LocalizedName})))
  }, 500);
  
  const onChangeHandler = (event, value) => {
    if(value) {
      props.getCurrentWeather(value.name);
      props.favState.isCurrentCityFavorite = false
    }
  }

  return (
    <Autocomplete
      className="search"
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      size='medium'
      onInputChange={returnedFunction}
      onChange={onChangeHandler}
      
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search..."
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

const mapStateToProps = (state) => {
  return {
      favState: state.favRedcuer
  }
}

export default connect(mapStateToProps, {getCurrentWeather})(SearchAutoComplete);