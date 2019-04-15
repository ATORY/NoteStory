import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import {
  mainMarginTop,
  mainMaxWidth,
  headerHeight
} from 'components/utils/constants';

// eslint-disable-next-line no-unused-vars
export const useStyles = makeStyles(theme => ({
  root: {
    wordBreak: 'break-all',
    margin: '0 auto',
    padding: `${mainMarginTop + 20}px 0`,
    maxWidth: `${mainMaxWidth - 300}px`,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1.5),
      paddingRight: theme.spacing(1.5)
    }
  },
  articleHeader: {
    position: 'fixed',
    right: 0,
    left: 0,
    top: `-${headerHeight}px`,
    height: `${headerHeight}px`,
    zIndex: 200,
    transition: 'top 0.2s, opacity 0.2s',
    background: '#fff',
    visibility: 'hidden',
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      height: 'inherit',
      margin: '0 auto',
      overflow: 'hidden',
      maxWidth: `${mainMaxWidth - 300}px`,
      '& h1': {
        margin: 0,
        padding: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        [theme.breakpoints.up('sm')]: {
          fontSize: '20px'
        }
      },
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(0.5)
      }
    }
  },
  articleShare: {
    position: 'fixed',
    top: '250px',
    '& > div': {
      height: '50px',
      width: '50px',
      left: '-100px',
      textAlign: 'center',
      position: 'absolute',
      '& .wechat': {
        cursor: 'pointer',
        '& .qrcode': {
          display: 'none',
          position: 'absolute',
          width: '150px',
          height: '150px',
          // border: '1px solid',
          background: '#fff',
          boxShadow:
            '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
          left: '50px',
          top: '-30px'
        },
        '&:hover .qrcode': {
          display: 'initial'
        }
      }
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  articleTitle: {
    margin: 0,
    fontWeight: 600,
    fontSize: '25px',
    /* line-height: 26px, */
    color: '#333',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    [theme.breakpoints.up('sm')]: {
      fontSize: '20px'
    }
  },
  articleIntro: {
    marginTop: '10px',
    fontSize: '14px',
    lineHeight: '24px',
    color: '#666',
    wordWrap: 'break-word',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-line-clamp': 2,
    maxHeight: '48px'
  },
  articleTag: {
    position: 'relative',
    margin: '0px 3px',
    padding: '1px 5px',
    backgroundColor: 'aliceblue',
    display: 'inline-block',
    transform: 'skew(-20deg)'
  },
  articleHref: {
    display: 'block',
    padding: '20px 0',
    paddingTop: '10px',
    color: '#000',
    textDecoration: 'none',
    borderBottom: '1px solid #e1e3e9',
    '&:hover': {
      background: `linear-gradient(
        to right,
        rgba(243, 245, 249, 0),
        rgba(243, 245, 249, 100) 15%,
        rgba(243, 245, 249, 100) 85%,
        rgba(243, 245, 249, 0)
      )`
    }
  },
  articlePublisher: {
    margin: '10px 0 25px 0',
    display: 'flex',
    alignItems: 'center',
    '& .publisher-avator': {},

    '& .publisher-nickname': {
      display: 'flex',
      flexDirection: 'column'
    },

    '& .publisher-follow': {
      padding: '5px 10px',
      marginLeft: 'auto',
      [theme.breakpoints.up('sm')]: {
        fontSize: '14px',
        padding: '2px 5px'
      }
    }
  },
  avator: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundPosition: 'center',
    display: 'inline-block',
    width: '60px',
    height: '60px',
    marginRight: '10px',
    [theme.breakpoints.up('sm')]: {
      width: '45px',
      height: '45px'
    }
  }
}));

export default function MainContainer(props) {
  const classes = useStyles(props);
  return <main className={classes.root}>{props.children}</main>;
}
MainContainer.propTypes = {
  children: PropTypes.node
};

export function StoryHeader(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.articleHeader} ref={props.headerRef}>
      {props.children}
    </div>
  );
}
StoryHeader.propTypes = {
  children: PropTypes.node,
  headerRef: PropTypes.any
};

export function StoryTitle(props) {
  const classes = useStyles(props);
  return <h1 className={classes.articleTitle}>{props.children}</h1>;
}
StoryTitle.propTypes = {
  children: PropTypes.node
};

export function StoryItemIntro(props) {
  const classes = useStyles(props);
  return <p className={classes.articleIntro}>{props.children}</p>;
}
StoryItemIntro.propTypes = {
  children: PropTypes.node
};

export function StoryTag(props) {
  const classes = useStyles(props);
  return <p className={classes.articleTag}>{props.children}</p>;
}
StoryTag.propTypes = {
  children: PropTypes.node
};

export function StoryHref(props) {
  const classes = useStyles(props);
  return (
    <a className={classes.articleHref} href={props.href} target={props.target}>
      {props.children}
    </a>
  );
}
StoryHref.propTypes = {
  href: PropTypes.string,
  target: PropTypes.string,
  children: PropTypes.node
};

export function StoryShare(props) {
  const classes = useStyles(props);
  return <div className={classes.articleShare}>{props.children}</div>;
}
StoryShare.propTypes = {
  children: PropTypes.node
};

export function StoryPublisher(props) {
  const classes = useStyles(props);
  return <div className={classes.articlePublisher}>{props.children}</div>;
}
StoryPublisher.propTypes = {
  children: PropTypes.node
};

export function Avator(props) {
  const classes = useStyles(props);
  return (
    <span className={clsx(classes.avator, props.className)} style={props.style}>
      {props.children}
    </span>
  );
}
Avator.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node
};

export function InfoSpan({ children }) {
  return <span style={{ margin: '0 3px' }}>{children}</span>;
}
InfoSpan.propTypes = {
  children: PropTypes.node
};
