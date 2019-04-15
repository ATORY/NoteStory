import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import {
  mainMarginTop,
  mainMaxWidth
  // headerHeight
} from 'components/utils/constants';

export const useStyles = makeStyles(theme => ({
  root: {
    wordBreak: 'break-all',
    margin: '0 auto',
    padding: `${mainMarginTop + 20}px 0`,
    maxWidth: `${mainMaxWidth - 300}px`,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5)
    }
  }
}));

export default function MainContainer(props) {
  const classes = useStyles(props);
  return (
    <main className={clsx(classes.root, props.className)}>
      {props.children}
    </main>
  );
}
MainContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

MainContainer.defaultProps = {
  className: ''
};
