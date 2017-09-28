import express, { Router } from 'express';
import bodyParser from 'body-parser';
import flowAPI from '../api/flowApi';
import MongoQS from 'mongo-querystring';
const router = Router();

module.exports = router;
const qs = new MongoQS({
  string: {
    toBoolean: false,
  },
  custom: {
    bbox: 'geojson',
    near: 'geojson',
  },
});

/**
* @api {get} /api/v1/flows Get All Experience flows
* @api {get} /api/v1/flows?triggerType=Room&triggerSubType=isReady&triggerSubTypeValue=true Get All Experience flows with queries
* @apiName Get All Experience flows
* @apiGroup ExperienceFlows
* @apiVersion 1.0.0
* @apiDescription This API is used for getting flows matching filter criteria It can have values triggerType ,triggerSubType ,triggerSubTypeValue and combination of these values
* @apiParam query Searchable fields can have values of flow Object and trigger object
* 
* @apiSuccessExample Success-Response
*   HTTP/1.1 200 OK
*   [    
*   {
*        "_id": "595a32da6d297a20a026ba55",
*        "action": {
*            "_id": "595a32da6d297a20a026ba54",
*            "name": "Room Ready",
*            "description": "The Guest’s room was isready, please give keys",
*            "needsCompletionConfirmation": true,
*            "expiresInMinutes": 5,
*            "offerLimit": 1,
*            "textMessage": "",
*            "scriptSample": "Hey Sree, Room is ready .Enjoy your day.",
*            "isTriggerEvent": true,
*            "__v": 0,
*  
*          "directives": [
*                "Give guest a relaxed service"
*            ],
*            "actors": [
*                "bellhop",
*                "frontDesk"
*            ]
*        },
*        "name": "Guest Arrival",
*        "isActive": false,
*        "__v": 0,
*        "triggerCriteria": [
*           {
*              "trigger" : {
*
*                "_id": "595a32da6d297a20a026ba52",
*                "type": "Room",
*                "subType": "isReady",
*                "action": null,
*                "values": [
*                        "True",
*                        "False"
*                       ]
*              },
*              "value": "True",
*           }
*        ]
*    }
*]
*
* @apiErrorExample Error-Response
*   HTTP/1.1 404 Not Found
*   {
*     "success": false,
*     "message": "Flow not found ."
*   }
*
*/
router.get('/', (request, response) => {
  let mongofilter = {};
  let options = null;
  if (request.query) {
    mongofilter = qs.parse(request.query);
  }
  let flowSearchFilter = {};
  if (
    mongofilter.triggerSubTypeValue &&
    mongofilter.triggerSubType &&
    mongofilter.triggerType
  ) {
    Object.assign(flowSearchFilter, {
      triggerCriteria: {
        $elemMatch: { value: { $eq: [mongofilter.triggerSubTypeValue] } },
      },
    });
    options = {
      path: 'triggerCriteria.trigger',
      match: {
        $and: [
          { subType: { $in: [[mongofilter.triggerSubType]] } },
          { type: { $in: [[mongofilter.triggerType]] } },
        ],
      },
    };
  } else if (mongofilter.triggerSubType && mongofilter.triggerType) {
    options = {
      path: 'triggerCriteria.trigger',
      match: {
        $and: [
          { subType: { $in: [[mongofilter.triggerSubType]] } },
          { type: { $in: [[mongofilter.triggerType]] } },
        ],
      },
    };
  } else if (mongofilter.triggerSubType || mongofilter.triggerType) {
    options = {
      path: 'triggerCriteria.trigger',
      match: {
        $or: [
          { subType: { $in: [[mongofilter.triggerSubType]] } },
          { type: { $in: [[mongofilter.triggerType]] } },
        ],
      },
    };
  } else if (mongofilter.triggerSubTypeValue) {
    Object.assign(flowSearchFilter, {
      triggerCriteria: {
        $elemMatch: { value: { $eq: [mongofilter.triggerSubTypeValue] } },
      },
    });
    options = {
      path: 'triggerCriteria.trigger',
    };
  } else {
    flowSearchFilter = mongofilter;
    options = {
      path: 'triggerCriteria.trigger',
    };
  }

  flowAPI.getFlows(
    flowSearchFilter,
    mongofilter.triggerSubTypeValue,
    options,
    (error, flows) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: 'Error getting flows',
        });
      } else {
        if (flows != null) {
          return response.status(200).json(flows);
        }
        return response.status(404).json({
          success: false,
          message: 'Flow not found ',
          error,
        });
      }
    }
  );
});

