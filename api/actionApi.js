import Action from '../models/action';
import Trigger from '../models/trigger';
import mongoose from 'mongoose';

const addAction = (newAction, callback) => {
  const action = new Action(newAction);
  action.save((error, actions) => {
    if (error) {
      console.error('Action: Error while saving action', error);
      callback(error, null);
    }
    const newTrigger = {
      type: 'Action',
      subType: actions.name,
      action: actions._id,
      values: ['Completed', 'Not Completed'],
    };
    const trigger = new Trigger(newTrigger);
    trigger.save(callback(error, actions));
  });
};

const updateAction = (updatedAction, id, callback) => {
  return Action.findOneAndUpdate(
    { _id: id },
    updatedAction,
    { new: true },
    callback
  );
};

const deleteAction = (id, callback) => {
  let actionID = id;
  Action.findOneAndRemove({ _id: id }, (error, action) => {
    Trigger.remove({ action: actionID }, error => {
      if (error) console.error('DeleteAction: cannot find action', error);
    }).exec(callback);
  });
};

const getAction = (id, callback) => {
  return Action.findOne({ _id: id }, callback);
};

const getActions = (filter, callback) => {
  return Action.find(filter, callback);
};

module.exports = {
  addAction: addAction,
  updateAction: updateAction,
  deleteAction: deleteAction,
  getAction: getAction,
  getActions: getActions,
};
