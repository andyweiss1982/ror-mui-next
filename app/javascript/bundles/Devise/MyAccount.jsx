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
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: '40%',
    maxWidth: '90%'
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
    height: '90%',
    flexDirection: 'column'
  },
  dialog: {
    textAlign: 'center'
  }
});

class MyAccount extends React.Component {
  state = {
            notice: {
              open: this.props.notice ? true : false
            },
            alert:  {
              email: this.props.alert.email || undefined,
              password: this.props.alert.password || undefined,
              password_confirmation: this.props.alert.password_confirmation || undefined,
              current_password: this.props.alert.current_password || undefined
            },
            dialog: {open: false}
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

  handleDialogOpen = () => {
    this.setState({ dialog: {open: true }});
  };

  handleDialogClose = () => {
    this.setState({ dialog: {open: false }});
  };

  handleChange = event => {
    const self = this;
    let nextAlert = self.state.alert;
    if(event.target.id === "user_password"){
      if(event.target.value.length < self.props.minimum_password_length){
        nextAlert.password = `too short (minimum ${self.props.minimum_password_length} characters)`;
      }else{
        nextAlert.password = undefined;
      }
    }
    if(event.target.id === "user_password_confirmation"){
      if(event.target.value !== document.getElementById('user_password').value){
        nextAlert.password_confirmation = "doesn't match password";
      }else{
        nextAlert.password_confirmation = undefined;
      }
    }
    self.setState({alert: nextAlert})
  }

  render(){
    const { classes } = this.props;
    return (
      <Navbar current_user={this.props.current_user}>
        <div className={classes.aligner} >
          <Card className={classes.card}>
            <CardHeader title={"Update Account"}/>
            <form
              className="new_user"
              id="new_user"
              action="/users"
              acceptCharset="UTF-8"
              data-remote="true"
              method="post"
            >
              <CardContent>
                <input type="hidden" name="_method" value="put"></input>
                <input name="utf8" type="hidden" value="✓"></input>
                <div className="field">
                  <FormControl
                    fullWidth
                    className={classes.formControl}
                    error={this.state.alert.email ? true : false}
                    required
                  >
                    <InputLabel htmlFor="user[email]">Email</InputLabel>
                    <Input
                      name="user[email]"
                      defaultValue={this.props.current_user.email}
                      onChange={this.handleChange}
                    />
                    <FormHelperText>{this.state.alert.email}</FormHelperText>
                  </FormControl>
                </div>
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
                    <FormHelperText>{this.state.alert.password_confirmation}</FormHelperText>
                  </FormControl>
                </div>
                <div className="field">
                  <FormControl
                    fullWidth
                    className={classes.formControl}
                    error={this.state.alert.current_password ? true : false}
                    required
                  >
                    <PasswordField
                      id="user_current_password"
                      name="user[current_password]"
                      placeholder="Current Password"
                      onChange={this.handleChange}
                    />
                    <FormHelperText>{this.state.alert.current_password}</FormHelperText>
                  </FormControl>
                </div>
              </CardContent>
              <CardActions>
                <Button
                  raised
                  color="accent"
                  onClick={this.handleDialogOpen}
                >
                  Cancel account
                </Button>
                <div style={{marginLeft: 'auto'}}>
                  <Button
                    raised
                    color="primary"
                    type="submit"
                    name="commit"
                    value="Update account"
                    data-disable-with="Update account"
                  >
                    Update account
                  </Button>
                </div>
              </CardActions>
            </form>
          </Card>
        </div>
        <Dialog
          open={this.state.dialog.open}
          onRequestClose={this.handleDialogClose}
          className={classes.dialog}
        >
          <DialogTitle>{"Delete Account?"}</DialogTitle>
          <form class="button_to" method="post" action="/users" data-remote="true">
            <input type="hidden" name="_method" value="delete"></input>
            <DialogActions>
              <Button onClick={this.handleDialogClose} color="default">
                Never Mind
              </Button>
              <Button
                raised
                autofocus
                color="accent"
                type="submit"
                name="commit"
                value="Confirm"
                data-disable-with="Confirm"
              >
                Confirm
              </Button>
            </DialogActions>
          </form>
        </Dialog>
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
