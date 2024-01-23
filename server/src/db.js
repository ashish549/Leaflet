const mongoose = require('mongoose');

const url = process.env.DATABASE_URL || 'mongodb+srv://Iot:UhX8vUzhubYciroQ@guestmap.hzuakxe.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

module.exports = mongoose;
