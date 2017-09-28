import expect from 'expect';
import chai from 'chai';
import chaihttp from 'chai-http';
import http from 'http';
import config from 'dotenv/config';
import server from '../server';
import Location from '../models/location';
import Trigger from '../models/trigger';
import Flow from '../models/flow';
import actionAPI from '../api/actionApi';
require('./actions.test');

chai.use(chaihttp);

let location = {
  latitude: 23.3,
  longitude: 70.9,
  name: 'TestLocation1',
  radius: 8,
};

let flows = {
  name: 'Test Guest Arrival',
  triggerCriteria: [],
  action: {
    name: 'Test Room Ready13',
    description: 'The Guest’s room was isready, please give keys',
    needsCompletionConfirmation: true,
    expiresInMinutes: 5,
    actors: ['bellhop', 'frontDesk'],
    offerLimit: 1,
    textMessage: '',
    scriptSample: 'Hey Sree, Room is ready .Enjoy your day.',
    directives: ['Give guest a relaxed service'],
    isTriggerEvent: true,
  },
  isActive: true,
};

let updateFlow = {
  name: 'Test Welcome Guest',
  triggerCriteria: [],
  action: {
    name: 'Test Room Ready10',
    description: 'The Guest’s room was isready, please give keys',
    needsCompletionConfirmation: true,
    expiresInMinutes: 5,
    actors: ['bellhop', 'frontDesk'],
    offerLimit: 1,
    textMessage: '',
    scriptSample: 'Hey Sree, Room is ready .Enjoy your day.',
    directives: ['Give guest a relaxed service'],
    isTriggerEvent: true,
  },
  isActive: true,
};

let flowID = null;
let actionID = null;
let triggerData = {
  type: 'testlocation',
  subType: 'spa',
  location: null,
  action: null,
  complaint: null,
  values: ['Inside', 'Outside'],
};

let triggerflowUpdate = {
  type: 'testlocation',
  subType: 'lobby',
  location: null,
  action: null,
  complaint: null,
  values: ['Inside', 'Outside'],
};
let triggers = [];
const setUpTriggerFlowUpdate = done => {
  triggers = [];
  let triggerObject = new Trigger(triggerflowUpdate);
  triggerObject.save((error, trigger) => {
    if (error) throw error;
    triggers.push({ trigger: trigger._id, value: 'Inside' });
    done();
  });
  updateFlow.triggerCriteria = triggers;
};

let flowList = [];
let actionid = null;
let triggerId = null;
const setUpTrigger = done => {};

const setUpLocationTriggers = done => {
  let locationObject = new Location(location);
  locationObject.save((error, location) => {
    if (error) throw error;
    triggerData.location = location._id;
    triggers = [];
    let triggerObject = new Trigger(triggerData);
    triggerObject.save((error, trigger) => {
      if (error) throw error;
      triggers.push({ trigger: trigger._id, value: 'Inside' });
      flows.triggerCriteria = triggers;
      done();
    });
  });
};

const deleteLocationActionTrigger = done => {
  Location.remove({ name: location.name }, error => {
    if (error) throw error;
    actionAPI.getActions({ name: updateFlow.action.name }, (error, actions) => {
      if (error) throw error;
      actions.forEach(action => {
        actionAPI.deleteAction(action._id);
      });
      Trigger.remove({ type: triggerData.type }, error => {
        Flow.remove({ name: flows.name }, error => {
          Flow.remove({ name: updateFlow.name }, error => {
            done();
          });
        });
      });
    });
  });
};

