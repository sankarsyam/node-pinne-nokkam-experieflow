import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const triggerSchema = mongoose.Schema({
  type: {
    type: String,
  },
  subType: {
    type: String,
  },
  subTypePath: {
    type: String,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
  },
  action: {
    type: Schema.Types.ObjectId,
    ref: 'Action',
  },
  complaint: {
    type: Schema.Types.ObjectId,
    ref: 'Complaint',
  },
  profilePath: {
    type: String,
  },
  values: {
    type: Array,
  },
});

module.exports = mongoose.model('Trigger', triggerSchema);
