import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const actionSchema = mongoose.Schema({
  name: {
    type: { String, required: true, unique: true, index: true },
  },
  description: {
    type: String,
  },
  needsCompletionConfirmation: {
    type: Boolean,
  },
  expiresInMinutes: {
    type: Number,
  },
  actors: [
    {
      type: String,
    },
  ],
  textMessage: {
    type: String,
  },
  offerLimit: {
    type: Number,
  },
  scriptSample: {
    type: String,
  },
  directives: [
    {
      type: String,
    },
  ],
  isTriggerEvent: {
    type: Boolean,
  },
});

actionSchema.index({ name: 1 }, { unique: true });
actionSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Action', actionSchema);
