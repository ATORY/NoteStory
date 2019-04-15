import React from 'react';
import PropTypes from 'prop-types';
import root from 'window-or-global';
import Link from 'found/lib/Link';
import { Helmet } from 'react-helmet';
import {
  // ReactRelayContext,
  commitMutation,
  createFragmentContainer,
  graphql
} from 'react-relay';
import markdownit from 'markdown-it';
import markdownitKaTex from '@atory/markdown-it-katex';
import implicitFigures from 'markdown-it-implicit-figures';
import moment from 'moment';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-dart';

// import 'prismjs/components/prism-bash';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import QRCode from 'qrcode.react';

import { environment } from 'web/App';
import {
  // mainMarginTop,
  // mainMaxWidth,
  headerHeight
} from 'components/utils/constants';
import MainContainer, {
  StoryHeader,
  StoryTitle,
  StoryItemIntro,
  StoryTag,
  StoryShare,
  StoryHref,
  StoryPublisher,
  Avator,
  InfoSpan,
  useStyles
} from 'components/Common/Story';
import { decContent } from 'cover/cryptoUtil';
import markdownImageFloat from 'cover/markdownImageFloat';

import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism.css';
import 'github-markdown-css/github-markdown.css';

// languages(['bash', 'javascript']);

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

const followUserMutation = graphql`
  mutation Story_addFlow_Mutation(
    $token: Token!
    $openId: String!
    $follow: Boolean!
  ) {
    followed: userAddFollow(token: $token, openId: $openId, follow: $follow) {
      id
      hasFollow
    }
  }
`;

export function StoryItemInfo({ storyPart, userCenter }) {
  const classes = useStyles();
  const content = (
    <>
      <StoryTitle>{storyPart.title}</StoryTitle>
      <StoryItemIntro>{storyPart.intro}</StoryItemIntro>
      {userCenter && (
        <div>{`有效: ${storyPart.valid}; 推荐到首页: ${storyPart.recommend}`}</div>
      )}
    </>
  );
  if (root.isElectron) {
    return (
      <StoryHref
        href={`${process.env.NOTESTORY_APP_SERVER_URI}/story/${storyPart.id}`}
        target="_blank"
      >
        {content}
      </StoryHref>
    );
  }
  return (
    <Link
      className={classes.articleHref}
      to={`/story/${storyPart.id}`}
      target="_blank"
    >
      {content}
    </Link>
  );
}
StoryItemInfo.propTypes = {
  userCenter: PropTypes.bool,
  storyPart: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    intro: PropTypes.string,
    tags: PropTypes.array,
    snapImg: PropTypes.string,
    publishTime: PropTypes.string,
    valid: PropTypes.bool,
    recommend: PropTypes.bool
  })
};
StoryItemInfo.defaultProps = {
  userCenter: false
};

function _StoryItem({ storyPart }) {
  const classes = useStyles();
  return (
    <Link
      className={classes.articleHref}
      to={`/story/${storyPart.id}`}
      target="_blank"
    >
      <StoryTitle>{storyPart.title}</StoryTitle>
      <StoryItemIntro>{storyPart.intro}</StoryItemIntro>
      <div
        style={{
          color: '#999',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <span
          className="bg-center"
          style={{
            backgroundImage: `url("${storyPart.publisher.avator}")`,
            height: '25px',
            width: '25px',
            marginRight: '5px'
          }}
        />
        <span>{storyPart.publisher.nickname}</span>
        <InfoSpan>·</InfoSpan>
        <span style={{ marginRight: '8px' }}>
          {moment(storyPart.publishTime).format('YYYY-MM-DD HH:mm')}
        </span>
        {storyPart.tags.map(tag => (
          <StoryTag key={tag}>{tag}</StoryTag>
        ))}
      </div>
    </Link>
  );
}
_StoryItem.propTypes = {
  storyPart: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    intro: PropTypes.string,
    snapImg: PropTypes.string,
    publishTime: PropTypes.string,
    publisher: PropTypes.shape({
      nickname: PropTypes.string
    })
  })
};

