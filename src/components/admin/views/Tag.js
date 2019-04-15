import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
// import MenuItem from '@material-ui/core/MenuItem';
// import Visibility from '@material-ui/icons/Visibility';
// import Edit from '@material-ui/icons/Edit';
// import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
// import Cancel from '@material-ui/icons/Cancel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import * as api from 'webAdmin/restful';
import Loading from 'components/utils/Loading';
import Layout from '../layouts';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  loadingModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loading: {
    marginTop: '-20%'
  },
  item: {
    backgroundColor: '#fff',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    height: '100%'
  },
  chip: {
    margin: theme.spacing(1)
  },
  formControl: {
    display: 'inline-block',
    margin: theme.spacing(1)
  }
}));

export default function Tag() {
  const [loading, setLoading] = useState(false);
  const [labels, setLabels] = useState([]);
  const [tags, setTags] = useState([]);
  async function initData() {
    setLoading(true);
    try {
      const data = await api.tag();
      setLabels(data.labels);
      setTags(data.tags);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  const submitForm = tagId => async e => {
    e.stopPropagation();
    e.preventDefault();

    const input = e.target.querySelector('input[name="tag"]');
    const tag = input && input.value.trim();
    // console.log({ tag });
    if (!tag && !tagId) return alert('kone de');
    const exist = tags.find(item => item.name === tag);
    if (exist) return alert('exist');
    setLoading(true);
    if (!tagId) {
      try {
        const data = await api.tagAdd(tag);
        data.name = tag;
        setTags([data, ...tags]);
        input.value = '';
      } catch (error) {
        console.log(error);
      }
    } else if (tag) {
      try {
        await api.tagUpdate(tagId, tag);
        const exist = tags.find(item => item._id === tagId);
        exist.name = tag;
        setTags([...tags]);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await api.tagDel(tagId);
        const existIndex = tags.findIndex(item => item._id === tagId);
        setTags([...tags.slice(0, existIndex), ...tags.slice(existIndex + 1)]);
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, []);
  const classes = useStyles();
  return (
    <Layout title="标签管理">
      <div className={classes.root}>
        <div className={classes.item}>
          <Typography variant="h5" gutterBottom>
            参考
          </Typography>
          {labels.map(label => (
            <Chip
              key={label}
              label={label}
              color="primary"
              className={classes.chip}
            />
          ))}
        </div>
        <div className={classes.item}>
          <Typography variant="h5">标签</Typography>
          <div>
            <div>
              <form
                className={classnames('commentForm', classes.formControl)}
                onSubmit={submitForm()}
              >
                <FormControl>
                  <InputLabel>New Add</InputLabel>
                  <Input
                    // inputRef={nicknameRef}
                    name="tag"
                    type="text"
                    // disabled={!nicknameEditable}
                    // value={_nickname}
                    // onChange={e => setNickname(e.target.value)}
                    onBlur={() => {
                      // setNicknameEditable(false);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <Button label="Submit" type="submit">
                          保存
                        </Button>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </form>
            </div>
            {tags.map(({ _id, name }) => (
              <form
                key={_id}
                className={classnames('commentForm', classes.formControl)}
                onSubmit={submitForm(_id)}
              >
                <Input
                  name="tag"
                  type="text"
                  defaultValue={name}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button label="Submit" type="submit">
                        修改
                      </Button>
                    </InputAdornment>
                  }
                />
              </form>
            ))}
          </div>
        </div>
      </div>
      <Modal open={loading} className={classes.loadingModal}>
        <div className={classes.loading}>
          <Loading width="100px" height="100px" type="spin" />
          <p style={{ color: '#fff' }}>加载数据中。。。</p>
        </div>
      </Modal>
    </Layout>
  );
}
