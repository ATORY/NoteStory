const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';

async function FetchServer({
  method = GET,
  body = {},
  adminPath = '',
  query = {}
}) {
  const headers = {
    credentials: 'same-origin',
    'Content-Type': 'application/json',
    'x-client-name': `${process.env.REACT_APP_NAME}@webAdmin`,
    'x-client-version': process.env.REACT_APP_VERSION
  };
  const fetchInfo = {
    method,
    headers
  };
  if ([POST, PUT].includes(method)) {
    fetchInfo.body = JSON.stringify(body);
  }
  let queryStr = Object.keys(query)
    .map(k => {
      return `${k}=${query[k]}`;
    })
    .join('&');
  const response = await fetch(`/admin${adminPath}?${queryStr}`, fetchInfo);
  if (response.status !== 200) {
    throw new Error(status);
  }
  const responeData = await response.json();
  return responeData;
}

export const auth = async () => {
  return await FetchServer({ adminPath: `/auth?${Date.now()}` });
};

export const login = async body => {
  return await FetchServer({ method: POST, body, adminPath: '/login' });
};

export const logout = async () => {
  return await FetchServer({ method: POST, adminPath: '/logout' });
};

// tag
export const tag = async () => {
  return await FetchServer({ adminPath: '/tag' });
};

export const tagAdd = async tag => {
  return await FetchServer({ method: POST, body: { tag }, adminPath: '/tag' });
};

export const tagDel = async tagId => {
  return await FetchServer({
    method: DELETE,
    adminPath: `/tag/${tagId}`
  });
};

export const tagUpdate = async (tagId, tag) => {
  return await FetchServer({
    method: PUT,
    body: { tag },
    adminPath: `/tag/${tagId}`
  });
};

// story
export const storyTags = async () => {
  return await FetchServer({ adminPath: '/story/tags' });
};

export const story = async () => {
  return await FetchServer({ adminPath: '/story' });
};

export const storyUpdate = async (id, { tags, valid, recommend }) => {
  return await FetchServer({
    method: PUT,
    body: { tags, valid, recommend },
    adminPath: `/story/${id}`
  });
};

// release
export const releaseList = async () => {
  return await FetchServer({ adminPath: '/release/list' });
};

export const releaseAdd = async release => {
  return await FetchServer({
    method: POST,
    body: { ...release },
    adminPath: '/release'
  });
};

export const releaseDel = async releaseId => {
  return await FetchServer({
    method: DELETE,
    adminPath: `/release/${releaseId}`
  });
};

export const releaseInstalled = async () => {
  return await FetchServer({
    method: GET,
    adminPath: `/release/installed`
  });
};

export const userList = async (lastId = '') => {
  return await FetchServer({
    method: GET,
    adminPath: `/user`,
    query: {
      lastId
    }
  });
};