export const StoryItem = createFragmentContainer(_StoryItem, {
  storyPart: graphql`
    fragment Story_storyPart on Story {
      id
      title
      intro
      tags
      publishTime
      publisher {
        avator
        nickname
      }
    }
  `
});

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

  followTA = follow => e => {
    const taId = this.props.story.publisher.id;
    const token = localStorage.getItem('token');
    if (!token) {
      alert('请先登录');
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    const variables = {
      token,
      openId: taId,
      follow
    };
    commitMutation(environment, {
      mutation: followUserMutation,
      variables,
      onCompleted: (response, errors) => {
        if (errors) console.error(errors);
        else {
          if (response.followed) this.setState({ hasFollow: follow });
          else console.log('error hanped');
        }
        // console.log('Response received from server.', response, errors);
      },
      onError: err => console.error(err, '---')
    });
  };

  handleStoryScroll = () => {
    // console.log(e);
    // console.log(window.scrollY);
    // console.log('fixedHeader', this.fixedHeader);
    // if (window.innerWidth < 600) return;
    const scrollY = window.scrollY;
    if (scrollY < 50) {
      this.fixedHeader.current.style.visibility = 'hidden';
      return;
    }
    if (scrollY - this.preScrollY < 0) {
      if (scrollY < 500) {
        this.fixedHeader.current.style.top = -1 * headerHeight + 'px';
        this.fixedHeader.current.style.opacity = 0;
      }
    } else {
      this.fixedHeader.current.style.opacity = 1;
      this.fixedHeader.current.style.top = 0;
    }
    this.fixedHeader.current.style.visibility = 'inherit';
    this.preScrollY = scrollY;
    // if (scrollY > 50) this.fixedHeader.current.style.top = 0;
    // console.log(this.fixedHeader.current);
  };

  constructor(props) {
    super(props);
    const { hasFollow } = props.story.publisher;
    this.state = {
      hasFollow
    };
    this.fixedHeader = React.createRef();
    this.article = React.createRef();
    this.preScrollY = 0;
  }
  componentDidMount() {
    document.addEventListener('scroll', this.handleStoryScroll);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleStoryScroll);
  }
  render() {
    const {
      title,
      content,
      intro,
      wordCount,
      key,
      tags,
      publisher,
      publishTime
    } = this.props.story;
    const mdStr = decContent(content, key);
    const html = md.render(mdStr);
    // console.log(html);
    const { hasFollow } = this.state;
    const adminHandle = publisher.id === 'admin';
    return (
      <MainContainer>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta itemProp="name" content={title} />
          <meta name="description" itemProp="description" content={intro} />
        </Helmet>
        <StoryHeader headerRef={this.fixedHeader}>
          <div>
            <h1>{title}</h1>
            {!adminHandle && (
              <div style={{ marginLeft: 'auto', display: 'inherit' }}>
                <Avator
                  style={{
                    backgroundImage: `url('${publisher.avator}')`,
                    width: '40px',
                    height: '40px',
                    marginRight: 0
                  }}
                />
                <Button
                  color="primary"
                  style={{ padding: '0px 5px' }}
                  onClick={this.followTA(!hasFollow)}
                >
                  {hasFollow ? '已关注' : '关注 TA'}
                </Button>
              </div>
            )}
          </div>
        </StoryHeader>
        <article ref={this.article}>
          <StoryTitle>{title}</StoryTitle>
          {!adminHandle && (
            <StoryPublisher>
              <Avator
                className="publisher-avator"
                style={{ backgroundImage: `url('${publisher.avator}')` }}
              />
              <div className="publisher-nickname">
                <Link to={`/user/${publisher.id}`}>
                  <h5 style={{ fontSize: '18px', margin: 0 }}>
                    {publisher.nickname}
                  </h5>
                </Link>
                <div
                  style={{
                    color: 'gray',
                    fontSize: 'small',
                    margin: 0,
                    marginTop: '5px'
                  }}
                >
                  <span>{`约 ${wordCount || 0} 字`}</span>
                  <span style={{ margin: '0 5px' }}>·</span>
                  <span style={{ marginRight: '5px' }}>
                    {moment(publishTime).format('YYYY-MM-DD HH:mm')}
                  </span>
                  {tags.map(item => (
                    <StoryTag key={item}>{item}</StoryTag>
                  ))}
                </div>
              </div>
              <Button
                variant="outlined"
                color="primary"
                className="publisher-follow"
                onClick={this.followTA(!hasFollow)}
              >
                {hasFollow ? (
                  '已关注'
                ) : (
                  <>
                    <AddIcon fontSize="small" />
                    关注
                  </>
                )}
              </Button>
            </StoryPublisher>
          )}
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
        <StoryShare>
          <div>
            <span style={{ fontSize: '14px' }}>分享</span>
            <div className="wechat">
              <svg
                style={{ padding: '10px' }}
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path
                  fill="#5cc928"
                  d="M21.502 19.525c1.524-1.105 2.498-2.738 2.498-4.554 0-3.326-3.237-6.023-7.229-6.023s-7.229 2.697-7.229 6.023c0 3.327 3.237 6.024 7.229 6.024.825 0 1.621-.117 2.36-.33l.212-.032c.139 0 .265.043.384.111l1.583.914.139.045c.133 0 .241-.108.241-.241l-.039-.176-.326-1.215-.025-.154c0-.162.08-.305.202-.392zm-12.827-17.228c-4.791 0-8.675 3.236-8.675 7.229 0 2.178 1.168 4.139 2.997 5.464.147.104.243.276.243.471l-.03.184-.391 1.458-.047.211c0 .16.13.29.289.29l.168-.054 1.899-1.097c.142-.082.293-.133.46-.133l.255.038c.886.255 1.842.397 2.832.397l.476-.012c-.188-.564-.291-1.158-.291-1.771 0-3.641 3.542-6.593 7.911-6.593l.471.012c-.653-3.453-4.24-6.094-8.567-6.094zm5.686 11.711c-.532 0-.963-.432-.963-.964 0-.533.431-.964.963-.964.533 0 .964.431.964.964 0 .532-.431.964-.964.964zm4.82 0c-.533 0-.964-.432-.964-.964 0-.533.431-.964.964-.964.532 0 .963.431.963.964 0 .532-.431.964-.963.964zm-13.398-5.639c-.639 0-1.156-.518-1.156-1.156 0-.639.517-1.157 1.156-1.157.639 0 1.157.518 1.157 1.157 0 .638-.518 1.156-1.157 1.156zm5.783 0c-.639 0-1.156-.518-1.156-1.156 0-.639.517-1.157 1.156-1.157.639 0 1.157.518 1.157 1.157 0 .638-.518 1.156-1.157 1.156z"
                />
              </svg>
              <div className="qrcode">
                <QRCode value={location.href} style={{ margin: '10px' }} />
                {/* <span>扫一扫</span> */}
              </div>
            </div>
          </div>
        </StoryShare>
      </MainContainer>
    );
  }
}

export default createFragmentContainer(Story, {
  story: graphql`
    fragment Story_story on Story {
      id
      title
      intro
      content
      wordCount
      key
      publishTime
      tags
      publisher {
        id
        nickname
        avator
        hasFollow
      }
    }
  `
});
