import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Navbar from './Navbar';
import Grid from 'material-ui/Grid';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

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
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  alert: {
    background: theme.palette.error[500]
  },
  notice: {
    background: theme.palette.primary[500]
  }
});

class Dashboard extends React.Component {
  state = {
            alert:  {open: this.props.alert ? true : false},
            notice: {open: this.props.notice ? true : false}
          };

  handleAlertRequestClose = () => {
    this.setState({
      alert: {open: false},
    });
  };

  handleNoticeRequestClose = () => {
    this.setState({
      notice: {open: false},
    });
  };

  render(){
    const { classes } = this.props;
    return (
      <Navbar current_user={this.props.current_user}>
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={7}>
              <Paper className={classes.paper}>
                <Typography type="headline" component="h3">
                  Headline 1
                </Typography>
                <Typography type="body1" component="p">
                  Body Text
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Paper className={classes.paper}>
                <Typography type="headline" component="h3">
                  Headline 2
                </Typography>
                <Typography type="body1" component="p">
                  Body Text
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography type="headline" component="h3">
                  Big Datatable
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.alert.open}
          autoHideDuration={4000}
          onClose={this.handleAlertRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
            className: classes.alert
          }}

          message={<span id="message-id">{this.props.alert}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleAlertRequestClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.notice.open}
          autoHideDuration={4000}
          onClose={this.handleNoticeRequestClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
            className: classes.notice
          }}
          message={<span id="message-id">{this.props.notice}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleNoticeRequestClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </Navbar>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
