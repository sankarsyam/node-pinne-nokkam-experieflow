import mongoose from 'mongoose';

const complaintSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  resolved: {
    type: Boolean,
  },
  textMessage: {
    type: String,
  },
});

module.exports = mongoose.model('Complaint', complaintSchema);
