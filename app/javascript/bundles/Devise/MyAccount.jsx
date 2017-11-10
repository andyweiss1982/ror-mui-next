import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Navbar from '../Navbar';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import PasswordField from 'material-ui-password-field'
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText, FormControlLabel } from 'material-ui/Form';
import Button from 'material-ui/Button';

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
  },
  aligner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%'
  }
});

class MyAccount extends React.Component {
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
    console.log(classes.notice);
    return (
      <Navbar current_user={this.props.current_user}>
        <div className={classes.aligner} >
          <Card className={classes.card}>
            <CardHeader title={"Change Password"}/>
            <form
              className="new_user"
              id="new_user"
              action="/users/password"
              acceptCharset="UTF-8"
              data-remote="true"
              method="post"
            >
              <CardContent>
                <input type="hidden" name="_method" value="put"></input>
                <input name="utf8" type="hidden" value="✓"></input>
                <input
                  id="user_reset_password_token"
                  name="user[reset_password_token]"
                  type="hidden"
                  value={this.props.reset_password_token}
                >
                </input>
                <div className="field">
                  <FormControl
                    fullWidth
                    className={classes.formControl}
                    error={this.state.alert.password ? true : false}
                  >
                    <PasswordField
                      id="user_password"
                      name="user[password]"
                      placeholder="Password"
                      onChange={this.handleChange}
                    />
                    <FormHelperText>{this.state.alert.password ? this.state.alert.password : `${this.props.minimum_password_length} characters minimum`}</FormHelperText>
                  </FormControl>
                </div>
                <div className="field">
                  <FormControl
                    fullWidth
                    className={classes.formControl}
                    error={this.state.alert.password_confirmation ? true : false}
                  >
                    <PasswordField
                      id="user_password_confirmation"
                      name="user[password_confirmation]"
                      placeholder="Password Confirmation"
                      onChange={this.handleChange}
                    />
                    <FormHelperText>{this.state.alert.password_confirmation ? this.state.alert.password_confirmation : undefined}</FormHelperText>
                  </FormControl>
                </div>
              </CardContent>
              <CardActions>
                <Button color="primary" onClick={this.handleSignin}>
                  Sign In
                </Button>
                <Button color="primary" onClick={this.handleSignup}>
                  Sign Up
                </Button>
                <div style={{marginLeft: 'auto'}}>
                  <Button
                    raised
                    color="primary"
                    type="submit"
                    name="commit"
                    value="Change Password"
                    data-disable-with="Change Password"
                  >
                    Change Password
                  </Button>
                </div>
              </CardActions>
            </form>
          </Card>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.alert.open}
          autoHideDuration={4000}
          onRequestClose={this.handleAlertRequestClose}
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
      </Navbar>
    );
  }
}

MyAccount.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyAccount);
