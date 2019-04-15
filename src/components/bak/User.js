import React, { Component } from 'react';
// import {QueryRenderer} from 'react-relay';
// import graphql from 'babel-plugin-relay/macro';
// import environment from 'Environment';

// class User extends Component {
//   render() {
//     return (
//       <QueryRenderer
//         environment={environment}
//         query={graphql`
//           query UserQuery($userId: ID!, $local: Boolean) {
//             storyInfo(id: $userId, local: $local) {
//               id
//             }
//           }
//         `}
//         variables={{ userId: "2", local: true }}
//         render={({error, props}) => {
//           console.log(error, props)
//           if (error) {
//             return <div>Error!</div>;
//           }
//           if (!props) {
//             return <div>Loading...</div>;
//           }
//           return <div>User ID: {props.storyInfo.id}</div>;
//         }}
//       />
//     );
//   }
// }

class User extends Component {
  componentWillMount() {
    console.log('user');
  }
  render() {
    return <div>User</div>;
  }
}

export default User;
