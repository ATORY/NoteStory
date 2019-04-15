import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { footHeight, mainMaxWidth } from 'components/utils/constants';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  root: {
    height: `${footHeight}px`,
    color: '#d3d3d3',
    boxSizing: 'border-box',
    paddingTop: '30px',
    fontSize: '14px',
    '& > div': {
      margin: '0 auto',
      maxWidth: `${mainMaxWidth}px`
    }
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <div>京ICP备19029769号-1</div>
    </footer>
  );
}
