import React from 'react';
import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import {
  mainMarginTop,
  mainMaxWidth,
  footHeight
} from 'components/utils/constants';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    minHeight: '100vh',
    marginBottom: `-${footHeight}px`,
    paddingBottom: `${footHeight + 10}px`,
    boxSizing: 'border-box',
    paddingTop: `${mainMarginTop}px`,
    maxWidth: `${mainMaxWidth}px`,
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(0.5),
      paddingRight: theme.spacing(0.5)
    }
  },
  articleCell: {
    maxWidth: '700px',
    flexGrow: 1,
    paddingRight: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      padding: 0,
      boxSizing: 'border-box'
    }
  },
  asideContainer: {
    width: '240px',
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  asideFixedItem: {
    width: 'inherit',
    position: 'fixed'
  }
}));

export default function Main(props) {
  // const { classes, children } = props;
  const classes = useStyles(props);
  return <main className={classes.root}>{props.children}</main>;
}

Main.propTypes = {
  children: PropTypes.node.isRequired
};

export function ArticleCell(props) {
  const classes = useStyles(props);
  return <article className={classes.articleCell}>{props.children}</article>;
}
ArticleCell.propTypes = {
  children: PropTypes.node.isRequired
};

export function AsideContainer(props) {
  const classes = useStyles(props);
  return <aside className={classes.asideContainer}>{props.children}</aside>;
}
AsideContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export function AsideFixedItem(props) {
  const classes = useStyles(props);
  return <aside className={classes.asideFixedItem}>{props.children}</aside>;
}
AsideFixedItem.propTypes = {
  children: PropTypes.node.isRequired
};

// export default withStyles(styles)(Main);
// export const ArticleCell = withStyles(styles)(_ArticleCell);
// export const AsideContaier = withStyles(styles);