describe('Paths', function() {
  before('location created', done => {
    setUpLocationTriggers(done);
  });

  describe('/api/v1/flows', function() {
    describe('[POST]', () => {
      it('It should create flow with status 201', done => {
        chai
          .request(server)
          .post('/api/v1/flows')
          .send(flows)
          .end((error, response) => {
            expect(response.body).toNotBe(null);
            expect(response.status).toEqual(201);
            expect(response.body.name).toEqual(flows.name);
            expect(response.body.triggerCriteria[0].trigger.type).toEqual(
              triggerData.type
            );
            expect(response.body.action.name).toEqual(flows.action.name);
            flowID = response.body._id;
            actionID = response.body.action._id;
            done();
          });
      });
    });
    describe('[GET]', () => {
      it('It should  list all flows with status 200', done => {
        chai.request(server).get('/api/v1/flows').end((error, response) => {
          expect(response.body[0].name).toEqual(flows.name);
          expect(response.body[0].triggerCriteria[0].trigger.type).toEqual(
            triggerData.type
          );
          expect(response.body[0].action.name).toEqual(flows.action.name);
          done();
        });
      });
    });
  });
  describe('/api/v1/flows?name={searchQuery}', function() {
    describe('[GET]', () => {
      it('It should get list of flows with status 200', done => {
        chai
          .request(server)
          .get('/api/v1/flows/?name=' + flows.name)
          .end((error, response) => {
            expect(response.body[0].name).toEqual(flows.name);
            expect(response.body[0].triggerCriteria[0].trigger.type).toEqual(
              triggerData.type
            );
            expect(response.body[0].action.name).toEqual(flows.action.name);
            done();
          });
      });
    });
  });

  describe('/api/v1/flows?triggerType=triggerType&triggerSubType=likesGolf&triggerSubTypeValue=triggerSubTypeValue', function() {
    describe('[GET]', () => {
      it('It should get list of flows with status 200', done => {
        chai
          .request(server)
          .get(
            '/api/v1/flows/?triggerType=' +
              triggerData.type +
              '&triggerSubType=' +
              triggerData.subType +
              '&triggerSubTypeValue=Inside'
          )
          .end((error, response) => {
            expect(response.body[0].name).toEqual(flows.name);
            expect(response.body[0].triggerCriteria[0].trigger.type).toEqual(
              triggerData.type
            );
            expect(response.body[0].triggerCriteria[0].trigger.subType).toEqual(
              triggerData.subType
            );
            expect(response.body[0].triggerCriteria[0].value).toEqual('Inside');
            expect(response.body[0].action.name).toEqual(flows.action.name);
            done();
          });
      });
    });
  });
  describe('/api/v1/flows?triggerType={triggerType}&triggerSubType={likesGolf}', function() {
    describe('[GET]', () => {
      it('It should get list of flows with status 200', done => {
        chai
          .request(server)
          .get(
            '/api/v1/flows/?triggerType=' +
              triggerData.type +
              '&triggerSubType=' +
              triggerData.subType
          )
          .end((error, response) => {
            expect(response.body[0].name).toEqual(flows.name);
            expect(response.body[0].triggerCriteria[0].trigger.type).toEqual(
              triggerData.type
            );
            expect(response.body[0].triggerCriteria[0].trigger.subType).toEqual(
              triggerData.subType
            );
            done();
          });
      });
    });
  });

  describe('/api/v1/flows?triggerType={type}', function() {
    describe('[GET]', () => {
      it('It should get list of flows with status 200', done => {
        chai
          .request(server)
          .get('/api/v1/flows/?triggerType=' + triggerData.type)
          .end((error, response) => {
            expect(response.body[0].name).toEqual(flows.name);
            expect(response.body[0].triggerCriteria[0].trigger.type).toEqual(
              triggerData.type
            );
            expect(response.body[0].action.name).toEqual(flows.action.name);
            done();
          });
      });
    });
  });

  describe('/api/v1/flows/{id}', function() {
    before('Trigger created', done => {
      setUpTriggerFlowUpdate(done);
    });

    describe('[PUT]', () => {
      it('it should update flow with status 201', done => {
        updateFlow.action._id = actionID;
        chai
          .request(server)
          .put('/api/v1/flows/' + flowID)
          .send(updateFlow)
          .end((error, response) => {
            expect(response.status).toEqual(201);
            expect(response.body.name).toEqual(updateFlow.name);
            expect(response.body.triggerCriteria[0].trigger.subType).toEqual(
              triggerflowUpdate.subType
            );
            done();
          });
      });
    });

    describe('[GET]', () => {
      it('It should return flow with status 200', done => {
        chai
          .request(server)
          .get('/api/v1/flows/' + flowID)
          .end((error, response) => {
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual(updateFlow.name);
            expect(response.body.triggerCriteria[0].trigger.type).toEqual(
              triggerflowUpdate.type
            );
            expect(response.body.action.name).toEqual(updateFlow.action.name);
            done();
          });
      });
    });

    describe('[DELETE]', () => {
      after('Delete test data', done => {
        deleteLocationActionTrigger(done);
      });
      it('It should delete flow with status 204', done => {
        chai
          .request(server)
          .delete('/api/v1/flows/' + flowID)
          .end((error, response) => {
            expect(response.status).toEqual(204);
            done();
          });
      });
    });
  });
});
