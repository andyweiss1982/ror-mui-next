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

class ForgotPassword extends React.Component {
  state = {
    alert: this.props.alert
  }

  handleSignin = () => {
    Turbolinks.clearCache();
    Turbolinks.visit("/users/sign_in", {"action": "replace"})
  }

  handleSignup = () => {
    Turbolinks.clearCache();
    Turbolinks.visit("/users/sign_up", {"action": "replace"})
  }

  handleChange = () => {
    this.setState({alert: undefined})
  }

  render(){
    const { classes } = this.props;
    return(
      <Layout>
        <Card className={classes.card}>
          <CardHeader title={"Forgot Password"}/>
          <form
            className="new_user"
            id="new_user"
            action="/users/password"
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
                  error={this.state.alert ? true : false}
                >
                  <InputLabel htmlFor="user[email]">Email</InputLabel>
                  <Input name="user[email]" onChange={this.handleChange}/>
                  <FormHelperText>{this.state.alert}</FormHelperText>
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
                  value="Reset password"
                  data-disable-with="Reset password"
                >
                  Reset password
                </Button>
              </div>
            </CardActions>
          </form>
        </Card>
      </Layout>
    );
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForgotPassword);
