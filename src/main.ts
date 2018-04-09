import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as hbs from 'express-handlebars';
import * as logger from 'morgan';
import * as path from 'path';
import clientRoutes from './routes/clients';
import organizationRoutes from './routes/organizations';

// Create the app
const app = express();

// Set up views and view engine
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: `${__dirname}/views/layouts/` }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Set up the logger and parser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up routing
// @ts-ignore
// tslint:disable-next-line
app.use('/api-v1/clients', clientRoutes);
app.use('/api-v1/orgs', organizationRoutes);

// Start the app
app.listen(8000);
