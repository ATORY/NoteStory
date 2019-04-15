import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
// import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Label as LabelIcon } from '@material-ui/icons';
import moment from 'moment';
import markdownit from 'markdown-it';
import implicitFigures from 'markdown-it-implicit-figures';
import markdownImageFloat from 'cover/markdownImageFloat';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';

import Loading from 'components/utils/Loading';
import * as api from 'webAdmin/restful';
import { decContent } from 'cover/cryptoUtil';
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

const md = markdownit({
  // html: true
  linkify: true,
  typography: true,
  breaks: true,
  highlight: (str, lang) => {
    let hl;

    try {
      hl = Prism.highlight(str, Prism.languages[lang]);
    } catch (error) {
      console.error(error);
      hl = md.utils.escapeHtml(str);
    }

    return `<pre class="language-${lang}"><code class="language-${lang}">${hl}</code></pre>`;
  }
});
md.use(implicitFigures, {
  dataType: false, // <figure data-type="image">, default: false
  figcaption: false, // <figcaption>alternative text</figcaption>, default: false
  tabindex: false, // <figure tabindex="1+n">..., default: false
  link: false // <a href="img.png"><img src="img.png"></a>, default: false
}).use(markdownImageFloat, {});

export default function Story() {
  const [expandedId, setExpanded] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [stories, setStories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const handleChange = id => (event, isExpanded) => {
    if (id === expandedId) setExpanded('');
    else setExpanded(id);
  };
  async function initData() {
    setLoading(true);
    try {
      const [tag, story] = await Promise.all([api.storyTags(), api.story()]);
      // console.log(story.stories);
      setTags(tag.tags);
      setStories(story.stories);
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
    <Layout title="文章管理">
      <div className={classes.root}>
        <div className={classes.filter}>filter and search</div>
        {stories.map(story => {
          return (
            <PanelItem
              key={story._id}
              story={story}
              storyTags={tags}
              expandedId={expandedId}
              handleChange={handleChange}
            />
          );
        })}
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

function PanelItem({ story, handleChange, expandedId, storyTags }) {
  const { content, key, publisher, label } = story;
  const [tags, setTags] = useState(story.tags);
  const [open, setOpen] = React.useState(false);
  const [saving, setSaving] = useState(false);
  const [valid, setValid] = useState(story.valid);
  const [recommend, setRecommend] = useState(story.recommend);
  const [selectTag, setSelectTag] = React.useState('');
  const mdStr = decContent(content, key);
  const html = md.render(mdStr);
  const classes = useStyles();

  const saveItem = async () => {
    if (saving) return;
    setSaving(true);
    const tagIds = tags.map(item => item._id);
    try {
      await api.storyUpdate(story._id, { tags: tagIds, valid, recommend });
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };
  function handleClose() {
    setOpen(false);
  }

  function handleOpen() {
    setOpen(true);
  }
  function handleSelectTagChange(event) {
    const selectId = event.target.value;
    if (!selectId) return;
    const item = storyTags.find(item => item._id === selectId);
    const exist = tags.find(tag => tag.name === item.name);
    if (exist) return;
    setTags([...tags, item]);
    setSelectTag('');
  }
  return (
    <ExpansionPanel
      expanded={expandedId === story._id}
      onChange={handleChange(story._id)}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1c-content"
        id="panel1c-header"
      >
        <div className={classes.column}>
          <h3 style={{ margin: 0 }}>{story.title}</h3>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <div className={clsx(classes.column, classes.article)}>
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        <div className={clsx(classes.column, classes.helper)}>
          <div className={classes.publisher}>
            <span
              className={classes.avator}
              style={{
                backgroundImage: `url("${publisher.avator}")`
              }}
            />
            <div>
              <h3 style={{ margin: 0 }}>{publisher.nickname}</h3>
              <p style={{ margin: 0 }}>
                {moment(story.publishTime).format('YYYY-MM-DD HH:mm:ss')}
              </p>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <LabelIcon />
                <span style={{ marginLeft: '5px' }}>{label}</span>
              </div>
            </div>
          </div>
          <Divider />
          <div style={{ margin: '10px 0' }}>
            <div>
              <h5 style={{ margin: '1px' }}>tags: </h5>
              {tags.map((tag, index) => (
                <Chip
                  key={tag._id}
                  label={tag.name}
                  onDelete={() => {
                    setTags([
                      ...tags.slice(0, index),
                      ...tags.slice(index + 1)
                    ]);
                  }}
                />
              ))}
            </div>
            <FormControl
              className={classes.formControl}
              style={{ width: '100%' }}
            >
              <InputLabel htmlFor="controlled-open-select">Tag</InputLabel>
              <Select
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={selectTag}
                onChange={handleSelectTagChange}
                inputProps={{
                  name: 'age',
                  id: 'controlled-open-select'
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {storyTags.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControlLabel
              value="valid"
              control={
                <Checkbox
                  color="primary"
                  checked={valid}
                  onChange={() => {
                    setValid(!valid);
                  }}
                />
              }
              label="有效"
              labelPlacement="start"
            />
            <FormControlLabel
              value="recommend"
              control={
                <Checkbox
                  color="primary"
                  checked={recommend}
                  onChange={() => {
                    setRecommend(!recommend);
                  }}
                />
              }
              label="推荐"
              labelPlacement="start"
            />
          </div>
          <div style={{ textAlign: 'right', marginTop: '10px' }}>
            <Button
              disabled={saving}
              size="small"
              color="primary"
              onClick={saveItem}
            >
              Save
            </Button>
          </div>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

PanelItem.propTypes = {
  story: PropTypes.object,
  handleChange: PropTypes.func,
  expandedId: PropTypes.string,
  storyTags: PropTypes.array
};
