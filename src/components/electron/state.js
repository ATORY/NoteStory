import React from 'react';

const ALL = 'ALL';
// const ARCHIVED = 'ACHIVED';
export const TRASH = 'TRASH';

export const initialState = {
  selectNavId: ALL,
  initData: 'initing'
};

export function reducer(state, action) {
  const editStoryState = editStory => {
    const { selectStory, stories } = state;
    let newStories = [];
    if (stories.length > 0) {
      const editIndex = stories.findIndex(item => item._id === selectStory._id);
      newStories = [
        ...stories.slice(0, editIndex),
        editStory,
        ...stories.slice(editIndex + 1)
      ];
    }

    return {
      ...state,
      selectStory: editStory,
      stories: newStories
    };
  };
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'nav': {
      const { _id, stories } = action.data;
      const selectStory = stories[0] || {}; // selectStory should be have default
      return { ...state, selectNavId: _id, stories, selectStory };
    }
    case 'selectStory': {
      // console.log('action', action);
      const selectId = action.data._id;
      const { stories } = state;
      const selectStory = stories.find(item => item._id === selectId);
      return { ...state, selectStory };
    }
    case 'title': {
      const { title, lastUpdateTime } = action.data;
      const { selectStory } = state;
      const editStory = { ...selectStory, title, lastUpdateTime };
      return editStoryState(editStory);
    }
    case 'content': {
      const { content, lastUpdateTime } = action.data;
      const { selectStory } = state;
      const editStory = { ...selectStory, content, lastUpdateTime };
      return editStoryState(editStory);
    }
    case 'saved': {
      const { currMD5 } = action.data;
      const { selectStory } = state;
      return {
        ...state,
        selectStory: { ...selectStory, currMD5 },
        saved: true
      };
    }
    case 'saving': {
      return {
        ...state,
        saved: false
      };
    }
    case 'new': {
      const { stories } = state;
      const { newStory } = action.data;

      return {
        ...state,
        selectStory: newStory,
        stories: [newStory, ...stories]
      };
    }
    case 'tag': {
      const { _id, label } = action.data;
      const { tags } = state;
      return {
        ...state,
        tags: [{ _id, label }, ...tags]
      };
    }
    case 'deleteTag': {
      const { tagId } = action.data;
      const { tags } = state;
      const index = tags.findIndex(tag => tag._id === tagId);
      return {
        ...state,
        selectStory: {},
        stories: [],
        tags: [...tags.slice(0, index), ...tags.slice(index + 1)]
      };
    }
    case 'setTag': {
      const { tag, storyId } = action.data;
      const { stories, selectStory } = state;
      selectStory.label = tag;
      const editIndex = stories.findIndex(item => item._id === storyId);
      // const editIndex = stories.findIndex(item => item._id === selectStory._id);
      return {
        ...state,
        selectStory,
        stories: [
          ...stories.slice(0, editIndex),
          selectStory,
          ...stories.slice(editIndex + 1)
        ]
      };
    }
    case 'achived':
    case 'trash':
    case 'delete':
    case 'moveOutTrash': {
      const { _id } = action.data;
      const { stories } = state;
      const editIndex = stories.findIndex(item => item._id === _id);
      return {
        ...state,
        selectStory: {},
        stories: [
          ...stories.slice(0, editIndex),
          ...stories.slice(editIndex + 1)
        ]
      };
    }
    case 'updateServerId': {
      const { _id, id, serverMD5 } = action.data;
      const { stories } = state;
      const { selectStory } = state;
      if (_id !== selectStory._id) {
        console.error('_id !== selectStory._id');
        return { ...state };
      }
      const story = stories.find(item => item._id === _id);
      story.id = id;
      story.serverMD5 = serverMD5;
      return {
        ...state,
        selectStory: { ...selectStory, id, serverMD5 },
        stories: [...stories]
      };
    }
    case 'help': {
      const help = action.data;
      return {
        ...state,
        selectStory: help
      };
    }
    case 'init': {
      const { stories, tags } = action.data;
      const selectNavId = ALL;
      // const stories = storiesWithCategory(selectNavId);
      const selectStory = stories[0] || {};
      // const tags = [{ label: 'Nodejs', id: 'nodejs' }];
      return {
        count: 0,
        initData: 'done',
        selectNavId,
        stories,
        selectStory,
        saved: true,
        tags,
        staticNav: [
          { label: '全部', _id: ALL },
          // { label: '归档', _id: ARCHIVED },
          { label: '垃圾桶', _id: TRASH }
        ]
      };
    }
    default:
      throw new Error('action need to handle');
  }
}

export const ElectronContext = React.createContext(null);
