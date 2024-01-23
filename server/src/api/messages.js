const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://Iot:UhX8vUzhubYciroQ@guestmap.hzuakxe.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 500 },
  message: { type: String, required: true, minlength: 1, maxlength: 500 },
  latitude: { type: Number, required: true, min: -90, max: 90 },
  longitude: { type: Number, required: true, min: -180, max: 180 },
  date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

const schema = Joi.object().keys({
  name: Joi.string().min(1).max(500).required(),
  message: Joi.string().min(1).max(500).required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
});

const router = express.Router();

router.get('/', (req, res) => {
  Message.find()
    .then(allMessages => {
      res.json(allMessages);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

router.post('/', (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    const { name, message, latitude, longitude } = req.body;
    const userMessage = {
      name,
      message,
      latitude,
      longitude,
      date: new Date()
    };
    Message.create(userMessage)
      .then(insertedMessage => {
        res.json(insertedMessage);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  } else {
    next(result.error);
  }
});

module.exports = router;
