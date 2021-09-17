import mongoose, { ConnectionOptions } from 'mongoose';

import Logger from './utils/logger';

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const DB_URI = process.env?.DB_CONN_STRING || "";

mongoose.connect(DB_URI, dbOptions)
  .then(() => Logger.debug('Connected'))
  .catch(err => Logger.error(err));

const connection = mongoose.connection;

connection.once('open', () => {
  Logger.debug('Mongodb Connection stablished');
});

connection.on('error', (err) => {
  Logger.error('Mongodb connection error:', err);
  process.exit();
});