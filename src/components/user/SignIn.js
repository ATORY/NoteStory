import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
import validator from 'validator';

import {
  fetchQuery,
  // createFragmentContainer,
  // createPaginationContainer,
  graphql
} from 'react-relay';
// import { fetchQuery, graphql } from 'relay-runtime';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '300px', // Fix IE 11 issue.
    margin: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(2, 0),
    boxShadow: 'none'
  }
}));

const query = graphql`
  query SignIn_Query($input: UserInput) {
    token: userLogin(input: $input)
  }
`;

export default function SignIn({ changeToSignUp, loginSuccess, environment }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [errMessage, setErrMessage] = useState('');
  const classes = useStyles();

  function validForm() {
    let valid = true;
    if (!validator.isEmail(email)) {
      setEmailValid(false);
      valid = false;
    }
    if (!validator.isLength(password, { min: 6, max: 15 })) {
      setPasswordValid(false);
      valid = false;
    }
    return valid;
  }

  return (
    <form
      className={classes.form}
      onSubmit={e => {
        e.stopPropagation();
        e.preventDefault();
        if (!validForm()) return;
        const variables = {
          input: {
            email,
            password
          }
        };
        // console.log('variables', variables);
        fetchQuery(environment, query, variables)
          .then(data => {
            if (data.token) {
              localStorage.setItem('token', data.token);
              loginSuccess();
            }
            // access the graphql response
          })
          .catch(err => {
            // console.log('fghjkl---', err.message);
            console.error(err);
            setErrMessage(err.message);
          });
        // loginAction({ email, password });
      }}
    >
      <TextField
        error={!emailValid}
        helperText={emailValid ? '' : '请输入合法的邮箱'}
        value={email}
        onChange={e => {
          setEmail(e.target.value);
          setEmailValid(true);
          setErrMessage('');
        }}
        variant="outlined"
        margin="dense"
        required
        fullWidth
        id="email"
        label="邮箱"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        error={!passwordValid}
        helperText={passwordValid ? '' : '密码应在6～15位之间'}
        value={password}
        onChange={e => {
          setPassword(e.target.value);
          setPasswordValid(true);
          setErrMessage('');
        }}
        variant="outlined"
        margin="dense"
        required
        fullWidth
        name="password"
        label="密码"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      {errMessage && (
        <span style={{ color: 'red', fontSize: 'small' }}>{errMessage}</span>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        登录
      </Button>
      <Grid container>
        <Grid item xs>
          <Link variant="body2">忘记密码</Link>
        </Grid>
        <Grid item>
          <Link
            variant="body2"
            onClick={() => {
              changeToSignUp();
            }}
          >
            注册
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

SignIn.propTypes = {
  changeToSignUp: PropTypes.func,
  loginSuccess: PropTypes.func,
  environment: PropTypes.any.isRequired
};

SignIn.defaultProps = {
  changeToSignUp: () => {
    console.log('SignIn default changeToSignUp func');
  },
  loginSuccess: () => {
    console.log('SignIn default loginSuccess func');
  }
};