/**
* @api {post} /api/v1/flows Create Flow
* @apiName  Create Experience Flow
* @apiGroup ExperienceFlows
* @apiVersion 1.0.0
*
* @apiParam {String} name Flow Name
* @apiParam {Boolean} isActive Flow is Active or not
* @apiParam {Array} triggerCriteria  List of triggers IDs and associated values
* @apiParam {Object} action Action Object of Flow
* @apiParam {String} action.name name of Action
* @apiParam {String} action.description description of Action
* @apiParam {Boolean} action.needsCompletionConfirmation Completion confirmation of Action
* @apiParam {Number} action.expiresInMinutes Expiry time of action
* @apiParam {Array} action.actors List of actors liek bellhop,guest..
* @apiParam {Number} action.offerLimit Offer limit 
* @apiParam {String} action.textMessage Text Message for the  action 
* @apiParam {String} action.scriptSample Script sample for the action
* @apiParam {Array} action.directives Directives for the action
* @apiParam {Boolean} action.isTriggerEvent checks whether Trigger is an event
*
* @apiSuccessExample Success-Response
*   {
*   "_id": "595a50748207c11c9cf227f0",
*    "action": {
*        "_id": "595a50748207c11c9cf227ef",
*        "name": "Room Ready",
*        "description": "The Guest’s room was isready, please give keys",
*        "needsCompletionConfirmation": true,
*        "expiresInMinutes": 5,
*        "offerLimit": 1,
*        "textMessage": "",
*        "scriptSample": "Hey Sree, Room is ready .Enjoy your day.",
*        "isTriggerEvent": true,
*        "__v": 0,
*        "directives": [
*            "Give guest a relaxed service"
*        ],
*        "actors": [
*            "bellhop",
*            "frontDesk"
*        ]
*    },
*    "name": "Guest Arrival",
*    "isActive": false,
*    "__v": 0,
*        "triggerCriteria": [
*           {
*              "trigger" : {
*
*                "_id": "595a32da6d297a20a026ba52",
*                "type": "Room",
*                "subType": "isReady",
*                "action": null,
*                "values": [
*                        "True",
*                        "False"
*                       ]
*              },
*              "value": "True",
*           }
*        ]
* }
*
* @apiErrorExample Error-Response
*   HTTP/1.1 404 Not Found
*   {
*     "success": false,
*     "message": "Flow not Created."
*   }
*
*/

router.post('/', (request, response) => {
  let triggersIDS = [];
  flowAPI.addFlow(request.body, (error, flow) => {
    if (error) {
      return response.status(404).json({
        success: false,
        message: 'Flow not created',
      });
    } else {
      return response.status(201).json(flow);
    }
  });
});

/**
* @api {put} /api/v1/flows/{id} Update Flow
* @apiName  Update Experience Flow
* @apiGroup ExperienceFlows
* @apiVersion 1.0.0
*
* @apiParam {String} name Flow Name
* @apiParam {Boolean} isActive Flow is Active or not
* @apiParam {Array} triggerCriteria  List of triggers IDs and associated values
* @apiParam {Object} action Action Object of Flow
* @apiParam {String} action.name name of Action
* @apiParam {String} action.description description of Action
* @apiParam {Boolean} action.needsCompletionConfirmation Completion confirmation of Action
* @apiParam {Number} action.expiresInMinutes Expiry time of action
* @apiParam {Array} action.actors List of actors liek bellhop,guest..
* @apiParam {Number} action.offerLimit Offer limit 
* @apiParam {String} action.textMessage Text Message for the  action 
* @apiParam {String} action.scriptSample Script sample for the action
* @apiParam {Array} action.directives Directives for the action
* @apiParam {Boolean} action.isTriggerEvent checks whether Trigger is an event
*
* @apiSuccessExample Success-Response
*   {
*   "_id": "595a50748207c11c9cf227f0",
*    "action": {
*        "_id": "595a50748207c11c9cf227ef",
*        "name": "Room Ready",
*        "description": "The Guest’s room was isready, please give keys",
*        "needsCompletionConfirmation": true,
*        "expiresInMinutes": 5,
*        "offerLimit": 1,
*        "textMessage": "",
*        "scriptSample": "Hey Sree, Room is ready .Enjoy your day.",
*        "isTriggerEvent": true,
*        "__v": 0,
*        "directives": [
*            "Give guest a relaxed service"
*        ],
*        "actors": [
*            "bellhop",
*            "frontDesk"
*        ]
*    },
*    "name": "Guest Arrival",
*    "isActive": false,
*    "__v": 0,
*        "triggerCriteria": [
*           {
*              "trigger" : {
*
*                "_id": "595a32da6d297a20a026ba52",
*                "type": "Room",
*                "subType": "isReady",
*                "action": null,
*                "values": [
*                        "True",
*                        "False"
*                       ]
*              },
*              "value": "True",
*           }
*        ]
* }
*
* @apiErrorExample Error-Response
*   HTTP/1.1 404 Not Found
*   {
*     "success": false,
*     "message": "Flow not Updated."
*   }
*
*/
router.put('/:id', (request, response) => {
  const id = request.params.id;
  const newAction = request.body.action;
  if(newAction){
     flowAPI.updateAction(newAction, (error, action) => {
    if (error) {
      if (error.code === 11000) {
        return response.status(404).json({
          success: false,
          message: 'Action Name already exists',
        });
      }
      return response.status(404).json({
        success: false,
        message: 'Error while updating Action',
      });
    } 
  });
 }
  const updateFlow = request.body;
  flowAPI.updateFlow(updateFlow, id, (error, flow) => {
    if (error) {
        return response.status(404).json({
          success: false,
          message: 'Flow not Updated',
        });
    } else {
      return response.status(201).json(flow);
    }
  });
});

