const crypto = require('crypto');
const { ipcMain } = require('electron');
// const fs = require('fs');
// const path = require('path');
// const userDataPath = app.getPath('userData');
const Datastore = require('nedb');
const { machineId, machineIdSync } = require('node-machine-id');
const compareVersions = require('compare-versions');
// const CryptoJS = require('crypto-js');
// console.log({ userDataPath });
const { reportErr } = require('./network');
const { getDBPath } = require('./paths');
const { decContent } = require('../src/cover/cryptoUtil');
const {
  INIT,
  REPLY,
  UPDATE_SERVER_ID,
  TITLE,
  CONTENT,
  NEW
} = require('../src/cover/ipcChannel');
const pkg = require('../package.json');

const debug = /--debug/.test(process.argv[2]);

const db = {};
const dbPath = getDBPath();

db.stories = new Datastore(`${dbPath}/story`);
db.tags = new Datastore(`${dbPath}/tag`);

// db init job...
exports.job = async () => {
  // db.stories.loadDatabase();
  // await handleUpdate();
};

ipcMain.on(INIT, (event, arg) => {
  const reply = `${INIT}-${REPLY}`;
  // 导入数据需要重新 loadDB
  db.stories.loadDatabase();
  db.tags.loadDatabase();

  const categoryQuery =
    arg === 'ALL' ? { $not: { category: 'TRASH' } } : { category: arg };
  // console.log({ categoryQuery }, arg);

  Promise.all([
    new Promise((resolve, reject) => {
      db.stories
        .find(categoryQuery)
        .sort({ lastUpdateTime: -1 })
        .exec(function(err, docs) {
          if (err) reject(err);
          else resolve(docs);
        });
    }),
    new Promise((resolve, reject) => {
      db.tags
        .find({})
        .sort({ lastUpdateTime: -1 })
        .exec(function(err, docs) {
          if (err) reject(err);
          else resolve(docs);
        });
    })
  ])
    .then(([stories, tags]) => {
      // console.log(stories, tags);
      event.sender.send(reply, {
        stories,
        tags
      });
    })
    .catch(() => {
      // console.error(err);
      event.sender.send(reply, {
        stories: [],
        tags: []
      });
    });
});

ipcMain.on(NEW, async (event, arg) => {
  // console.log('==arg', arg); // prints "ping"
  const reply = `${NEW}-${REPLY}`;
  const { title = 'new story', category, label, content = '' } = arg;
  const key =
    arg.key ||
    Math.random()
      .toString(36)
      .substr(2);
  const currMD5 = countMD5({ title, content, key });
  const _machineId = await machineId(true);
  const newStory = {
    machineId: _machineId,
    currMD5,
    title,
    content,
    category,
    label,
    key,
    time: new Date(),
    lastUpdateTime: new Date()
  };
  db.stories.insert(newStory, function(err, newDoc) {
    // Callback is optional
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
    // console.log({ newDoc });
    event.sender.send(reply, newDoc);
  });
});

ipcMain.on('select', (event, arg) => {
  // console.log('_+_+_+_+_+_+', arg);
  const { category } = arg;
  const categoryQuery =
    category === 'ALL' ? { $not: { category: 'TRASH' } } : { category };
  new Promise((resolve, reject) => {
    db.stories
      .find(categoryQuery)
      .sort({ lastUpdateTime: -1 })
      .exec(function(err, docs) {
        if (err) reject(err);
        else resolve(docs);
      });
  })
    .then(stories => {
      // console.log('++++++', stories);
      event.sender.send('select-reply', {
        stories,
        _id: category
      });
    })
    .catch(console.error);
});

ipcMain.on(TITLE, (event, data) => {
  // console.log('title', data);
  const reply = `${TITLE}-${REPLY}`;
  const { _id, title, lastUpdateTime, content, key } = data;
  const currMD5 = countMD5({ title, content, key });
  new Promise((resolve, reject) => {
    db.stories.update(
      { _id },
      { $set: { currMD5, title, lastUpdateTime } },
      {},
      (err, numReplaced) => {
        db.stories.persistence.compactDatafile();
        if (err) reject(err);
        else resolve(numReplaced);
      }
    );
  })
    .then(num => {
      // console.log({ num });
      event.sender.send(reply, {
        num,
        currMD5
      });
    })
    .catch(console.error);
});

ipcMain.on(CONTENT, (event, data) => {
  // console.log('content', data);
  const reply = `${CONTENT}-${REPLY}`;
  const { _id, content, lastUpdateTime, title, key } = data;
  const currMD5 = countMD5({ title, content, key });
  new Promise((resolve, reject) => {
    db.stories.update(
      { _id },
      { $set: { currMD5, content, lastUpdateTime } },
      {},
      (err, numReplaced) => {
        db.stories.persistence.compactDatafile();
        if (err) reject(err);
        else resolve(numReplaced);
      }
    );
  })
    .then(num => {
      // console.log({ num });
      event.sender.send(reply, {
        num,
        currMD5
      });
    })
    .catch(console.error);
});

