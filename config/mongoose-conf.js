const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

const dbName = 'googleAuth';
mongoose.connect(`mongodb://localhost/${dbName}`);
(function checkConnection() {
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log(`Mongoose is connected to ${dbName} Database.`);
  });
})();

module.exports = { mongoose };
