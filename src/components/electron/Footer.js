import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
// import {
//   // ReactRelayContext,
//   createFragmentContainer,
//   graphql
// } from 'react-relay';
import { environment } from 'electron/App';
import SignIn from 'components/user/SignIn';
import SignUp from 'components/user/SignUp';
import InfoLittle from 'components/user/InfoLittle';
import {
  FEEDBACK,
  HELP,
  UPDATE_CHECK,
  REPLY,
  OPEN_EXTERNAL,
  OPEN_MODAL
} from 'cover/ipcChannel';

import { ElectronContext } from './state';
import PayModal from './pay';

export const footerHeight = 32;
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
    background: '#f9f9f9',
    borderTop: '1px solid #d3d3d3',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: `${footerHeight}px`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'gray'
  },
  popoverPaper: {
    transition:
      'opacity 320ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 213ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, top 100ms !important',
    padding: theme.spacing(0)
  },
  accountButton: {
    margin: theme.spacing(0),
    padding: theme.spacing(0),
    borderRadius: 0,
    boxShadow: 'none',
    // color: 'rgba(0, 0, 0, 0.54)',
    height: '100%',
    color: 'inherit',
    // color: '#086DD6',
    background: 'inherit'
  },
  rightIcon: {
    marginLeft: theme.spacing(0)
  },
  setting: {
    padding: theme.spacing(1),
    boxShadow: 'none',
    '-webkit-app-region': 'drag',
    'user-select': 'none',
    boxSizing: 'border-box'
  },
  accountFooter: {
    padding: theme.spacing(1, 2),
    borderTop: '1px solid #d3d3d3',
    display: 'flex',
    alignItems: 'center',
    color: 'gray'
  },
  accountHeader: {
    padding: theme.spacing(1, 2),
    borderBottom: '1px solid #d3d3d3',
    display: 'flex',
    alignItems: 'center',
    background: '#e3e3e3'
  },
  accountPopover: {
    width: '300px',
    height: '200px'
  },
  settingPopover: {
    width: '200px',
    height: '300px'
  },
  tintSpan: {
    fontSize: 'small',
    margin: theme.spacing(0, 1, 0, 1)
  },
  helpBtn: props => ({
    fontSize: 'small',
    color: props.color || 'gray',
    minWidth: '50px',
    height: '100%',
    padding: 0,
    borderRadius: 0
  })
}));

