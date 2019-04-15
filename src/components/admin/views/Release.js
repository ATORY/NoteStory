import React, { useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
// import MenuItem from '@material-ui/core/MenuItem';
// import Visibility from '@material-ui/icons/Visibility';
// import Edit from '@material-ui/icons/Edit';
// import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
// import Cancel from '@material-ui/icons/Cancel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import compareVersions from 'compare-versions';

import * as api from 'webAdmin/restful';

import Layout from '../layouts';

const momentFormat = 'YYYY-MM-DD HH:mm';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

export default function Release() {
  // const [loading, setLoading] = useState(false);
  const [releaseLists, setReleaseLists] = useState([]);
  const [releaseCurr, setReleaseCurr] = useState([]);
  async function initData() {
    // setLoading(true);
    try {
      const data = await api.releaseList();
      // console.log(data.lists.sort((a, b) => a.version < b.version));
      setReleaseLists(
        data.lists.sort((a, b) => compareVersions(b.version, a.version))
      );
      setReleaseCurr(data.curr);
    } catch (error) {
      console.error(error);
    }
    // setLoading(false);
  }

  async function submitForm(e) {
    e.stopPropagation();
    e.preventDefault();
    const platformDom = e.target.querySelector('input[name="platform"]');
    const platform = platformDom && platformDom.value.trim();
    const versionDom = e.target.querySelector('input[name="version"]');
    const version = versionDom && versionDom.value.trim();
    const releaseDom = e.target.querySelector('input[name="release"]');
    const release = releaseDom && releaseDom.value.trim();
    console.log({
      platform,
      version,
      release
    });
    if (!platform || !version || !release) {
      alert('err info');
      return;
    }
    await api.releaseAdd({
      platform,
      version,
      release
    });
    await initData();
    platformDom.value = '';
    versionDom.value = '';
    releaseDom.value = '';
  }

  const delRelease = id => async e => {
    e.stopPropagation();
    e.preventDefault();
    await api.releaseDel(id);
    await initData();
  };

  useEffect(() => {
    initData();
  }, []);
  const classes = useStyles();
  return (
    <Layout title="Release">
      <div className={classes.root}>
        <div>
          <Typography variant="h5" gutterBottom>
            新增
          </Typography>
          <form onSubmit={submitForm}>
            <FormControl>
              <InputLabel>platform</InputLabel>
              <Input name="platform" type="text" />
            </FormControl>
            <br />
            <FormControl>
              <InputLabel>version</InputLabel>
              <Input name="version" type="text" />
            </FormControl>
            <br />
            <FormControl>
              <InputLabel>release</InputLabel>
              <Input name="release" type="text" />
            </FormControl>
            <br />
            <Button label="Submit" type="submit">
              保存
            </Button>
          </form>
        </div>
        <Divider />
        <div style={{ padding: '10px 0', margin: '10px 0' }}>
          <Typography variant="h5" gutterBottom>
            CURR
          </Typography>
          {releaseCurr.map(item => {
            return <div key={item._id}>{`${item.release}  ${item._id}`}</div>;
          })}
        </div>
        <Divider />
        <div>
          <Typography variant="h5" gutterBottom>
            lists
          </Typography>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">time</TableCell>
                <TableCell align="right">version</TableCell>
                <TableCell align="right">release</TableCell>
                <TableCell align="right">platform</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {releaseLists.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell align="right">
                    {moment(item.time).format(momentFormat)}
                  </TableCell>
                  <TableCell align="right">{item.version}</TableCell>
                  <TableCell align="right">{item.release}</TableCell>
                  <TableCell align="right">{item.platform}</TableCell>
                  <TableCell align="right">
                    <Button onClick={delRelease(item._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
