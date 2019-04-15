import React from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import markdownit from 'markdown-it';
import markdownitKaTex from '@atory/markdown-it-katex';
import implicitFigures from 'markdown-it-implicit-figures';
// import moment from 'moment';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-dart';

// import 'prismjs/components/prism-bash';

// import { environment } from 'web/App';
import { decContent } from 'cover/cryptoUtil';
import markdownImageFloat from 'cover/markdownImageFloat';

import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism.css';
import 'github-markdown-css/github-markdown.css';

const md = markdownit({
  // html: true
  linkify: true,
  typography: true,
  breaks: true,
  highlight: (str, lang) => {
    let hl;
    // console.log({ lang });
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
})
  .use(markdownImageFloat, {})
  .use(markdownitKaTex);

class Story extends React.Component {
  static propTypes = {
    story: PropTypes.shape({
      title: PropTypes.string,
      key: PropTypes.string,
      intro: PropTypes.string,
      content: PropTypes.string,
      tags: PropTypes.array,
      wordCount: PropTypes.number,
      publishTime: PropTypes.string,
      publisher: PropTypes.object
    })
    // match: matchShape,
    // router: routerShape
    // relay: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.article = React.createRef();
    this.preScrollY = 0;
  }

  render() {
    const {
      content,
      // wordCount,
      key
      // tags,
      // publisher,
      // publishTime
    } = this.props.story;
    const mdStr = decContent(content, key);
    const html = md.render(mdStr);

    return (
      <div>
        <article ref={this.article} style={{ margin: '15px 5px' }}>
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
    );
  }
}

export default createFragmentContainer(Story, {
  story: graphql`
    fragment StoryClient_story on Story {
      id
      content
      wordCount
      key
      publishTime
      tags
    }
  `
});