/**
* @api {delete} /api/v1/flows/{id} Delete Flow
* @apiName  Delete Experience Flow
* @apiGroup ExperienceFlows
* @apiVersion 1.0.0
*
*  @apiParam {Number} id Flow Id 
*
* @apiSuccessExample Success-Response
*   HTTP/1.1 204 OK
*
* @apiErrorExample Error-Response
*   HTTP/1.1 404 Not Found
*   {
*     "success": false,
*     "message": "Flow not Found."
*   }
*
*/
router.delete('/:id', (request, response) => {
  const id = request.params.id;
  flowAPI.deleteFlow(id, (error, message) => {
    if (error) {
      return response.status(404).json({
        success: false,
        message: 'Flow  not found',
      });
    } else {
      return response
        .status(204)
        .json({ message: 'Flow deleted successfully' });
    }
  });
});

/**
* @api {get} /api/v1/flows/{id} Get Experience Flow
* @apiName Get All Profiles
* @apiGroup ExperienceFlows
* @apiVersion 1.0.0
*
* 
* @apiSuccessExample Success-Response
*   HTTP/1.1 200 OK
*   [    
*   {
*        "_id": "595a32da6d297a20a026ba55",
*        "action": {
*            "_id": "595a32da6d297a20a026ba54",
*            "name": "Room Ready",
*            "description": "The Guest’s room was isready, please give keys",
*            "needsCompletionConfirmation": true,
*            "expiresInMinutes": 5,
*            "offerLimit": 1,
*            "textMessage": "",
*            "scriptSample": "Hey Sree, Room is ready .Enjoy your day.",
*            "isTriggerEvent": true,
*            "__v": 0,
*  
*          "directives": [
*                "Give guest a relaxed service"
*            ],
*            "actors": [
*                "bellhop",
*                "frontDesk"
*            ]
*        },
*        "name": "Guest Arrival",
*        "isActive": false,
*        "__v": 0,
*        "triggerCriteria": [
*           {
*              "trigger" : {
*
*                "_id": "595a32da6d297a20a026ba52",
*                "type": "Room",
*                "subType": "isReady",
*                "action": null,
*                "values": [
*                        "True",
*                        "False"
*                       ]
*              },
*              "value": "True",
*           }
*        ]
*    }
*]
*
* @apiErrorExample Error-Response
*   HTTP/1.1 404 Not Found
*   {
*     "success": false,
*     "message": "Flow not found ."
*   }
*
*/
router.get('/:id', (request, response) => {
  const id = request.params.id;
  flowAPI.getFlow(id, (error, flow) => {
    if (error) {
      return response
        .status(404)
        .json({ success: false, message: 'Flow not found' });
    } else {
      if (flow != null) {
        return response.status(200).send(flow);
      }
      return response
        .status(404)
        .json({ success: false, message: 'Flow not found' });
    }
  });
});
