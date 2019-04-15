import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  loading: {
    padding: theme.spacing(0),
    display: 'inline-block'
  },
  button: {
    margin: theme.spacing(1)
  },
  label: {
    fontWeight: 'initial',
    fontSize: '13px'
    // display: 'none'
  }
}));

const Loading = ({ height = '20%', width = '20%', type = 'bars' }) => {
  const classes = useStyles();
  return (
    <ReactLoading
      className={classes.loading}
      type={type}
      color={'rgb(61, 187, 191)'}
      height={height}
      width={width}
    />
  );
};
Loading.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  type: PropTypes.string
};

export default Loading;

export function LoadingMoreDiv({ hasMore, loadMore, loading }) {
  const classes = useStyles();
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '10px'
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <Button
          style={{
            margin: '16px',
            fontWeight: 200
          }}
          disabled={!hasMore}
          className={classes.button}
          variant="outlined"
          classes={{ label: classes.label }}
          onClick={loadMore}
        >
          {hasMore ? '加载更多' : '没有了 .>_<.'}
        </Button>
      )}
    </div>
  );
}

LoadingMoreDiv.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};
