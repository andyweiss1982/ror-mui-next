import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import PasswordField from 'material-ui-password-field'
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText, FormControlLabel } from 'material-ui/Form';
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Layout from './Layout';

const styles = theme => ({
  card: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: '40%',
    maxWidth: '90%',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class Signup extends React.Component {

  state = {
    alert: {
      email: this.props.alert.email || undefined,
      password: this.props.alert.password || undefined,
      password_confirmation: this.props.alert.password_confirmation || undefined
    }
  }

  handleSignin = () => {
    Turbolinks.clearCache();
    Turbolinks.visit("/users/sign_in", {"action": "replace"})
  }

  handleForgotPassword = () => {
    Turbolinks.clearCache();
    Turbolinks.visit("/users/password/new", {"action": "replace"});
  }

  handleChange = event => {
    const self = this;
    let nextAlert = self.state.alert;
    if(event.target.id === "user_password"){
      if(event.target.value.length < self.props.minimum_password_length){
        nextAlert.password = `too short (minimum is ${self.props.minimum_password_length} characters)`;
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
    return(
      <Layout>
        <Card className={classes.card}>
          <CardHeader title={"Sign Up"}/>
          <form
            className="new_user"
            id="new_user"
            action="/users"
            acceptCharset="UTF-8"
            data-remote="true"
            method="post"
          >
            <CardContent>
              <input name="utf8" type="hidden" value="✓"></input>
              <div className="field">
                <FormControl
                  fullWidth
                  className={classes.formControl}
                  error={this.state.alert.email ? true : false}
                >
                  <InputLabel htmlFor="user[email]">Email</InputLabel>
                  <Input
                    name="user[email]"
                    onChange={this.handleChange}
                    id="user_email"
                  />
                  <FormHelperText>{this.state.alert.email ? this.state.alert.email : undefined}</FormHelperText>
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
            </CardContent>
            <CardActions>
              <Button color="primary" onClick={this.handleSignin}>
                Sign In
              </Button>
              <Button color="primary" onClick={this.handleForgotPassword}>
                Forgot Password?
              </Button>
              <div style={{marginLeft: 'auto'}}>
                <Button
                  variant="raised"
                  color="primary"
                  type="submit"
                  name="commit"
                  value="Sign up"
                  data-disable-with="Sign up"
                >
                  Sign Up
                </Button>
              </div>
            </CardActions>
          </form>
        </Card>
      </Layout>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);

