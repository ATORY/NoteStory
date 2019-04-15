import React, { useContext, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import InputBase from '@material-ui/core/InputBase';
// import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Select from '@material-ui/core/Select';
import { styled } from '@material-ui/core';
import moment from 'moment';
// import { fade } from '@material-ui/core/styles/colorManipulator';

// import EditorContext from './Editor/Context';
// import { initialState, reducer } from './state';
import { ElectronContext, TRASH } from './state';
import { mdStrToPlainText } from 'cover/cryptoUtil';

const allOptions = [
  // { action: 'star', label: '星标' },
  // { action: 'achived', label: '归档' },
  { action: 'trash', label: '移到垃圾桶' }
];
const trashOptions = [
  { action: 'moveOutTrash', label: '移出' },
  { action: 'delete', label: '删除' }
];
const ITEM_HEIGHT = 48;

const StyledListItem = styled(ListItem)({
  // backgroundColor: "blue",
  padding: 0,
  wordBreak: 'break-all',
  flexDirection: 'column',
  '&.Mui-selected': {
    backgroundColor: '#3774ec',
    // backgroundColor: '#44bbbf',
    color: '#fff'
  },
  '&.Mui-selected:hover': {
    backgroundColor: '#3774ec',
    color: '#fff'
  },
  '&.MuiListItem-button:hover': {
    // backgroundColor: 'transparent',
    // color: '#000'
  }
});

// const paperHeigh = 130;
const paperHeigh = 80;
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2, 2),
    boxShadow: 'none',
    '-webkit-app-region': 'drag',
    'user-select': 'none',
    height: `${paperHeigh}px`,
    boxSizing: 'border-box'
  },
  search: {
    background: '#e3e3e3',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.white, 0.25)
    // },
    // marginRight: theme.spacing(0),
    margin: theme.spacing(1)
    // width: '100%'
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(0),
    //   width: 'auto'
    // }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%'
    // [theme.breakpoints.up('md')]: {
    //   width: 200
    // }
  },
  inline: {
    color: 'inherit'
    // padding: theme.spacing(0, 0, 0, 1)
  },
  listContainer: {
    overflowY: 'auto',
    height: `calc(100% - ${paperHeigh + 16}px)`
  },
  listItem: {
    width: '100%'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '50px',
    padding: theme.spacing(0, 0, 0, 1)
  },
  card: {
    color: 'inherit',
    background: 'none',
    border: 'none',
    boxShadow: 'none',
    padding: theme.spacing(0, 2, 0, 3),
    boxSizing: 'border-box',
    width: '100%'
  },
  cardHeader: {
    padding: theme.spacing(0),
    width: '100%'
  },
  cardHeaderAction: {
    margin: 0
  },
  cardHeaderActionBtn: {
    color: 'inherit'
  },
  cardContent: {
    color: 'inherit',
    padding: theme.spacing(0, 1, 0, 0),
    '&:last-child': {
      // paddingBottom: theme.spacing(1)
    },
    '& p': {
      lineHeight: '1.43rem',
      maxHeight: '2.9rem',
      textOverflow: 'ellipsis',
      '-webkit-line-clamp': 2,
      overflow: 'hidden',
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical'
    }
    // width: '100%'
  },
  cardActions: {
    padding: theme.spacing(0.2, 0, 0, 0),
    justifyContent: 'space-between',
    color: 'gray',
    '.Mui-selected &': {
      color: 'lightgray'
    }
  },
  cardSelect: {
    color: 'inherit',
    fontSize: 'small'
  }
}));

