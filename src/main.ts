import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';

import * as cors from 'cors';

import {
  graphiqlExpress,
  graphqlExpress,
} from 'apollo-server-express';

import schema from 'schema';

// Create the app
const app = express();
// Set up the logger and parser
app.use(logger('dev'));

// The GraphQL endpoint
app.use('/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the app
app.listen(8000, () => {
  // tslint:disable-next-line
  console.log('Go to http://localhost:8000/graphiql to run queries!');
});
