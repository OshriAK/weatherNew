import React from 'react';
import { connect } from 'react-redux';
import { getCurrentWeather } from '../../redux/home/homeActions';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

import './Search.css';

// const apiKey = "UMCLRc9lAWet2ThAU6qZ2WxDvO00iMBC";
const apiKey = "AMv6BgPJIlzY04EFxZa2Mlmh24RWFHU8";

const SearchAutoComplete = props => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const loading = open && options.length === 0;

  React.useEffect(() => {
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

  
  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const onInputChangeHandler = async (event, value) => {
    if(!value) {
      return;
    }
    setQuery(value);
    const response = await fetch('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=' + apiKey + '&q=' + value);
    const cities = await response.json();
    
    setOptions(cities.map(city => ({name: city.LocalizedName})))
  }
  
  const onChangeHandler = (event, {name}) => {
    if(!name) {
        return;
    }
    props.getCurrentWeather(name);
    props.favState.isCurrentCityFavorite = false
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
      onInputChange={onInputChangeHandler}
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