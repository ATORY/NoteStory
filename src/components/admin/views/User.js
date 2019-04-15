import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import moment from 'moment-timezone';
import moment from 'moment';

import Loading from 'components/utils/Loading';
import * as api from 'webAdmin/restful';
import Layout from '../layouts';

import 'github-markdown-css';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 4)
  },
  filter: {
    padding: theme.spacing(2, 0)
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
    height: '100%'
  },
  heading: {
    // fontSize: theme.typography.pxToRem(15)
    fontSize: '1rem',
    fontWeight: 600
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20
  },
  details: {
    // alignItems: 'center'
  },
  column: {
    flexGrow: 1
    // flexBasis: '33.33%'
  },
  article: {
    maxHeight: '600px',
    overflowY: 'scroll',
    '& > .markdown-body': {
      padding: theme.spacing(0, 3, 0, 0)
    }
  },
  helper: {
    flexGrow: 0,
    minWidth: '350px',
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  publisher: {
    color: 'gray',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  avator: {
    margin: '0 10px',
    borderRadius: '50%',
    height: '100px',
    width: '100px',
    border: '2px solid #fff',
    display: 'inline-block',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }
}));

export default function User() {
  const [expandedId, setExpanded] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  // const [stories, setStories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const handleChange = id => (event, isExpanded) => {
    if (id === expandedId) setExpanded('');
    else setExpanded(id);
  };
  async function initData() {
    setLoading(true);
    try {
      const results = await api.userList();
      setUsers(results.list);
      console.log(results);
      // setTags(tag.tags);
      // setStories(story.stories);
      // setLabels(data.labels);
      // setTags(data.tags);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    initData();
  }, []);
  const classes = useStyles();
  return (
    <Layout title="用户管理">
      <div className={classes.root}>
        <div className={classes.filter}>filter and search</div>
        <div>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">time</TableCell>
                <TableCell align="right">email</TableCell>
                <TableCell align="right">nickname</TableCell>
                <TableCell align="right">avator</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell align="right">
                    {moment(item.createAt).format('YYYY-MM-DD HH:mm')}
                  </TableCell>
                  <TableCell align="right">{item.email}</TableCell>
                  <TableCell align="right">{item.nickname}</TableCell>
                  <TableCell align="right">
                    <span
                      className="bg-center"
                      style={{
                        backgroundImage: `url("${item.avator}")`,
                        width: '30px',
                        height: '30px'
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
