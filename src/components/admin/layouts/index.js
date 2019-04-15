import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles, withWidth } from '@material-ui/core';
import { Drawer } from '@material-ui/core';

import { Sidebar, Topbar } from './components';

const useStyles = makeStyles(theme => ({
  topbar: {
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    right: 'auto',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  topbarShift: {
    marginLeft: '271px',
    width: 'calc(-271px + 100vw)'
  },
  drawerPaper: {
    zIndex: 1200,
    width: '271px'
  },
  sidebar: {
    width: '270px'
  },
  content: {
    marginTop: '64px',
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    marginLeft: '270px'
  }
}));

function index({ children, title }) {
  const [isOpen, setOpen] = useState(true);

  function handleClose() {
    setOpen(false);
  }

  function handleToggleOpen() {
    setOpen(!isOpen);
  }

  const shiftTopbar = isOpen;
  const shiftContent = isOpen;
  const classes = useStyles();
  return (
    <>
      <Topbar
        className={classNames(classes.topbar, {
          [classes.topbarShift]: shiftTopbar
        })}
        isSidebarOpen={isOpen}
        onToggleSidebar={handleToggleOpen}
        title={title}
      />
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        onClose={handleClose}
        open={isOpen}
        variant={'persistent'}
      >
        <Sidebar className={classes.sidebar} />
      </Drawer>
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: shiftContent
        })}
      >
        {children}
        {/* <Footer /> */}
      </main>
    </>
  );
}

index.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};

export default withWidth()(index);
