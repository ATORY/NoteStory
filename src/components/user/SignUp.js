import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import validator from 'validator';
import { commitMutation, graphql } from 'react-relay';

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
    margin: theme.spacing(3, 0, 2),
    boxShadow: 'none'
  }
}));

const mutation = graphql`
  mutation SignUp_Mutation($input: UserInput!) {
    token: userRegister(input: $input)
  }
`;

export default function SignUp({
  changeToSignIn,
  registerSuccess,
  environment
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRe, setPasswordRe] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
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
        if (password !== passwordRe) {
          setErrMessage('两次密码不一样');
          return;
        }
        const variables = {
          input: {
            email,
            password,
            passwordRe
          }
        };
        commitMutation(environment, {
          mutation,
          variables,
          onCompleted: (response, errors) => {
            console.log('Response received from server.', response, errors);
            if (response.token) {
              localStorage.setItem('token', response.token);
              registerSuccess();
            }
          },
          onError: err => console.error(err, '---')
        });
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
      <TextField
        value={passwordRe}
        onChange={e => {
          setPasswordRe(e.target.value);
          setErrMessage('');
        }}
        variant="outlined"
        margin="dense"
        required
        fullWidth
        name="passwordRe"
        label="重复密码"
        type="password"
        id="passwordRe"
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
        注册
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Link
            variant="body2"
            onClick={() => {
              changeToSignIn();
            }}
          >
            登录
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

SignUp.propTypes = {
  changeToSignIn: PropTypes.func,
  registerSuccess: PropTypes.func,
  environment: PropTypes.any.isRequired
};

SignUp.defaultProps = {
  changeToSignIn: () => {},
  registerSuccess: () => {}
};
