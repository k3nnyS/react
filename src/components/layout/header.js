import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';

import Button from '@material-ui/core/Button';

import { Home, About } from '../content';

import Category from '../category';

import { Link, Route } from 'react-router-dom';

import Variant from '../variant'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    }
  }

  toggleDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    })
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position='absolute' color='primary' anchor='bottom'>
          <Toolbar variant="dense">
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => this.toggleDrawer()} >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              My App
            </Typography>
            <Button>
              <HomeIcon className={classes.MenuIcon} />
              <Link to="/" className={classes.MenuList}>Home</Link>
            </Button>
            <Button>
              <HomeIcon className={classes.MenuIcon} />
              <Link to="/about" className={classes.MenuList}>About</Link>
            </Button>
            <Button>
              <HomeIcon className={classes.MenuIcon} />
              <Link to="/category" className={classes.MenuList}>Category</Link>
            </Button>
            <Button>
              <HomeIcon className={classes.MenuIcon} />
              <Link to="/variant" className={classes.MenuList}>Variant</Link>
            </Button>
          </Toolbar>
        </AppBar>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/category" component={Category} />
        <Route exact path="/variant" component={Variant} />
      </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

export default withStyles(styles, { withTheme: true })(Header);