exports.baseType = `
  scalar Date
  
  interface Node {
    id: ID!
  }
`;

exports.baseQuerys = `
  node(id: ID!, local: Boolean): Node
`;
