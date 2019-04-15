var MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();
var result = md.render('# markdown-it rulezz! ![](file://localhost:3000/c)');

console.log(result);
