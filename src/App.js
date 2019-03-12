import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Header } from './components/layout';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    const { classes, theme } = this.props;
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <div>
                    <Header />
                </div>
            </BrowserRouter>
        </MuiThemeProvider>
    )
  }
}

const styles = theme => ({

})

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);