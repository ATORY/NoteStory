import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { Pie } from 'react-chartjs-2';

import * as api from 'webAdmin/restful';
import Loading from 'components/utils/Loading';

import Layout from '../layouts';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  item: {
    height: '100%'
  }
}));

const pieData = {
  labels: ['darwin', 'linux', 'win32'],
  datasets: [
    {
      data: [0, 0, 0],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
};

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [installedData, setInstalledData] = useState(pieData);
  async function initData() {
    setLoading(true);
    try {
      const data = {
        darwin: 0,
        linux: 0,
        win32: 0
      };
      const results = await api.releaseInstalled();
      const { lists } = results;
      console.log(lists);
      lists.forEach(({ platform }) => {
        if (platform === 'darwin') data.darwin += 1;
        if (platform === 'linux') data.linux += 1;
        if (platform === 'win32') data.win32 += 1;
      });
      pieData.labels = Object.keys(data);
      pieData.datasets[0].data = pieData.labels.map(l => data[l]);
      console.log(data);
      setInstalledData({ ...pieData });
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
    <Layout title="Dashboard">
      <div className={classes.root}>
        <div style={{ width: '300px', height: '300px' }}>
          <Pie data={installedData} width={100} height={100} />
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
