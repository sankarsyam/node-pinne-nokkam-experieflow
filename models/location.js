import mongoose from 'mongoose';

const locationSchema = mongoose.Schema({
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  name: {
    type: String,
  },
  radius: {
    type: Number,
  },
});

module.exports = mongoose.model('Location', locationSchema);
