import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import Dashboard from 'components/admin/views/Dashboard';
import Tag from 'components/admin/views/Tag';
import Release from 'components/admin/views/Release';
import Story from 'components/admin/views/Story';
import Login from 'components/admin/views/Login';
import User from 'components/admin/views/User';
import NotFound from 'components/admin/views/NotFound';

import * as api from './restful';
import Loading from 'components/utils/Loading';

function PrivateRoute({ component: Component, path, ...rest }) {
  const AUTH_ING = 'authing';
  const AUTH_FAIL = 'authFail';
  const AUTH_SUCCESS = 'authSuccess';
  const [authStatus, setAuthStatus] = useState(AUTH_ING);
  // console.log(rest);
  useEffect(() => {
    api
      .auth()
      .then(() => {
        // console.log({ data });
        setAuthStatus(AUTH_SUCCESS);
      })
      .catch(err => {
        console.error(err);
        setAuthStatus(AUTH_FAIL);
      });
  }, [path]);
  // console.log('status', authStatus);
  if (authStatus === AUTH_ING) {
    return (
      <Route
        {...rest}
        render={props => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Loading {...props} />
          </div>
        )}
      />
    );
  }
  return (
    <Route
      {...rest}
      render={props =>
        authStatus === AUTH_SUCCESS ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.any,
  path: PropTypes.string
};

export default function Routes() {
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <PrivateRoute component={Dashboard} exact path="/dashboard" />
      <PrivateRoute component={Tag} exact path="/tags" />
      <PrivateRoute component={Release} exact path="/release" />
      <PrivateRoute component={Story} exact path="/stories" />
      <PrivateRoute component={User} exact path="/user" />
      <PrivateRoute component={NotFound} exact path="/not-found" />
      <Route component={Login} exact path="/login" />
      <Redirect to="/not-found" />
    </Switch>
  );
}
