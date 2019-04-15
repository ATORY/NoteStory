import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { commitMutation, graphql } from 'react-relay';
import Link from 'found/lib/Link';

import moment from 'moment';
import { environment } from 'electron/App';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from 'components/utils/SnackbarContentWrapper';
import {
  INIT,
  IMPORT_DATA_FROM_LOCAL,
  EXPORT_DATA_TO_LOCAL,
  REPLY
} from 'cover/ipcChannel';

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '300px', // Fix IE 11 issue.
    margin: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  backData: {
    margin: theme.spacing(2, 2, 3, 2)
  },
  subtitle: {
    borderBottom: '1px solid #d3d3d3',
    marginBottom: theme.spacing(0.5)
  }
}));

const mutation = graphql`
  mutation InfoLittle_Mutation {
    token: userLogout
  }
`;
export default function InfoLittle({ user, logoutSuccess }) {
  const classes = useStyles();
  const [successImport, setSuccessImport] = useState(false);
  return (
    <div>
      <div className={classes.form}>
        <Link
          to="/center"
          style={{
            textDecoration: 'none',
            // color: 'black',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <span
            style={{
              backgroundImage: `url("${user.avator}")`,
              display: 'inline-block',
              height: '50px',
              width: '50px',
              backgroundColor: 'gray',
              marginRight: '10px',
              borderRadius: '50%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }}
          />
          <span>{user.nickname}</span>
        </Link>
        <Button
          style={{ color: 'darkgray' }}
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            commitMutation(environment, {
              mutation,
              onCompleted: (response, errors) => {
                if (errors) console.error(errors);
                localStorage.setItem('token', '');
                logoutSuccess();
                // console.log('Response received from server.', response, errors);
              },
              onError: err => console.error(err, '---')
            });
          }}
        >
          退出
        </Button>
      </div>
      <div className={classes.backData}>
        <Typography
          className={classes.subtitle}
          variant="subtitle1"
          component="h6"
        >
          数据备份
        </Typography>
        <div>
          <Button
            onClick={() => {
              const { ipcRenderer, remote } = window.require('electron');
              ipcRenderer.on(
                `${EXPORT_DATA_TO_LOCAL}-${REPLY}`,
                (event, data) => {
                  setSuccessImport(data.success);
                  // dispatch({ type: 'new', data: { category: selectNavId } });
                  console.log(`${EXPORT_DATA_TO_LOCAL}-${REPLY}`, data);
                }
              );
              // // console.log('save-md-dialog');
              // ipcRenderer.send('save-md-dialog');
              // console.log('saveADMD');
              const { dialog } = remote;
              const time = moment().format('YYYY-MM-DD HH');
              const options = {
                title: '导出备份',
                defaultPath: `notestory.${time}.ns`
                // filters: [{ name: 'mdFile', extensions: ['md'] }]
              };
              // eslint-disable-next-line no-unused-vars
              dialog.showSaveDialog(options, (filename, bookmark) => {
                // console.log({ filename });
                if (!filename) return;
                ipcRenderer.send(EXPORT_DATA_TO_LOCAL, {
                  filename,
                  password: ''
                });
              });
            }}
          >
            备份到本地
          </Button>
          <Button
            onClick={() => {
              const { ipcRenderer, remote } = window.require('electron');
              ipcRenderer.on(
                `${IMPORT_DATA_FROM_LOCAL}-${REPLY}`,
                (event, data) => {
                  // dispatch({ type: 'new', data: { category: selectNavId } });
                  // console.log(`${IMPORT_DATA_FROM_LOCAL}-${REPLY}`, data);
                  // setTimeout(() => {
                  if (data.success) ipcRenderer.send(INIT, 'ALL');
                  // }, 2000);
                }
              );
              // // console.log('save-md-dialog');
              // ipcRenderer.send('save-md-dialog');
              // console.log('saveADMD');
              const { dialog } = remote;
              const time = moment().format('YYYY-DD-MM HH');
              const options = {
                title: '恢复数据',
                defaultPath: `notestory.${time}.ns`,
                filters: [{ name: 'NoteStory', extensions: ['ns'] }]
              };
              // eslint-disable-next-line no-unused-vars
              dialog.showOpenDialog(options, ([filename]) => {
                // console.log({ filename });
                if (!filename) return;
                ipcRenderer.send(IMPORT_DATA_FROM_LOCAL, {
                  filename,
                  password: ''
                });
              });
            }}
          >
            从本地备份恢复
          </Button>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={successImport}
        autoHideDuration={2000}
        onClose={() => {
          setSuccessImport(false);
        }}
        style={{
          left: 'auto'
        }}
        // onClose={handleClose}
      >
        <SnackbarContentWrapper
          // onClose={handleClose}
          variant="success"
          message="备份成功!"
        />
      </Snackbar>
    </div>
  );
}

InfoLittle.propTypes = {
  user: PropTypes.object,
  logoutSuccess: PropTypes.func
  // match: matchShape,
  // router: routerShape
  // relay: PropTypes.object.isRequired,
};

InfoLittle.defaultProps = {
  logoutSuccess: () => {}
};
