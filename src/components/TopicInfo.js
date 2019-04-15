import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import MainContainer from 'components/Common/Topic';
import Link from 'found/lib/Link';
import {
  // ReactRelayContext,
  createFragmentContainer,
  // createPaginationContainer,
  graphql
} from 'react-relay';

// eslint-disable-next-line no-unused-vars
export const useStyles = makeStyles(theme => ({
  container: {
    borderBottom: '1px solid #eaeaea',
    '& h1': {
      margin: '10px 0',
      fontSize: '1.5rem'
      // fontWeight: 200
      // overflow: 'hidden',
      // whiteSpace: 'nowrap',
      // textOverflow: 'ellipsis'
    }
  },
  mainContainer: {
    marginBottom: 0,
    paddingBottom: '10px'
  },
  itemContainer: {
    paddingTop: '10px'
  },
  storyItem: {
    textDecoration: 'none',
    color: '#000',
    padding: '15px 0',
    borderBottom: '1px solid #eaeaea',
    display: 'block',
    '&:hover': {
      background: `linear-gradient(
        to right,
        rgba(243, 245, 249, 0),
        rgba(243, 245, 249, 100) 15%,
        rgba(243, 245, 249, 100) 85%,
        rgba(243, 245, 249, 0)
      )`
    },
    '& h3': {
      margin: '0 0 10px 0'
    }
  }
}));

function TopicInfo({ item }) {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{item.title}</title>
        <meta itemProp="name" content={item.title} />
        <meta name="description" itemProp="description" content={item.intro} />
      </Helmet>
      <div className={classes.container}>
        <MainContainer className={classes.mainContainer}>
          <h1>{item.title}</h1>
          <div
            style={{
              display: 'flex',
              marginBottom: '10px',
              minHeight: '100px'
            }}
          >
            <div
              className="bg-center"
              style={{
                borderRadius: 0,
                minWidth: '200px',
                backgroundImage: `url('${item.snapImg}')`
              }}
            />
            <p style={{ margin: '0 0 0px 10px' }}>{item.intro}</p>
          </div>
          <div>
            <Button variant="outlined" color="primary">
              收藏(TODO)
            </Button>
          </div>
        </MainContainer>
      </div>
      <MainContainer className={classes.itemContainer}>
        {item.stories.map(storyItem => {
          return (
            <Link
              key={storyItem.id}
              to={`/story/${storyItem.id}`}
              className={classes.storyItem}
              target="_blank"
            >
              <h3>{storyItem.title}</h3>
              <div>{storyItem.intro}</div>
            </Link>
          );
        })}
      </MainContainer>
    </>
  );
}

TopicInfo.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    snapImg: PropTypes.string
  })
};

export const query = graphql`
  query TopicInfoQuery($id: ID!) {
    item: topicInfo(id: $id) {
      ...TopicInfo_item
    }
  }
`;

export default createFragmentContainer(TopicInfo, {
  item: graphql`
    fragment TopicInfo_item on Topic {
      id
      title
      snapImg
      intro
      stories {
        id
        title
        intro
      }
    }
  `
});