export default function Middle() {
  const {
    staticNav,
    selectNavId,
    tags,
    stories,
    selectStory,
    dispatch
  } = useContext(ElectronContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function menuItemHandle(action, _id) {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.send(action, { _id, action });
  }
  function handleTagChange(story) {
    return e => {
      const { _id } = story;
      const tag = e.target.value;
      const category = (tags.find(t => t.label === tag) || { _id: '' })._id;
      const { ipcRenderer } = window.require('electron');
      if (tag) ipcRenderer.send('setTag', { category, tag, storyId: _id });
    };
  }

  useEffect(() => {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.on('new-reply', (event, newStory) => {
      // console.log('middle arg', newStory);
      dispatch({ type: 'new', data: { newStory } });
    });
    ipcRenderer.on('achived-reply', (event, data) => {
      dispatch({ type: 'achived', data });
    });
    ipcRenderer.on('trash-reply', (event, data) => {
      dispatch({ type: 'trash', data });
    });
    ipcRenderer.on('delete-reply', (event, data) => {
      dispatch({ type: 'delete', data });
    });
    ipcRenderer.on('moveOutTrash-reply', (event, data) => {
      dispatch({ type: 'moveOutTrash', data });
    });
    ipcRenderer.on('setTag-reply', (event, data) => {
      const { tag, storyId } = data;
      dispatch({ type: 'setTag', data: { tag, storyId } });
    });
  }, []);

  const { label } = staticNav.find(item => item._id === selectNavId) || {};
  const tagLabel =
    (tags.find(item => item._id === selectNavId) || {}).label || '';
  // console.log('----', stories, selectStory);
  const classes = useStyles();
  const options = selectNavId === 'TRASH' ? trashOptions : allOptions;
  return (
    <div>
      <Paper className={classes.paper}>
        <Toolbar className={classes.title}>
          <Typography variant="h6" component="h6">
            {label || tagLabel}
          </Typography>
          {selectNavId !== TRASH && (
            <IconButton
              onClick={() => {
                const { ipcRenderer } = window.require('electron');
                ipcRenderer.send('new', {
                  category: selectNavId,
                  label: tagLabel
                });
              }}
            >
              <AddIcon />
            </IconButton>
          )}
        </Toolbar>
        {/* <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div> */}
      </Paper>
      <Divider />
      <List
        component="nav"
        className={`${classes.listContainer} column-container`}
      >
        {stories.map(item => (
          <div key={item._id}>
            <StyledListItem
              button
              className={classes.inline}
              selected={item._id === selectStory._id}
              onClick={() =>
                dispatch({ type: 'selectStory', data: { _id: item._id } })
              }
            >
              <Card className={classes.card}>
                <CardHeader
                  classes={{
                    root: classes.cardHeader,
                    action: classes.cardHeaderAction
                  }}
                  action={
                    (item._id === selectStory._id && (
                      <div>
                        <IconButton
                          className={classes.cardHeaderActionBtn}
                          aria-label="More"
                          aria-owns={open ? 'story-menu' : undefined}
                          onClick={event => {
                            event.stopPropagation();
                            event.preventDefault();
                            setAnchorEl(event.currentTarget);
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="story-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={() => setAnchorEl(null)}
                          PaperProps={{
                            style: {
                              maxHeight: ITEM_HEIGHT * 4.5,
                              width: 200
                            }
                          }}
                        >
                          {options.map(option => (
                            <MenuItem
                              key={option.action}
                              // selected={option === 'Pyxis'}
                              onClick={() => {
                                menuItemHandle(option.action, selectStory._id);
                                setAnchorEl(null);
                              }}
                            >
                              {option.label}
                            </MenuItem>
                          ))}
                        </Menu>
                      </div>
                    )) ||
                    null
                  }
                  title={item.title}
                  titleTypographyProps={{
                    style: {
                      fontSize: 'large',
                      height: '24px',
                      margin: '12px 0',
                      marginRight: item._id === selectStory._id ? 0 : '16px',
                      overflow: 'hidden'
                    }
                  }}
                />
                <CardContent className={classes.cardContent}>
                  <Typography variant="body2" component="p">
                    {mdStrToPlainText(item.content, item.key)}
                    {/* {'item.content'} */}
                  </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <span style={{ fontSize: 'small' }}>
                    {moment(item.time).format('YYYY-MM-DD HH:mm')}
                  </span>
                  <Select
                    disableUnderline
                    value={item.label}
                    onChange={handleTagChange(item)}
                    displayEmpty
                    name="age"
                    className={classes.cardSelect}
                  >
                    <MenuItem value="">
                      <em>标签</em>
                    </MenuItem>
                    {tags.map(tag => (
                      <MenuItem key={tag._id} value={tag.label}>
                        {tag.label}
                      </MenuItem>
                    ))}
                  </Select>
                </CardActions>
              </Card>
              {/* <ListItemText
                className={classes.listItem}
                primary={item.title}
                secondaryTypographyProps={{
                  color: 'inherit'
                }}
                secondary={<span>{mdStrToPlainText(item.content)}</span>}
              /> */}
              {/* <div>{Date.now()}</div> */}
              {/* <ListItemSecondaryAction>5</ListItemSecondaryAction> */}
            </StyledListItem>
            <Divider component="li" />
          </div>
        ))}
      </List>
    </div>
  );
}
