import React, { useState } from 'react';
import Link from 'found/lib/Link';
import PropTypes from 'prop-types';
import { matchShape, routerShape } from 'found/lib/PropTypes';
import { withRouter } from 'found';
import {
  // ReactRelayContext,
  createFragmentContainer,
  fetchQuery,
  commitMutation,
  graphql
} from 'react-relay';

import { environment } from 'web/App';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { headerHeight } from 'components/utils/constants';
import SignIn from 'components/user/SignIn';
import SignUp from 'components/user/SignUp';
import logo from 'logo.png';

const useStyles = makeStyles(theme => ({
  header: {
    width: '100%',
    background: '#fff',
    zIndex: 100,
    position: 'fixed',
    height: `${headerHeight}px`,
    top: 0,
    borderBottom: `1px solid #d3d3d3`
  },
  fixedHeader: {
    maxWidth: '980px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 'inherit',
    alignItems: 'center',
    '& nav': {
      height: 'inherit',
      display: 'flex',
      alignItems: 'center',
      '& img': {
        [theme.breakpoints.up('sm')]: {
          display: 'none'
        }
      }
    }
  },
  userLink: {
    display: 'flex',
    alignItems: 'center',
    color: '#000',
    textDecoration: 'none',
    '&:hover': {
      '& .logout': {
        display: 'inline-block'
      }
      /* background: lightgrey; */
    },
    '& span.nickname': {
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    }
  },
  userImage: {
    width: '45px',
    height: '45px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '50%',
    marginRight: '5px'
  },
  rightContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  logout: {
    position: 'absolute',
    right: '-30px',
    color: 'gray',
    width: '30px',
    fontSize: '13px',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-block',
      position: 'relative',
      right: 0
    }
  },
  button: {
    margin: theme.spacing(1),
    color: '#43b5c5'
  },
  buttonLabel: {
    fontWeight: 'initial'
    // fontSize: 'initial'
  },
  input: {
    display: 'none'
  }
}));

// const StyledLogout = styled.span`
//   bottom: -18px;
//   border: 1px solid #d3d3d3;
//   height: 20px;
//   width: 50px;
//   border: 1px solid;
//   padding: 0;
//   background: #fff;
//   display: none;
//   color: gray;
//   font-size: small;
//   /* padding: 5px; */
//   cursor: pointer;
//   border: 1px solid #fff;
//   text-align: center;
//   position: absolute;
//   /* margin: 0; */
//   /* bottom: 0; */
//   right: 0px;
//   /* width: 40px; */
//   box-sizing: border-box;
//   border: 1px solid #d3d3d3;
//   &::after {
//     position: absolute;
//     content: ' ';
//     background: #fff;
//     border: 1px solid #d3d3d3;
//     border-right: none;
//     border-bottom: none;
//     width: 5px;
//     height: 5px;
//     top: -3px;
//     left: 8px;
//     transform: rotate(45deg);
//   }
// `;

const MODAL_SIGNIN = 'signin';
const MODAL_SIGNUP = 'signup';

const query = graphql`
  query Container_user_Query {
    user: auth {
      id
      nickname
      avator
    }
  }
`;
const logoutMutation = graphql`
  mutation Container_Mutation {
    token: userLogout
  }
`;

