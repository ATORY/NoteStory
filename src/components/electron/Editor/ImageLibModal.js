/**
 * no use
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Done from '@material-ui/icons/Done';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { REPLY, OPEN_IMAGE_LIB } from 'cover/ipcChannel';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    position: 'absolute',
    width: '50%',
    maxHeight: '80%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(4),
    outline: 'none',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    backgroundColor: '#e3e3e3',
    padding: theme.spacing(2)
  },
  imageContainer: {
    flexGrow: 1,
    overflowY: 'scroll',
    flexWrap: 'wrap',
    alignItems: 'center',
    display: 'grid',
    padding: theme.spacing(1.5),
    justifyItems: 'center',
    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
    gridGap: '1rem'
  },
  imageItem: {
    position: 'relative',
    margin: 'auto',
    width: '130px',
    height: '130px',
    boxSizing: 'border-box',
    border: '1px solid #d3d3d3',
    display: 'inline-block',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain'
  },
  footer: {
    backgroundColor: '#e3e3e3',
    padding: theme.spacing(1, 2),
    textAlign: 'right'
  }
}));

export default function ImageLibModal({ selecedImage }) {
  // console.log(imageData);
  const [open, setOpen] = useState(false);
  const [selectImage, setSelectImage] = useState('');
  const [{ imagePath = '', images = [] }, setImageLibData] = useState({});

  useEffect(() => {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.on(`${OPEN_IMAGE_LIB}-${REPLY}`, (event, data) => {
      setImageLibData(data);
      setOpen(true);
      // console.log(data);
    });
  }, []);

  function handleClose() {
    setOpen(false);
  }

  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      aria-labelledby="image-lib-modal-title"
      aria-describedby="image-lib-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div style={{}} className={classes.paper}>
        <Typography variant="h6" id="modal-title" className={classes.title}>
          图库
        </Typography>
        <div className={classes.imageContainer}>
          {images.map(item => {
            const imageUrl = `file://${imagePath}/${item}`;
            return (
              <span
                key={item}
                className={classes.imageItem}
                style={{ backgroundImage: `url('${encodeURI(imageUrl)}')` }}
                onClick={() => setSelectImage(`${imageUrl}`)}
              >
                {selectImage === imageUrl && (
                  <Done
                    color="primary"
                    style={{
                      position: 'absolute',
                      right: 0
                    }}
                  />
                )}
              </span>
            );
          })}
        </div>
        <Typography variant="h6" id="modal-title" className={classes.footer}>
          <Button onClick={handleClose}>取消</Button>
          <Button
            onClick={() => {
              if (!selecedImage) return;
              setOpen(false);
              setSelectImage('');
              selecedImage(selectImage);
            }}
          >
            确定
          </Button>
        </Typography>
      </div>
    </Modal>
  );
}

ImageLibModal.propTypes = {
  open: PropTypes.bool,
  imageData: PropTypes.object,
  handleClose: PropTypes.func,
  selecedImage: PropTypes.func
};

ImageLibModal.defaultProp = {
  open: false,
  handleClose: () => {},
  selecedImage: () => {}
};