ipcMain.on('tag', (event, data) => {
  const { tag } = data;
  const newTag = {
    label: tag,
    time: new Date()
  };
  db.tags.insert(newTag, function(err, newTag) {
    event.sender.send('tag-reply', newTag);
  });
});

ipcMain.on('deleteTag', (event, data) => {
  const { tagId } = data;
  db.stories.update(
    { category: tagId },
    { $set: { category: 'ALL', label: '' } },
    {},
    err => {
      if (err) reportErr(err);
      db.stories.persistence.compactDatafile();
    }
  );
  db.tags.remove({ _id: tagId }, function() {
    db.tags.persistence.compactDatafile();
    event.sender.send('deleteTag-reply', { tagId });
  });
});

ipcMain.on('setTag', (event, data) => {
  const { category, tag, storyId } = data;
  // console.log(data);
  db.stories.update(
    { _id: storyId },
    { $set: { label: tag, category } },
    function() {
      db.stories.persistence.compactDatafile();
      event.sender.send('setTag-reply', { storyId, tag });
    }
  );
});

ipcMain.on('achived', (event, data) => {
  const { _id } = data;
  db.stories.update(
    { _id },
    { $set: { category: 'ACHIVED', label: '' } },
    {},
    (err, num) => {
      db.stories.persistence.compactDatafile();
      event.sender.send('achived-reply', { _id, num });
    }
  );
});

ipcMain.on('trash', (event, data) => {
  const { _id } = data;
  db.stories.update(
    { _id },
    { $set: { category: 'TRASH' } },
    {},
    (err, num) => {
      db.stories.persistence.compactDatafile();
      event.sender.send('trash-reply', { _id, num });
    }
  );
});

ipcMain.on('delete', (event, data) => {
  const { _id } = data;
  db.stories.remove({ _id }, {}, (err, num) => {
    db.stories.persistence.compactDatafile();
    event.sender.send('delete-reply', { _id, num });
  });
});

ipcMain.on('moveOutTrash', (event, data) => {
  const { _id } = data;
  db.stories.update({ _id }, { $set: { category: 'ALL' } }, {}, (err, num) => {
    db.stories.persistence.compactDatafile();
    event.sender.send('moveOutTrash-reply', { _id, num });
  });
});

ipcMain.on(UPDATE_SERVER_ID, (event, data) => {
  const reply = `${UPDATE_SERVER_ID}-${REPLY}`;
  const { _id, id, serverMD5 } = data;
  db.stories.update({ _id }, { $set: { id, serverMD5 } }, {}, (err, num) => {
    db.stories.persistence.compactDatafile();
    event.sender.send(reply, { _id, id, num, serverMD5 });
  });
});

function countMD5({ title, content }) {
  const str = `${title}${content}`;
  const algorithm = 'md5';
  const shasum = crypto.createHash(algorithm);
  const md5 = shasum.update(str).digest('hex');
  return md5;
}

// eslint-disable-next-line no-unused-vars
async function handleUpdate() {
  // version updates
  console.log('version', pkg.version);
  if (compareVersions(pkg.version, '0.1.0') !== 1) {
    // updateDocsWithMachineId();
  }

  if (compareVersions(pkg.version, '1.0.0') !== 1) {
    await decodeContent();
  }
}

// eslint-disable-next-line no-unused-vars
function updateDocsWithMachineId() {
  const _machineId = machineIdSync(true);
  db.stories.update(
    {},
    { $set: { machineId: _machineId } },
    { multi: true },
    // eslint-disable-next-line no-unused-vars
    (err, numReplaced) => {
      db.stories.persistence.compactDatafile();
      if (err) console.error(err);
      else console.log({ numReplaced });
    }
  );
}

// 只在 server 端使用 encode
// eslint-disable-next-line no-unused-vars
async function decodeContent() {
  const stories = await new Promise((resolve, reject) => {
    db.stories.find({}, (err, documents) => {
      if (err) reject(err);
      else resolve(documents);
    });
  });
  // console.log(stories);
  await Promise.all(
    stories.map(async item => {
      const { content, key, _id, title } = item;
      const mdStr = decContent(content, key, title);
      if (!mdStr) return;
      await new Promise((resolve, reject) => {
        db.stories.update(
          { _id },
          { $set: { content: mdStr } },
          {},
          (err, num, upsert) => {
            if (err) reject(err);
            else {
              if (debug) console.log({ num, upsert });
              resolve();
            }
          }
        );
      });
    })
  );
  db.stories.persistence.compactDatafile();
  if (debug) console.log('decodeContent...');
}
