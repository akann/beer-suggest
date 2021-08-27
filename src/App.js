import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LinearProgress from '@material-ui/core/LinearProgress';

import FoodData from './components/FoodData'; 
import DataError from './components/DataError';

const useStyles = makeStyles(theme => ({
  header: {
    margin: '20px',
    textAlign: 'center',
    color: '#DC143C',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px',
  },
  input: {
    margin: 'auto',
  },
  progress: {
    width: '50%',
    margin: 'auto',
  },
}));

const App = ({fetchData}) => {
  const [data, setData] = useState([]);
  const [meal, setMeal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearchClick = () => {
    if (!meal.trim()) {
      setError('Empty meal');
      return;
    }
    
    setLoading(true);

    fetchData(meal)
      .then(data => {
        if (Array.isArray(data) && data.length) {
          setData(data);
          setLoading(false);
        } else {
          setError(`No beers found for "${meal}"`);
          setLoading(false);
        }  
      })
      .catch(msg => {
        setError(msg);
        setLoading(false);
      })
    ;
  };

  const onInputChange = (text) => {
    setData([]);
    setMeal(text);
    setError('');
  };

  const classes = useStyles();

  return (
    <React.Fragment>
      <h2 className={classes.header}>
        Beer finder for you favourite meal
      </h2>
       { loading && <LinearProgress color="secondary" className={classes.progress} /> }
      <div className={classes.container}>
        <TextField
          className={classes.input}
          onChange={e => onInputChange(e.target.value)}
          label="Enter meal"
          error={Boolean(error)}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={onSearchClick}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        { error && <DataError msg={error} /> }
        { data.length && <FoodData data={data}/> }
      </div>
    </React.Fragment>
  );
}

export default App;
