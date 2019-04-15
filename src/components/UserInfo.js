import React, { PureComponent } from 'react';
import { QueryRenderer, graphql } from 'react-relay';

import { environment } from 'App';

export default class UserInfo extends PureComponent {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query UserInfoQuery {
            userProfile {
              id
              email
            }
          }
        `}
        render={data => {
          const { error, props } = data;
          console.log('data', data);
          if (error) {
            return <div>errors</div>;
          } else if (props) {
            console.log(props.userInfo.id, props.userInfo.email);
            return <div>is great!</div>;
          }
          return <div>Loading</div>;
        }}
      />
    );
  }
}
