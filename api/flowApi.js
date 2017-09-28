import Flow from '../models/flow';
import Action from '../models/action';
import Trigger from '../models/trigger';
import Location from '../models/location';
import Complaint from '../models/complaint';
import actionAPI from './actionApi';
import mongoose from 'mongoose';

const addFlow = (newFlow, callback) => {
  actionAPI.addAction(newFlow.action, (error, action) => {
    if (error) {
      console.error('AddFlow: Error while saving action', error);
      callback(error, null);
    }
    newFlow.action = action._id;
    const flow = new Flow(newFlow);
    flow.save((error, flows) => {
      if (error) {
        console.error('AddFlow: Error while saving flow details', error);
        callback(error, null);
      }
      Flow.findOne({ _id: flows._id })
        .populate('triggerCriteria.trigger')
        .populate('action')
        .exec(callback);
    });
  });
};

const updateAction = (updateAction, callback) => {
  return Action.findOneAndUpdate(
    { _id: updateAction._id },
    updateAction,
    { new: true },
    callback
  );
};

const updateFlow = (updateFlow, id, callback) => {
  return Flow.findOneAndUpdate({ _id: id }, updateFlow, { new: true })
    .populate('triggerCriteria.trigger')
    .populate('action')
    .exec(callback);
};

const deleteFlow = (id, callback) => {
  return Flow.findOneAndRemove({ _id: id }, callback);
};

const getFlow = (id, callback) => {
  return Flow.findOne({ _id: id }, callback)
    .populate('triggerCriteria.trigger')
    .populate('action');
};

const getFlows = (flowSearchFilter, triggerSubTypeValue, options, callback) => {
  return Flow.find(flowSearchFilter)
    .populate(options)
    .populate('action')
    .exec((error, flowList) => {
      let flows = [];
      if (flowList) {
        for (let flow of flowList) {
          let triggerCriteriaList = [];
          if (flow.triggerCriteria) {
            for (let triggerCriteria of flow.triggerCriteria) {
              if (triggerSubTypeValue) {
                if (
                  triggerSubTypeValue &&
                  triggerCriteria.trigger &&
                  triggerSubTypeValue === triggerCriteria.value
                ) {
                  triggerCriteriaList.push(triggerCriteria);
                }
              } else if (triggerCriteria.trigger) {
                triggerCriteriaList.push(triggerCriteria);
              }
            }
          }
          if (triggerCriteriaList.length > 0) {
            flow.triggerCriteria = triggerCriteriaList;
            flows.push(flow);
          }
        }
      }
      callback(error, flows);
    });
};

module.exports = {
  addFlow: addFlow,
  updateAction: updateAction,
  deleteFlow: deleteFlow,
  updateFlow: updateFlow,
  getFlow: getFlow,
  getFlows: getFlows,
};
