/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import {
  // Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
  // ListSubheader,
  // Typography
} from '@material-ui/core';
import {
  DashboardOutlined as DashboardIcon,
  PeopleOutlined as PeopleIcon,
  LocalOffer as TagIcon,
  Note as NoteIcon,
  ShoppingBasketOutlined as ShoppingBasketIcon,
  LockOpenOutlined as LockOpenIcon,
  TextFields as TextFieldsIcon,
  ImageOutlined as ImageIcon,
  // InfoOutlined as InfoIcon,
  AccountBoxOutlined as AccountBoxIcon,
  SettingsOutlined as SettingsIcon
} from '@material-ui/icons';

import logo from 'logo.png';

const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: 'border-box',
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
    // paddingLeft: theme.spacing(0),
    // paddingRight: theme.spacing(1)
  },
  logoWrapper: {
    display: 'flex',
    // justifyContent: 'center',
    padding: theme.spacing(1),
    alignItems: 'center',
    height: '63px',
    flexShrink: 0,
    borderBottom: '1px solid #d3d3d3'
  },
  logoLink: {
    fontSize: 0
  },
  logoImage: {
    cursor: 'pointer',
    width: '50px'
  },
  logoDivider: {
    marginBottom: theme.spacing(2)
  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: '100px',
    height: '100px'
  },
  nameText: {
    marginTop: theme.spacing(1) * 2
  },
  bioText: {},
  profileDivider: {
    marginBottom: theme.spacing(1) * 2,
    marginTop: theme.spacing(1) * 2
  },
  list: {
    overflowY: 'scroll',
    flexGrow: 1,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  listSubheader: {
    color: theme.palette.text.secondary
  },
  listItem: {
    textDecoration: 'none',
    display: 'block',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      borderLeft: `4px solid ${theme.palette.primary.main}`,
      borderRadius: '4px',
      '& $listItemIcon': {
        color: theme.palette.primary.main,
        marginLeft: '-4px'
      }
    },
    '& + &': {
      marginTop: theme.spacing(1)
    }
  },
  activeListItem: {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    borderRadius: '4px',
    backgroundColor: theme.palette.primary.light,
    '& $listItemText': {
      color: theme.palette.text.primary
    },
    '& $listItemIcon': {
      color: theme.palette.primary.main,
      marginLeft: '-4px'
    }
  },
  listItemIcon: {
    marginRight: 0
  },
  listItemText: {
    fontWeight: 500,
    color: theme.palette.text.secondary
  },
  listDivider: {
    marginBottom: theme.spacing(1) * 2,
    marginTop: theme.spacing(1) * 2
  },
  footer: {
    paddingLeft: theme.spacing(1),
    borderTop: '1px solid #d3d3d3',
    color: 'gray'
  }
}));

export default function Sidebar({ className }) {
  const classes = useStyles();

  const rootClassName = classNames(classes.root, className);
  return (
    <nav className={rootClassName}>
      <div className={classes.logoWrapper}>
        <Link className={classes.logoLink} to="/">
          <img alt="logo" className={classes.logoImage} src={logo} />
        </Link>
        <h3>后台管理</h3>
      </div>
      <List component="div" disablePadding className={classes.list}>
        <NavLink
          to="/dashboard"
          activeClassName={classes.activeListItem}
          className={classes.listItem}
        >
          <ListItem>
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Dashboard"
            />
          </ListItem>
        </NavLink>
        <NavLink
          to="/tags"
          activeClassName={classes.activeListItem}
          className={classes.listItem}
        >
          <ListItem>
            <ListItemIcon className={classes.listItemIcon}>
              <TagIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="标签管理"
            />
          </ListItem>
        </NavLink>
        <NavLink
          to="/stories"
          activeClassName={classes.activeListItem}
          className={classes.listItem}
        >
          <ListItem>
            <ListItemIcon className={classes.listItemIcon}>
              <NoteIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="文章管理"
            />
          </ListItem>
        </NavLink>
        <NavLink
          to="/release"
          activeClassName={classes.activeListItem}
          className={classes.listItem}
        >
          <ListItem>
            <ListItemIcon className={classes.listItemIcon}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Release 管理"
            />
          </ListItem>
        </NavLink>
        <NavLink
          to="/user"
          activeClassName={classes.activeListItem}
          className={classes.listItem}
        >
          <ListItem>
            <ListItemIcon className={classes.listItemIcon}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="用户管理"
            />
          </ListItem>
        </NavLink>
        {}
      </List>
      <div className={classes.footer}>
        {`version: ${process.env.REACT_APP_WEB_ADMIN_VERSION}`}
      </div>
    </nav>
  );
}

Sidebar.propTypes = {
  className: PropTypes.string
};
