import React, { Component } from 'react';
import Link from 'found/lib/Link';
import PropTypes from 'prop-types';
import {
  ReactRelayContext
  // createFragmentContainer,
  // graphql
} from 'react-relay';

export default class StoryList extends Component {
  static contextType = ReactRelayContext;
  static propTypes = {
    // viewer: PropTypes.object.isRequired,
    stories: PropTypes.array
    // match: matchShape,
    // router: routerShape
    // relay: PropTypes.object.isRequired,
  };

  render() {
    console.log('------>>>>>', this.props);
    const { stories } = this.props;
    console.log('------>>>>>', stories);
    return (
      <div>
        <h2>Home</h2>
        {stories.map(item => (
          <Link key={item.id} to={`/story/${item.id}`}>
            {item.title}
          </Link>
        ))}
      </div>
    );
  }
}
