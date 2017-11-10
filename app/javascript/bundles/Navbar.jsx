import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import Theme from './Theme';
import Avatar from 'material-ui/Avatar';
import Button from 'material-ui/Button';
import Menu, { MenuItem, MenuList } from 'material-ui/Menu'
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import Hidden from 'material-ui/Hidden';

import { mailFolderListItems, otherMailFolderListItems } from './tileData';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
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
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    overflow: 'scroll',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  toolBarRight: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    margin: 0,
    paddingLeft: 32,
    paddingRight: 8
  },
  avatar: {
    marginLeft: 24,
    marginRight: 24,
    width: 45,
    height: 45,
  },
  menuLink: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  }
});

class Navbar extends React.Component {
  state = {
    drawer: {open: false},
    menu:   {open: false, anchorEl: null}
  };

  handleDrawerOpen = () => {
    this.setState({ drawer: {open: true }});
  };

  handleDrawerClose = () => {
    this.setState({ drawer: {open: false }});
  };

  handleMenuClick = event => {
    let open = this.state.menu.open;
    this.setState({ menu: {open: !open, anchorEl: open ? null : event.currentTarget }});
  };

  handleMenuRequestClose = () => {
    this.setState({ menu: {open: false, anchorEl: null }});
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <Theme>
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar className={classNames(classes.appBar, this.state.drawer.open && classes.appBarShift)}>
              <Toolbar disableGutters={!this.state.drawer.open}>
                <IconButton
                  color="contrast"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, this.state.drawer.open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography type="title" color="inherit" noWrap>
                  Demo Application
                </Typography>
                <div className={classes.toolBarRight}>
                  <ClickAwayListener onClickAway={this.handleMenuRequestClose}>
                    <Manager>
                      <Target>
                        <Button
                          className={classes.button}
                          color="contrast"
                          aria-owns={this.state.menu.open ? 'user-list' : null}
                          aria-haspopup="true"
                          onClick={this.handleMenuClick}
                        >
                          <Hidden only="xs">
                            <Typography type="subheading" color="inherit" noWrap>
                              {this.props.current_user.email}
                            </Typography>
                          </Hidden>
                          <Avatar
                            alt={this.props.current_user.email}
                            src="/avatar-missing.jpg"
                            className={classes.avatar}
                          />
                        </Button>
                      </Target>
                      <Popper placement="bottom-end" eventsEnabled={this.state.menu.open}>
                        <Grow in={this.state.menu.open} id="user-list" style={{ transformOrigin: '0 0 0' }}>
                          <Paper>
                            <MenuList role="menu">
                              <MenuItem onClick={this.handleMenuRequestClose}>Profile</MenuItem>
                              <MenuItem onClick={this.handleMenuRequestClose}>My account</MenuItem>
                              <a rel="nofollow" data-method="delete" href="/users/sign_out" className={classes.menuLink}>
                                <MenuItem>Logout</MenuItem>
                              </a>
                            </MenuList>
                          </Paper>
                        </Grow>
                      </Popper>
                    </Manager>
                  </ClickAwayListener>
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              type="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !this.state.drawer.open && classes.drawerPaperClose),
              }}
              open={this.state.drawer.open}
            >
              <div className={classes.drawerInner}>
                <div className={classes.drawerHeader}>
                  <IconButton onClick={this.handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </div>
                <Divider />
                <List className={classes.list}>{mailFolderListItems}</List>
                <Divider />
                <List className={classes.list}>{otherMailFolderListItems}</List>
              </div>
            </Drawer>
            <main className={classes.content}>
              {this.props.children}
            </main>
          </div>
        </div>
      </Theme>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Navbar);