// eslint-disable-next-line no-unused-vars
function Container({ user = {}, children, match }) {
  // console.log(match);
  const [openModal, setOpenModal] = useState(false);
  const [modalStatus, setModalStatus] = useState(MODAL_SIGNIN);
  const [containerUser, setContainerUser] = useState(user);
  const classes = useStyles();

  const openModalHandler = status => () => {
    setOpenModal(true);
    setModalStatus(status);
  };
  const handleClose = () => {
    setOpenModal(false);
  };
  const fetchWithToken = () => {
    fetchQuery(environment, query)
      .then(data => {
        // console.log(data);
        if (data.user) {
          setContainerUser(data.user || {});
          setOpenModal(false);
        }
        // access the graphql response
      })
      .catch(err => {
        // console.log('fghjkl---', err.message);
        console.error(err);
      });
  };
  const logout = e => {
    e.stopPropagation();
    e.preventDefault();
    commitMutation(environment, {
      mutation: logoutMutation,
      onCompleted: (response, errors) => {
        if (errors) console.error(errors);
        localStorage.setItem('token', '');
        fetchWithToken();
        // console.log('Response received from server.', response, errors);
      },
      onError: err => console.error(err, '---')
    });
  };
  const { pathname } = match.location;
  if (pathname === '/center') {
    return <>{children}</>;
  }
  return (
    <>
      <header className={classes.header}>
        <div className={classes.fixedHeader}>
          <nav>
            <img
              src={logo}
              style={{ height: '40px', paddingRight: '10px' }}
              alt="logo"
            />
            {/** 分类： 上首页，上推荐，上精选。。。 */}
            <Link
              className={'nav-item'}
              exact
              to="/"
              activeClassName="selected"
            >
              首页
            </Link>
            <Link
              className={'nav-item'}
              exact
              to="/topic"
              activeClassName="selected"
            >
              专题
            </Link>
            {/* <StyledLink exact to="/explore" activeClassName="selected">
              推荐
            </StyledLink> */}
            {/* <StyledLink exact to="/explore" activeClassName="selected">
              精选
            </StyledLink> */}
            <Link
              className={'nav-item'}
              exact
              to="/all"
              activeClassName="selected"
            >
              全部
            </Link>
            {/* <Link
              className={'nav-item'}
              exact
              to="/all"
              activeClassName="selected"
            >
              专题
            </Link> */}
            {/* <StyledLink exact to="/explore" activeClassName="selected">
              遇见
            </StyledLink> */}
            {/* <StyledLink to="/test" activeClassName="selected">
              test
            </StyledLink> */}
          </nav>
          <div className={classes.rightContainer}>
            {(containerUser.id && (
              <>
                <Link className={classes.userLink} to="/center">
                  <div
                    className={classes.userImage}
                    style={{
                      backgroundImage: `url("${containerUser.avator}")`
                    }}
                  />
                  <span className="nickname" style={{ paddingRight: '5px' }}>
                    {containerUser.nickname}
                  </span>
                  <span className={classes.logout} onClick={logout}>
                    退出
                  </span>
                </Link>
              </>
            )) || (
              <>
                <Button
                  className={classes.button}
                  variant="outlined"
                  classes={{ label: classes.buttonLabel }}
                  onClick={openModalHandler(MODAL_SIGNIN)}
                >
                  登录
                </Button>
                <Button
                  className={classes.button}
                  variant="outlined"
                  classes={{ label: classes.buttonLabel }}
                  onClick={openModalHandler(MODAL_SIGNUP)}
                >
                  注册
                </Button>
              </>
            )}
          </div>
        </div>
        <LoginModal
          open={openModal}
          handleClose={handleClose}
          status={modalStatus}
          changeModalStatus={setModalStatus}
          fetchWithToken={fetchWithToken}
        />
      </header>
      {children}
    </>
  );
}

Container.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,
  match: matchShape,
  router: routerShape
  // relay: PropTypes.object.isRequired,
};

const RouterContainer = withRouter(Container);

export default createFragmentContainer(RouterContainer, {
  user: graphql`
    fragment Container_user on User {
      id
      avator
      nickname
    }
  `
});

const useLoginStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    position: 'absolute',
    // width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    marginTop: '-150px',
    outline: 'none'
  }
}));
function LoginModal({
  open,
  handleClose,
  status,
  changeModalStatus,
  fetchWithToken
}) {
  const classes = useLoginStyles();
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
      className={classes.modal}
    >
      {status === 'signin' ? (
        <div className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            登录
          </Typography>
          <SignIn
            environment={environment}
            loginSuccess={fetchWithToken}
            changeToSignUp={() => {
              changeModalStatus(MODAL_SIGNUP);
            }}
          />
          {/* <Typography variant="subtitle1" id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography> */}
        </div>
      ) : (
        <div className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            注册
          </Typography>
          <SignUp
            environment={environment}
            registerSuccess={fetchWithToken}
            changeToSignIn={() => {
              changeModalStatus(MODAL_SIGNIN);
            }}
          />
          {/* <Typography variant="subtitle1" id="simple-modal-description">
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography> */}
        </div>
      )}
    </Modal>
  );
}

LoginModal.propTypes = {
  status: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  fetchWithToken: PropTypes.func.isRequired,
  changeModalStatus: PropTypes.func.isRequired
};

LoginModal.defaultProps = {
  status: 'signin',
  open: false,
  handleClose: () => {}
};
