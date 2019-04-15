import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';
import { Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  company: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5)
  }
}));

export default function Footer({ className }) {
  const classes = useStyles();
  const rootClassName = classNames(classes.root, className);
  return (
    <div className={rootClassName}>
      <Divider />
      <Typography className={classes.company} variant="body1">
        &copy; Devias Io. 2019
      </Typography>
      <Typography variant="caption">
        Created with love for the environment. By designers and developers who
        love to work together in offices!
      </Typography>
    </div>
  );
}

Footer.propTypes = {
  className: PropTypes.string
};
