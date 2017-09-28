import expect from 'expect';
import chai from 'chai';
import chaihttp from 'chai-http';
import http from 'http';
import server from '../server';
import Location from '../models/location';
import Trigger from '../models/trigger';
require('./flows.test');

chai.use(chaihttp);
const port = process.env.PORT || 3005;
let location = {
  latitude: 23.3,
  longitude: 60.9,
  name: 'TestLocationTrigger',
  radius: 8,
};

let trigger = {
  type: 'location',
  subType: 'spa',
  location: null,
  action: null,
  complaint: null,
  values: ['Inside', 'Outside'],
};

let triggerId = null;

const setUpLocation = done => {
  let locationObject = new Location(location);
  locationObject.save((error, location) => {
    if (error) throw error;
    trigger.location = location._id;
    done();
  });
};

const setUpTrigger = done => {
  let triggerObject = new Trigger(trigger);
  triggerObject.save((error, trigger) => {
    if (error) throw error;
    triggerId = trigger._id;
    done();
  });
};

const deleteLocationTrigger = done => {
  Location.remove({ name: location.name }, error => {
    if (error) throw error;
    Trigger.deleteOne({ _id: triggerId }, error => {
      if (error) throw error;
      done();
    });
    done();
  });
};

describe('Paths', function() {
  describe('/api/v1/triggers', function() {
    before('location created', done => {
      setUpLocation(done);
    });
    before('Trigger created', done => {
      setUpTrigger(done);
    });
    describe('[GET]', function() {
      it('it return list of triggers with status 200', done => {
        chai.request(server).get('/api/v1/triggers').end((error, response) => {
          expect(response.status).toEqual(200);
          expect(response.body[0].triggers[0].type).toEqual('location');
          expect(response.body.length).toBeGreaterThan(0);
          done();
        });
      });
    });
  });
  describe('/api/v1/triggers/{triggerCategory}', function() {
    after('Delete location details after test', done => {
      deleteLocationTrigger(done);
    });
    describe('[GET]', () => {
      it('it return flow with status 200', done => {
        chai
          .request(server)
          .get('/api/v1/triggers/' + trigger.type)
          .end((error, response) => {
            expect(response.status).toEqual(200);
            expect(response.body[0].subType).toEqual('spa');
            expect(response.body.length).toBeGreaterThan(0);
            done();
          });
      });
    });
  });
});
