import React, { useState, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
// import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
// import MenuItem from '@material-ui/core/MenuItem';
// import Visibility from '@material-ui/icons/Visibility';
import Edit from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Cancel from '@material-ui/icons/Cancel';
import Typography from '@material-ui/core/Typography';

// import { createFragmentContainer, graphql } from 'react-relay';
import { commitMutation, graphql } from 'react-relay';
// import { environment } from 'electron/App';
import { UserInfoContext } from './index';

export default function Info({ environment }) {
  // console.log('Info', userInfo);
  // const { userInfo, onSuccess } = this.context;
  return (
    <UserInfoContext.Consumer>
      {({ userInfo, onSuccess }) => (
        <>
          <BaseInfo
            {...userInfo}
            onSuccess={onSuccess}
            environment={environment}
          />
          <OtherInfo {...userInfo} />
        </>
      )}
    </UserInfoContext.Consumer>
  );
}
Info.contextType = UserInfoContext;

Info.propTypes = {
  environment: PropTypes.any.isRequired,
  userInfo: PropTypes.object,
  onSuccess: () => {}
};

// export default createFragmentContainer(Info, {
//   baseInfo: graphql`
//     fragment Info_baseInfo on User {
//       id
//       nickname
//     }
//   `
// });

const mutation = graphql`
  mutation Info_BaseIbfo_Mutation($token: Token!, $input: UserInfoInput) {
    userInfoUpdate(token: $token, input: $input)
  }
`;

export const updateUserInfo = (
  environment,
  { nickname = '', intro = '', banner = '', avator = '' },
  onCompleted = () => {},
  onError = err => console.error(err, '---')
) => {
  const variables = {
    token: localStorage.getItem('token'),
    input: {
      nickname,
      intro,
      banner,
      avator
    }
  };
  commitMutation(environment, {
    mutation,
    variables,
    onCompleted,
    onError
  });
};

function BaseInfo({ nickname, intro, onSuccess, environment }) {
  const nicknameRef = createRef();
  const introRef = createRef();
  const [_nickname, setNickname] = useState(nickname || '');
  const [introduction, setIntroduction] = useState(intro || '');
  const [nicknameEditable, setNicknameEditable] = useState(false);
  const [introEditable, setIntroEditable] = useState(false);
  useEffect(() => {
    if (nicknameEditable) nicknameRef.current.focus();
    if (introEditable) introRef.current.focus();
  }, [nicknameEditable, introEditable]);

  function mutationBaseInfo(e) {
    e.stopPropagation();
    e.preventDefault();
    updateUserInfo(
      environment,
      { nickname: _nickname, intro: introduction },
      (response, errors) => {
        onSuccess();
        console.log('Response received from server.', response, errors);
      },
      () => {}
    );
  }
  return (
    <div className="base-info">
      <Typography variant="h6" gutterBottom>
        基本信息
      </Typography>
      <div style={{ display: 'flex' }}>
        <FormControl>
          <InputLabel htmlFor="nickname">昵称</InputLabel>
          <Input
            inputRef={nicknameRef}
            id="nickname"
            type="text"
            disabled={!nicknameEditable}
            value={_nickname}
            onChange={e => setNickname(e.target.value)}
            onBlur={() => {
              setNicknameEditable(false);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  // aria-label="Toggle password visibility"
                  onClick={() => setNicknameEditable(!nicknameEditable)}
                >
                  {nicknameEditable ? <Cancel /> : <Edit />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl style={{ flexGrow: 1, marginLeft: '15px' }}>
          <InputLabel htmlFor="introduction">简介</InputLabel>
          <Input
            inputRef={introRef}
            id="introduction"
            type="text"
            disabled={!introEditable}
            value={introduction}
            onChange={e => setIntroduction(e.target.value)}
            onBlur={() => {
              setIntroEditable(false);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  // aria-label="Toggle password visibility"
                  onClick={() => setIntroEditable(!introEditable)}
                >
                  {introEditable ? <Cancel /> : <Edit />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div
        style={{
          paddingTop: '15px',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button style={{ padding: 0 }} type="submit" onClick={mutationBaseInfo}>
          保存更改
        </Button>
      </div>
      {/* <TextField id="input-with-icon-grid" label="昵称" /> */}
      {/* <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            昵称
          </Grid>
          <Grid item>
            
          </Grid>
        </Grid> */}
    </div>
  );
}

BaseInfo.propTypes = {
  environment: PropTypes.any.isRequired,
  nickname: PropTypes.string,
  intro: PropTypes.string,
  onSuccess: PropTypes.func
};

BaseInfo.defaultProps = {
  onSuccess: () => {}
};

function OtherInfo() {
  return (
    <div className="other-info">
      <Typography variant="h6">其它资料</Typography>
    </div>
  );
}
