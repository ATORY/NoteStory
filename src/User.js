import React, { Component } from 'react';
import {QueryRenderer} from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import environment from './Environment'
import './App.css';


class App extends Component {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query UserQuery($userId: String!) {
            userProfile(id: $userId) {
              id
            }  
          }
        `}
        variables={{ userId: "1" }}
        render={({error, props}) => {
          console.log(error, props)
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return <div>User ID: {props.userProfile.id}</div>;
        }}
      />
    );
  }
}

export default App;
