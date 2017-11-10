import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue, pink, red } from 'material-ui/colors';

const theme = createMuiTheme({
  palette: {
    primary:    blue,
    secondary:  pink,
    error:      red,
  }
});

export default class Theme extends React.Component {
  constructor(){
    super();
  }
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
