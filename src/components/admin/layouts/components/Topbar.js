/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';
import {
  Badge,
  IconButton,
  Popover,
  Toolbar,
  Typography
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  NotificationsOutlined as NotificationsIcon,
  Input as InputIcon
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.border}`,
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    height: '64px',
    zIndex: theme.zIndex.appBar
  },
  toolbar: {
    minHeight: 'auto',
    width: '100%'
  },
  title: {
    marginLeft: theme.spacing(1)
  },
  menuButton: {
    marginLeft: '-4px'
  },
  notificationsButton: {
    marginLeft: 'auto'
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

export default function Topbar({
  className,
  isSidebarOpen,
  onToggleSidebar,
  title
}) {
  // const [notificationsCount, setNotificationsCount] = useState(0);
  const classes = useStyles();
  const rootClassName = classNames(classes.root, className);
  return (
    <>
      <div className={rootClassName}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classes.menuButton}
            onClick={onToggleSidebar}
            variant="text"
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography className={classes.title} variant="h4">
            {title}
          </Typography>
          <IconButton
            className={classes.notificationsButton}
            // onClick={this.handleShowNotifications}
          >
            <Badge badgeContent={0} color="primary" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            // onClick={this.handleSignOut}
          >
            <InputIcon />
          </IconButton>
        </Toolbar>
      </div>
      {/* <Popover
        anchorEl={notificationsEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        onClose={this.handleCloseNotifications}
        open={showNotifications}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <NotificationList
          notifications={notifications}
          onSelect={this.handleCloseNotifications}
        />
      </Popover> */}
    </>
  );
}

Topbar.propTypes = {
  className: PropTypes.string,
  // classes: PropTypes.object.isRequired,
  // history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string
};
