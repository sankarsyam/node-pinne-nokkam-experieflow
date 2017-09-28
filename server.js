import express from 'express';
import http from 'http';
import config from 'dotenv/config';
import bodyParser from 'body-parser';
import flowsRouter from './routes/flows';
import triggerRouter from './routes/triggers';
import actionRouter from './routes/actions';
import seedRouter from './routes/seed';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

const app = express();
app.use(express.static('documentation'));
// Cross Origin middleware
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*'), response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  ), response.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE'
  ), next();
});
/**
 * Initialize mongoose
 */
let options = process.env.MONGO_DB_OPTIONS
  ? JSON.parse(process.env.MONGO_DB_OPTIONS)
  : {};
mongoose.Promise = bluebird;
//Enable seed method with promise for migration
mongoose.Model.seed = function(entities) {
  let promise = bluebird;
  this.create(entities, function(error, entities) {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(entities);
    }
  });
  return promise;
};
/*
* Keeps the test from running on the production DB
*/
if (process.env.NODE_ENV === 'test' && !process.env.MONGO_TEST_DB_URL) {
  console.error(
    'No MONGO_TEST_DB_URL\nPlease add a MONGO_TEST_DB_URL varible to the environment'
  );
  process.exit(1);
}

/*
* For running tests MONGO_TEST_DB_URL will be used, otherwise use MONGO_DB_URL.
*/
const mongoDBURL =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_TEST_DB_URL
    : process.env.MONGO_DB_URL;
mongoose.connect(mongoDBURL, options);
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3005;
app.set('port', port);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
/**
 * Create HTTP server.
 */
const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function() {
  console.log(`API running on localhost:${port}`);
});
//Set our api routes
+app.get('/', (request, response) => {
  +response.status(200).json('Welcome to Experience Flow Server');
});

app.use('/api/v1/flows', flowsRouter);
app.use('/api/v1/actions', actionRouter);
app.use('/api/v1/triggers', triggerRouter);
app.use('/api/v1/seed', seedRouter);
module.exports = app;
