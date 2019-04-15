const fs = require('fs');
const path = require('path');
const { printSchema } = require('graphql');

const { schema } = require('../server/data/defines/schema');

const schemaPath = path.resolve(__dirname, '../src/data/schema.graphql');

fs.writeFileSync(schemaPath, printSchema(schema));

console.log('wrote', schemaPath);
