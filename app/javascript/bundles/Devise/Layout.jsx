import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Theme from '../Theme';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
    height: '100vh',
  },
  aligner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%'
  },
});

class Layout extends React.Component {
  render(){
    const { classes } = this.props;
    return(
      <Theme>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography type="title" color="inherit">
                Demo Application
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.aligner} >
            {this.props.children}
          </div>
        </div>
      </Theme>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);
