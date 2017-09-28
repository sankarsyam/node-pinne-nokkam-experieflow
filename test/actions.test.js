import expect from 'expect';
import chai from 'chai';
import chaihttp from 'chai-http';
import http from 'http';
import server from '../server';
import Action from '../models/action';
import Trigger from '../models/trigger';

chai.use(chaihttp);
let action = {
  name: 'Room Ready14',
  description: 'The Guest’s room was isready, please give keys',
  needsCompletionConfirmation: 'true',
  expiresInMinutes: '5',
  actors: ['bellhop', 'frontDesk'],
  offerLimit: '1',
  textMessage: '',
  scriptSample: 'Hey Sree, Room is ready .Enjoy your day.',
  directives: ['Give guest a relaxed service'],
  isTriggerEvent: true,
};
let actionID = null;
let updateAction = {
  name: 'Room Ready',
  description: 'The Guest’s room was isready, please give keys',
  needsCompletionConfirmation: 'true',
  expiresInMinutes: '5',
  actors: ['bellhop', 'frontDesk', 'staffBoy'],
  offerLimit: '1',
  textMessage: '',
  scriptSample: 'Hey Sree, Room is ready .Enjoy your day.',
  directives: ['Give guest a relaxed service'],
  isTriggerEvent: true,
};
describe('Paths', () => {
  describe('/', function() {
    describe('[GET]', function() {
      it('should return 200', function(done) {
        http.get('http://localhost:' + process.env.PORT, function(res) {
          expect(res.statusCode).toEqual(200);
          done();
        });
      });
    });
  });
  describe('/api/v1/actions', () => {
    describe('[POST]', () => {
      it('It should create action with status 201', done => {
        chai
          .request(server)
          .post('/api/v1/actions')
          .send(action)
          .end((error, response) => {
            expect(response.body).toNotBe(null);
            expect(response.status).toEqual(201);
            expect(response.body.name).toEqual(action.name);
            expect(response.body.directives[0]).toEqual(action.directives[0]);
            expect(response.body.actors[0]).toEqual(action.actors[0]);
            actionID = response.body._id;
            Trigger.findOne({ action: actionID }, (error, trigger) => {
              expect(trigger).toNotBe(null);
              expect(trigger.type).toEqual('Action');
              expect(trigger.action).toEqual(actionID);
              expect(trigger.values[0]).toEqual('Completed');
              done();
            });
          });
      });
    });
    describe('[GET]', () => {
      it('it return list of actions with status 200', done => {
        chai.request(server).get('/api/v1/actions/').end((error, response) => {
          expect(response.status).toEqual(200);
          expect(response.body.length).toBeGreaterThan(0);
          expect(response.body).toBeA('array');
          done();
        });
      });
    });
  });
  describe('/api/v1/actions/{id}', () => {
    describe('[GET]', () => {
      it('it should send 200 response when action is found', done => {
        chai
          .request(server)
          .get('/api/v1/actions/' + actionID)
          .end((error, response) => {
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual(action.name);
            expect(response.body.directives[0]).toEqual(action.directives[0]);
            expect(response.body.actors[0]).toEqual(action.actors[0]);
            done();
          });
      });
    });
    describe('[PUT]', () => {
      it('it should update action with status 201', done => {
        chai
          .request(server)
          .put('/api/v1/actions/' + actionID)
          .send(updateAction)
          .end((error, response) => {
            expect(response.status).toEqual(201);
            expect(response.body.name).toEqual(updateAction.name);
            expect(response.body.directives[0]).toEqual(
              updateAction.directives[0]
            );
            expect(response.body.actors[2]).toEqual(updateAction.actors[2]);
            done();
          });
      });
    });
    describe('[DELETE]', () => {
      it('it should send 204 response when action is deleted', done => {
        chai
          .request(server)
          .delete('/api/v1/actions/' + actionID)
          .end((error, response) => {
            expect(response.status).toEqual(204);
            Trigger.findOne({ action: actionID }, (error, trigger) => {
              expect(trigger).toBe(null);
              done();
            });
          });
      });
    });
  });
});
