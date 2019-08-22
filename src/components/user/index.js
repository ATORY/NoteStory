/* eslint-disable relay/unused-fields */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Link from 'found/lib/Link';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Close from '@material-ui/icons/Close';

// import { RedirectException } from 'found';
import { createFragmentContainer, graphql } from 'react-relay';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from 'components/utils/SnackbarContentWrapper';
import headersGen from 'cover/headersGen';
import './style/index.css';

import { updateUserInfo } from './Info';
export { default as UserInfo } from './Info';
export { default as UserPublish } from './Publish';
export { default as UserFollowed } from './Followed';
export { default as UserTopics } from './Topics';

export const UserInfoContext = React.createContext({});

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
  button: {
    borderRadius: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    // backgroundColor: 'rgba(0, 0, 0, 0.34)',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.54)'
    }
  },
  input: {
    display: 'none'
  }
}));

// export default
function index({ userInfo, children, environment }) {
  const [successOpen, setSuccessOpen] = useState(false);
  const [avator, setAvator] = useState(userInfo.avator || '');
  const [banner, setBanner] = useState(userInfo.banner || '');
  function successHandler() {
    setSuccessOpen(true);
  }
  function handleClose() {
    setSuccessOpen(false);
  }
  const uploadFile = ({ type }) => e => {
    if (e.target.value) {
      const ext = '.' + e.target.value.split('.').pop();
      const file = e.target.files[0];
      // console.log(file);
      const reader = new FileReader();
      reader.onload = function(evt) {
        const headers = headersGen();
        headers['Content-Type'] = 'application/octet-stream';
        fetch(
          window.isElectron
            ? `${process.env.NOTESTORY_APP_SERVER_URI}/upload/image?ext=${ext}`
            : `/upload/image?ext=${ext}`,
          {
            method: 'PUT',
            headers,
            body: evt.target.result
          }
        )
          .then(response => response.json())
          .then(data => {
            // console.log(data);
            const input = {};
            input[type] = data.uri;
            updateUserInfo(
              environment,
              input,
              (response, errors) => {
                successHandler();
                if (type === 'avator') setAvator(data.uri);
                if (type === 'banner') setBanner(data.uri);
                console.log('Response received from server.', response, errors);
              },
              () => {}
            );
          })
          .catch(err => {
            console.error(err);
          });
        // console.log(evt.target.result);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const classes = useStyles();
  // console.log(userInfo);
  return (
    <div className="user-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{'个人中心'}</title>
      </Helmet>
      <div
        className="user-banner"
        style={{
          backgroundImage: `url("${banner}")`
        }}
      >
        <div
          className="user-avator"
          style={{
            backgroundImage: `url("${avator}")`
          }}
        >
          <div className="user-avator-editor">
            <input
              accept=".png, .jpg, .jpeg" // .png, .jpg, .jpeg, .gif
              className={classes.input}
              id="user-avator"
              type="file"
              onChange={uploadFile({ type: 'avator' })}
            />
            <label htmlFor="user-avator">
              <IconButton
                color="inherit"
                className={classes.button}
                aria-label="Upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
        </div>
        <div className="back-index">
          <Link to="/">
            <IconButton className={classes.button}>
              <Close />
            </IconButton>
          </Link>
        </div>
        <div className="change-bg-image">
          <input
            accept="image/*" // .png, .jpg, .jpeg, .gif
            className={classes.input}
            id="user-baner"
            type="file"
            onChange={uploadFile({ type: 'banner' })}
          />
          <label htmlFor="user-baner">
            <Button
              className={classes.button}
              color="inherit"
              aria-label="Upload picture"
              component="span"
            >
              背景图片
            </Button>
          </label>
        </div>
      </div>
      <div className="user-main">
        <nav className="user-nav">
          <Link activeClassName="active" exact to={`/center`}>
            我的资料
          </Link>
          <Link activeClassName="active" to={`/center/stories`}>
            我的发布
          </Link>
          {window.isElectron !== true && (
            <Link activeClassName="active" to={`/center/topics`}>
              我的专题
            </Link>
          )}
          <Link activeClassName="active" to={`/center/followed`}>
            我的关注
          </Link>
        </nav>
        <div className="user-main-info">
          <UserInfoContext.Provider
            value={{ userInfo, onSuccess: successHandler }}
          >
            {children}
          </UserInfoContext.Provider>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={successOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        // onClose={handleClose}
      >
        <SnackbarContentWrapper
          // onClose={handleClose}
          variant="success"
          message="修改成功!"
        />
      </Snackbar>
    </div>
  );
}

index.propTypes = {
  environment: PropTypes.any.isRequired,
  children: PropTypes.node,
  match: PropTypes.object,
  userInfo: PropTypes.object
};

export default createFragmentContainer(index, {
  userInfo: graphql`
    fragment user_userInfo on User {
      id
      avator
      banner
      intro
      nickname
    }
  `
});
