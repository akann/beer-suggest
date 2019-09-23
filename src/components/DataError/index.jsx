import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    warning: {
      backgroundColor: 'red',
    },
  }));
  
export default ({msg}) => {
  const classes = useStyles();

  return <Snackbar
      id="data-error"
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open
      autoHideDuration={6000}
      message={<span >{msg}</span>}  
      className={classes.warning}
  />
}

