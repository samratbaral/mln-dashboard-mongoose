// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

// let _db;

// const mongoConnect = callback => {
//   MongoClient.connect(
//     'mongodb+srv://Samrat:5EFUbXqY8Ofqo3JK@cluster0.qjskv.mongodb.net/backup-mln'
//   )
//     .then(client => {
//       console.log('Connected! - Backup Automated');
//       _db = client.db();
//       callback();
//     })
//     .catch(err => {
//       console.log(err);
//       throw err;
//     });
// };

// const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw 'No database found!';
// };

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;
