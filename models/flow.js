import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const flowSchema = mongoose.Schema({
  name: {
    type: String,
  },
  triggerCriteria: [
    {
      trigger: {
        type: Schema.Types.ObjectId,
        ref: 'Trigger',
      },
      value: String,
    },
  ],
  action: {
    type: Schema.Types.ObjectId,
    ref: 'Action',
  },

  isActive: {
    type: Boolean,
  },
});

module.exports = mongoose.model('Flow', flowSchema);
