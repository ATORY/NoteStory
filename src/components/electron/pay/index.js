import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';

import alipay from './alipay.jpeg';
import wechat from './wechat.jpeg';

const useStyles = makeStyles(theme => ({
  donateModal: {
    // background: '#fff'
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
    // top: '50%',
    // left: `${left}%`,
  },
  donateModalPaper: {
    position: 'absolute',
    // width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    marginTop: '-50px',
    outline: 'none'
  },
  pay: {
    display: 'inline-block',
    textAlign: 'center',
    width: '200px',
    height: '200px',
    margin: '15px'
  },
  payImg: {
    width: 'inherit'
  }
}));

export default function PayModal({ donateModalOpen, setDonateModalOpen }) {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="simple-modal-donate"
      aria-describedby="simple-modal-donate-description"
      open={donateModalOpen}
      onClose={() => {
        setDonateModalOpen(false);
      }}
      className={classes.donateModal}
    >
      <div className={classes.donateModalPaper}>
        <Typography variant="subtitle1" id="modal-title">
          支持 NoteStory
        </Typography>
        {/* <Typography variant="body2" id="simple-modal-description">
          </Typography> */}
        <div>
          <div className={classes.pay}>
            <img src={alipay} className={classes.payImg} />
            <span style={{ fontSize: '13px' }}>支付宝</span>
          </div>
          <div className={classes.pay}>
            <img src={wechat} className={classes.payImg} />
            <span style={{ fontSize: '13px' }}>微信</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', marginTop: '15px' }}>
          {/* <Button>鸣谢</Button> */}
        </div>
      </div>
    </Modal>
  );
}

PayModal.propTypes = {
  donateModalOpen: PropTypes.bool,
  setDonateModalOpen: PropTypes.func
};

PayModal.defaultProps = {
  donateModalOpen: false,
  setDonateModalOpen: () => {}
};
