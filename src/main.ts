import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';

import {
  graphiqlExpress,
  graphqlExpress,
} from 'apollo-server-express';
// import clientRoutes from 'routes/clients';
// import organizationRoutes from 'routes/organizations';

import schema from 'data/schema';

// Create the app
const app = express();
// Set up the logger and parser
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Set up routing
// @ts-ignore
// tslint:disable-next-line
// app.use('/api-v1/clients', clientRoutes);
// app.use('/api-v1/orgs', organizationRoutes);

// Start the app
app.listen(8000, () => {
  // tslint:disable-next-line
  console.log('Go to http://localhost:8000/graphiql to run queries!');
});
