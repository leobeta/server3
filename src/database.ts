import mongoose, { ConnectionOptions } from 'mongoose';

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const DB_URI = process.env?.DB_CONN_STRING || "";

mongoose.connect(DB_URI, dbOptions)
  .then(() => console.log('Connected'))
  .catch(err => console.log(err));

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Mongodb Connection stablished');
});

connection.on('error', (err) => {
  console.log('Mongodb connection error:', err);
  process.exit();
});