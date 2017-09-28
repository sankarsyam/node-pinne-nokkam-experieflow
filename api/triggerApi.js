import Trigger from '../models/trigger';
const getTriggerCategories = (category, callback) => {
  return Trigger.find({ type: category }, callback);
};
const getTriggers = callback => {
  let output = [];
  let groupedTriggers = [];
  return Trigger.find({}, (error, triggers) => {
    let category;
    triggers.forEach(trigger => {
      if (!category || category === trigger.type) {
        category = trigger.type;
        groupedTriggers.push(trigger);
      } else {
        output.push({ categoryName: category, triggers: groupedTriggers });
        groupedTriggers = [];
        groupedTriggers.push(trigger);
        category = trigger.type;
      }
    });
    output.push({ categoryName: category, triggers: groupedTriggers });
    callback(null, output);
  })
    .sort({ type: 1 })
    .lean();
};

module.exports = {
  getTriggerCategories: getTriggerCategories,
  getTriggers: getTriggers,
};
