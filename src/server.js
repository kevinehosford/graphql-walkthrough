'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const schema = require('./schema');

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('./webpack-dev-server')(app);
}

app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, '../build')));
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV !== 'production',
}));

/**
 * wildcard handler for all other routes to render the SPA
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, err => {
  if (err) {
    console.error(err);
  }

  console.log(`Server is listening on http://localhost:${port}`);
});
