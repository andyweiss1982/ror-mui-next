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
import Theme from './Theme';
import Switch from 'material-ui/Switch';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
    height: '100vh',
  },
  card: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: '40%',
    maxWidth: '90%',
  },
  aligner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90%'
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class Login extends React.Component {
  handleChange = param => event => {
    this.setState({
      [param]: event.target.value,
    });
  };

  state = {
    alert: this.props.alert
  }

  handleSignup = () => {
    window.location.href = "/users/sign_up";
  }

  handleForgotPassword = () => {
    window.location.href = "/users/password/new";
  }

  handleChange = () => {
    this.setState({alert: undefined})
  }

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
            <Card className={classes.card}>
              <CardHeader title={"Log In"}/>
              <form
                className="new_user"
                id="new_user"
                action="/users/sign_in"
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
                  <div className="field">
                    <FormControl
                      fullWidth
                      className={classes.formControl}
                      error={this.state.alert ? true : false}
                    >
                      <PasswordField name="user[password]" placeholder="Password" onChange={this.handleChange}/>
                    </FormControl>
                  </div>
                  <FormControlLabel
                    control={<Switch value="1"/>}
                    label="Remember Me"
                    aria-label="user_remember_me"
                    name="user[remember_me]"
                  />
                </CardContent>
                <CardActions>
                  <Button color="accent" onClick={this.handleSignup}>
                    Sign Up
                  </Button>
                  <Button color="accent" onClick={this.handleForgotPassword}>
                    Forgot Password?
                  </Button>
                  <div style={{marginLeft: 'auto'}}>
                    <Button
                      raised
                      color="primary"
                      type="submit"
                      name="commit"
                      value="Log in"
                      data-disable-with="Log in"
                    >
                      Log In
                    </Button>
                  </div>
                </CardActions>
              </form>
            </Card>
          </div>
        </div>
      </Theme>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
