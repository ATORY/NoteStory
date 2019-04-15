/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import {
  mainMarginTop,
  mainMaxWidth,
  headerHeight,
  footHeight
} from 'components/utils/constants';

// eslint-disable-next-line no-unused-vars
export const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    minHeight: '100vh',
    marginBottom: `-${footHeight}px`,
    paddingBottom: `${footHeight + 10}px`,
    boxSizing: 'border-box',
    paddingTop: `${mainMarginTop - 6}px`,
    display: 'flex',
    flexDirection: `column`
  },
  banner: {
    height: '200px',
    display: 'flex',
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'gray',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    marginBottom: '60px'
  },
  info: {
    maxWidth: `${mainMaxWidth}px`,
    flexGrow: 1,
    margin: '0 auto',
    alignSelf: 'flex-end',
    marginBottom: '-60px',
    display: 'flex'
  },
  avator: {
    margin: '0 10px 0 20px',
    borderRadius: '50%',
    height: '120px',
    width: '120px',
    border: '2px solid #fff',
    display: 'inline-block',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  },
  intro: {
    height: '60px',
    flexGrow: 1,
    alignSelf: 'flex-end',
    display: 'flex',
    alignItems: 'center'
  },
  lists: {
    width: `${mainMaxWidth}px`,
    margin: '30px auto'
  }
}));

export default function MainContainer(props) {
  const classes = useStyles(props);
  return <main className={classes.root}>{props.children}</main>;
}
MainContainer.propTypes = {
  children: PropTypes.node
};

export function Banner(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.banner} style={props.style}>
      {props.children}
    </div>
  );
}
Banner.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node
};

export function Info(props) {
  const classes = useStyles(props);
  return <div className={classes.info}>{props.children}</div>;
}
Info.propTypes = {
  children: PropTypes.node
};

export function Avator(props) {
  const classes = useStyles(props);
  return (
    <span className={classes.avator} style={props.style}>
      {props.children}
    </span>
  );
}
Avator.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node
};

export function Intro(props) {
  const classes = useStyles(props);
  return <div className={classes.intro}>{props.children}</div>;
}
Intro.propTypes = {
  children: PropTypes.node
};

export function Lists(props) {
  const classes = useStyles(props);
  return <div className={classes.lists}>{props.children}</div>;
}
Lists.propTypes = {
  children: PropTypes.node
};
