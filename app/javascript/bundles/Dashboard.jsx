import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Navbar from './Navbar';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '370px'
  },
});

function Dashboard(props) {
  const { classes } = props;
  return (
    <Navbar>
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={7}>
            <Paper className={classes.paper}>
              <Typography type="headline" component="h3">
                Some Important Stuff
              </Typography>
              <Typography type="body1" component="p">
                Yadda Yadda Yadda
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Paper className={classes.paper}>
              <Typography type="headline" component="h3">
                Less Important Stuff
              </Typography>
              <Typography type="body1" component="p">
                Yadda Yadda Yadda
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography type="headline" component="h3">
                A Big Datatable
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Navbar>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