let popoverActions = '';
// eslint-disable-next-line no-unused-vars
export default function Footer({ user, loginSuccess, logoutSuccess }) {
  const classes = useStyles();
  const { saved, selectStory } = useContext(ElectronContext);
  const [anchorAccountEl, setAnchorAccountEl] = useState(null);
  const [loginView, setLoginView] = useState(true);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  // const [hasNewVersion, setHasNewVersion] = useState(false);
  const [hasMore, setHasMore] = useState({});
  const [configBtns, setConfigBtns] = useState([]);
  useEffect(() => {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.on(`${UPDATE_CHECK}-${REPLY}`, (event, config) => {
      setConfigBtns(config.configBtns || []);
      setHasMore(config.hasMore || {});
    });
    ipcRenderer.send(UPDATE_CHECK, {});
  }, []);
  useEffect(() => {
    updatePopover();
  }, [user, loginView]);

  const modals = {
    donate: () => setDonateModalOpen(true)
  };

  function configBtnAction(btnItem) {
    return () => {
      const { action, url, modal } = btnItem;
      if (action === OPEN_EXTERNAL) {
        const { shell } = window.require('electron');
        shell.openExternal(url);
        return;
      }
      if (action === OPEN_MODAL) {
        modals[modal]();
        return;
      }
    };
  }
  function updatePopover() {
    if (popoverActions) {
      popoverActions.updatePosition();
    }
  }

  function handleClick(event) {
    setAnchorAccountEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorAccountEl(null);
  }

  function SignInOrUp() {
    if (loginView)
      return (
        <SignIn
          environment={environment}
          loginSuccess={loginSuccess}
          changeToSignUp={() => {
            setLoginView(false);
          }}
        />
      );
    return (
      <SignUp
        environment={environment}
        registerSuccess={loginSuccess}
        changeToSignIn={() => {
          setLoginView(true);
        }}
      />
    );
  }

  const open = Boolean(anchorAccountEl);
  const id = open ? 'account-popover' : null;

  return (
    <footer className={classes.root}>
      <div
        style={{
          height: '100%'
        }}
      >
        <div
          style={{
            height: '100%'
          }}
        >
          <Button
            aria-describedby={id}
            onClick={handleClick}
            variant="contained"
            className={classes.accountButton}
          >
            <AccountCircleIcon
              className={classes.rightIcon}
              color={(user.id && 'primary') || 'inherit'}
            />
            账户
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorAccountEl}
            onClose={handleClose}
            classes={{
              paper: classes.popoverPaper
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            action={actions => (popoverActions = actions)}
          >
            <Typography
              variant="subtitle1"
              component="h2"
              className={classes.accountHeader}
            >
              账户
            </Typography>
            {/* <Typography className={classes.accountPopover}> */}
            {(user.id && (
              <InfoLittle user={user} logoutSuccess={logoutSuccess} />
            )) ||
              SignInOrUp()}
            {/* <SignUp /> */}
            {/* </Typography> */}
            <Typography variant="body2" className={classes.accountFooter}>
              v{process.env.NOTESTORY_APP_VERSION}
            </Typography>
          </Popover>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          userSelect: 'none',
          height: '100%',
          alignItems: 'center'
        }}
      >
        {configBtns.map(item => {
          // console.log(item);
          return (
            <Button
              key={item._id}
              className={classes.helpBtn}
              style={{ color: item.color }}
              onClick={configBtnAction(item)}
            >
              {item.name}
            </Button>
          );
        })}
        {/* {hasNewVersion && (
          <Button className={classes.helpBtn} style={{ color: '#3f51b5' }}>
            新版本 * ?process.env.REACT_APP_VERSION
          </Button>
        )} */}
        {/* <Button
          className={classes.helpBtn}
          onClick={() => {
            setDonateModalOpen(true);
          }}
        >
          捐助
        </Button> */}
        <Button
          className={classes.helpBtn}
          onClick={() => {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.send(HELP);
          }}
        >
          帮助
        </Button>
        <Button
          className={classes.helpBtn}
          onClick={() => {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.send(FEEDBACK);
          }}
        >
          反馈
        </Button>
        {hasMore.url && (
          <Button
            className={classes.helpBtn}
            onClick={configBtnAction(hasMore)}
          >
            更多
          </Button>
        )}
        {/* <a
          href={`${process.env.NOTESTORY_APP_SERVER_URI}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            height: 'inherit',
            textDecoration: 'none'
          }}
        >
          <Button className={classes.helpBtn}>更多</Button>
        </a> */}
        <Typography variant="body2" gutterBottom className={classes.tintSpan}>
          {saved
            ? `已保存 • ${moment(selectStory.lastUpdateTime).format(
                'YYYY-MM-DD HH:mm:ss'
              )}`
            : '保存中...'}
        </Typography>
      </div>
      <PayModal
        donateModalOpen={donateModalOpen}
        setDonateModalOpen={setDonateModalOpen}
      />
    </footer>
  );
}

Footer.propTypes = {
  user: PropTypes.object,
  loginSuccess: PropTypes.func,
  logoutSuccess: PropTypes.func
  // match: matchShape,
  // router: routerShape
  // relay: PropTypes.object.isRequired,
};

// eslint-disable-next-line no-unused-vars
function Setting() {
  const classes = useStyles();
  const [anchorSettingsEl, setAnchorSettingsEl] = React.useState(null);

  function handleSettingsClick(event) {
    setAnchorSettingsEl(event.currentTarget);
  }

  function handleSettingsClose() {
    setAnchorSettingsEl(null);
  }

  const settingsOpen = Boolean(anchorSettingsEl);
  const settingsId = settingsOpen ? 'settings-popover' : null;
  return (
    <div>
      <IconButton
        aria-describedby={settingsId}
        onClick={handleSettingsClick}
        className={classes.setting}
      >
        <SettingsIcon />
      </IconButton>
      <Popover
        id={settingsId}
        open={settingsOpen}
        anchorEl={anchorSettingsEl}
        onClose={handleSettingsClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Typography className={classes.settingPopover}>
          The content of the Popover.
        </Typography>
      </Popover>
    </div>
  );
}
