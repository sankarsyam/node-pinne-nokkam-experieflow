import Flow from '../models/flow';
import Action from '../models/action';
import Trigger from '../models/trigger';
import Location from '../models/location';
import Complaint from '../models/complaint';
import mongoose from 'mongoose';

const seed = done => {
  Location.remove()
    .exec()
    .then(() => {
      return Location.seed(require('../migrations/locations.json'));
    })
    .then(() => {
      Action.remove()
        .exec()
        .then(() => {
          return Action.seed(require('../migrations/actions.json'));
        })
        .then(() => {
          Trigger.remove()
            .exec()
            .then(() => {
              return Trigger.seed(require('../migrations/triggers.json'));
            })
            .then(() => {
              Flow.remove()
                .exec()
                .then(() => {
                  return Flow.seed(require('../migrations/flows.json'));
                })
                .then(() => {
                  Complaint.remove()
                    .exec()
                    .then(() => {
                      Complaint.seed(require('../migrations/compaints.json'));
                    })
                    .then(done());
                });
            });
        });
    });
};
module.exports = {
  seed: seed,
};
