const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoDbUrl =
  'mongodb://localhost:27017/Feedback';
let _db;

const initDb = callback => {
  if (_db) {
    console.log('Database is already initialized!'); 
    return callback(null, _db);
  }
  
MongoClient.connect(mongoDbUrl,{useUnifiedTopology: true})
    .then(client => {
      _db = client;
      console.log('database is connected');
      callback(null, _db);
    })
    .catch(err => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Database not initialzed');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
