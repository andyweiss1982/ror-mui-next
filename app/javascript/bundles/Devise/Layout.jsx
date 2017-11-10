import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Theme from '../Theme';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Button from 'material-ui/Button';

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
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  notice: {
    background: theme.palette.primary[500]
  }
});

class Layout extends React.Component {

  state = {
    notice: {open: this.props.notice ? true : false}
  }

  handleNoticeRequestClose = () => {
    this.setState({
      notice: {open: false},
    });
  };

  handleTitleClick = () => {
    Turbolinks.clearCache();
    Turbolinks.visit("/users/sign_in", {"action": "replace"});
  }

  render(){
    const { classes } = this.props;
    return(
      <Theme>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Button color="contrast" onClick={this.handleTitleClick}>
                <Typography type="title" color="inherit">
                  Demo Application
                </Typography>
              </Button>
            </Toolbar>
          </AppBar>
          <div className={classes.aligner} >
            {this.props.children}
          </div>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.notice.open}
          autoHideDuration={4000}
          onRequestClose={this.handleNoticeRequestClose}
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
      </Theme>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);
