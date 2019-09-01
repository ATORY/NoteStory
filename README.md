# NoteStory

使用 Electron + React + Draftjs 写的一款简单的，个人的，markdown 记录软件。

下载页面介绍 [http://download.wesy.club/](http://download.wesy.club/)

## 使用 

```bash
npm i
npm run electron:build
npm run dist
```

dist 目录生成相应的文件件。

*注：如遇一些私有包无法安装，可先注掉。私有包多是 [darftjs-plugins](https://github.com/draft-js-plugins/draft-js-plugins) 的 fork, 可找到相应替换。*

## 结构目录

src：NoteStory 的 UI，React + Relay
src 下又有 web 上的 UI，后台管理 UI
electron: electron main process
server: graphql api
server-admin / server-render: pgk 打包 nodejs 程序

