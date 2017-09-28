import express, { Router } from 'express';
import bodyParser from 'body-parser';
import actionApi from '../api/actionApi';
import MongoQS from 'mongo-querystring';

const router = Router();

module.exports = router;

const qs = new MongoQS({
  custom: {
    bbox: 'geojson',
    near: 'geojson',
  },
});

/**
* @api {post} /api/v1/actions Create Action
* @apiName  Create Action
* @apiGroup Actions
* @apiVersion 1.0.0
*
* @apiParam {String} name Name of Action
* @apiParam {String} description  description of Action
* @apiParam {String} needsCompletionConfirmation  CompletionConfirmation of Action
* @apiParam {Number} expiresInMinutes Expires InMinutes of Action
* @apiParam {String} offerLimit Offer Limit of Action
* @apiParam {String} textMessage Message  of Action
* @apiParam {String} scriptSample script of Action
* @apiParam {Boolean} isTriggerEvent TriggerEvent of Action 
* @apiParam {Array} directives Array of directives
* @apiParam {Array} actors Array of actors
*
* @apiSuccessExample Success-Response
*   HTTP/1.1 201 OK
*{
*    "name": "Enters Lobby",
*    "description": "Guest enters the lobby",
*    "needsCompletionConfirmation": false,
*    "expiresInMinutes": 2,
*    "offerLimit": 2,
*    "textMessage": "",
*    "scriptSample": "Welcome to the hotel",
*    "isTriggerEvent": true,
*    "__v": 0,
*    "directives": [
*        "Welcome the guest",
*        "Direct guest to front desk"
*    ],
*    "actors": [
*       "bellhop",
*        "frontDesk"
*    ]
*}
*
*
* @apiErrorExample Error-Response
*   HTTP/1.1 404 Not Found
*   {
*     "success": false,
*     "message": "Action not Updated."
*   }
*
*/

router.post('/', (request, response) => {
  const newAction = request.body;
  actionApi.addAction(newAction, (error, action) => {
    if (error) {
      if (error.name === 'ValidationError') {
        return response.status(404).json({
          success: false,
          message: 'Action Name already exists',
        });
      }
      return response.status(404).json({
        success: false,
        message: 'Error while creating Action',
      });
    } else {
      return response.status(201).json(action);
    }
  });
});

/**
* @api {put} /api/v1/actions/{id} Update Action
* @apiName  Update Action
* @apiGroup Actions
* @apiVersion 1.0.0
*
* @apiParam {String} name Name of Action
* @apiParam {String} description  description of Action
* @apiParam {String} needsCompletionConfirmation  CompletionConfirmation of Action
* @apiParam {Number} expiresInMinutes Expires InMinutes of Action
* @apiParam {String} offerLimit Offer Limit of Action
* @apiParam {String} textMessage Message  of Action
* @apiParam {String} scriptSample sample script for Action
* @apiParam {Boolean} isTriggerEvent TriggerEvent of Action 
* @apiParam {Array} directives Array of directives
* @apiParam {Array} actors  Array of actors
*
* @apiSuccessExample Success-Response
*   HTTP/1.1 201 OK
*{
*   "_id": "596364cbf1957c2c4c9f613d",
*    "name": "Enters Lobby",
*    "description": "Guest enters the lobby",
*    "needsCompletionConfirmation": false,
*    "expiresInMinutes": 2,
*    "offerLimit": 2,
*    "textMessage": "",
*    "scriptSample": "Welcome to the hotel",
*    "isTriggerEvent": true,
*    "__v": 0,
*    "directives": [
*        "Welcome the guest",
*        "Direct guest to front desk"
*    ],
*    "actors": [
*       "bellhop",
*        "frontDesk"
*    ]
*}
*
*
* @apiErrorExample Error-Response
*   HTTP/1.1 404 Not Found
*   {
*     "success": false,
*     "message": "Action not Updated."
*   }
*
*/
router.put('/:id', (request, response) => {
  const updatedAction = request.body;
  const id = request.params.id;
  actionApi.updateAction(updatedAction, id, (error, action) => {
    if (error) {
      if (error.code === 11000) {
        return response.status(404).json({
          success: false,
          message: 'Action Name already exists',
        });
      }
      return response.status(404).json({
        success: false,
        message: 'Action did not update',
      });
    } else {
      return response.status(201).json(action);
    }
  });
});

/**
* @api {get} /api/v1/actions Get All  Actions
* @apiName Get All Action 
* @apiGroup Actions
* @apiVersion 1.0.0
*
* 
* @apiSuccessExample Success-Response
*   HTTP/1.1 200 OK
*[  
*{
*   "_id": "596364cbf1957c2c4c9f613d",
*    "name": "Enters Lobby",
*    "description": "Guest enters the lobby",
*    "needsCompletionConfirmation": false,
*    "expiresInMinutes": 2,
*    "offerLimit": 2,
*    "textMessage": "",
*    "scriptSample": "Welcome to the hote",
*    "isTriggerEvent": true,
*    "__v": 0,
*    "directives": [
*        "Welcome the guest",
*        "Direct guest to front desk"
*    ],
*    "actors": [
*       "bellhop",
*        "frontDesk"
*    ]
*}
*]
* @apiErrorExample Error-Response
*   HTTP/1.1 404 Not Found
*{
*    "success": false,
*    "message": "Action not found "
*}
*
*/
router.get('/', (request, response) => {
  let mongofilter = {};
  if (request.query) {
    mongofilter = qs.parse(request.query);
  }

  actionApi.getActions(mongofilter, (error, action) => {
    if (error) {
      return response.status(404).json({
        success: false,
        message: 'Actions not found ',
      });
    } else {
      if (action != null) {
        return response.status(200).json(action);
      }
      return response.status(404).json({
        success: false,
        message: 'actions not found ',
      });
    }
  });
});

/**
* @api {get} /api/v1/actions/{id} Get  Action
* @apiName Get Action by Id
* @apiGroup Actions
* @apiVersion 1.0.0
*
* 
* @apiSuccessExample Success-Response
*   HTTP/1.1 200 OK
*{
*   "_id": "596364cbf1957c2c4c9f613d",
*    "name": "Enters Lobby",
*    "description": "Guest enters the lobby",
*    "needsCompletionConfirmation": false,
*    "expiresInMinutes": 2,
*    "offerLimit": 2,
*    "textMessage": "",
*    "scriptSample": "Welcome to the hote",
*    "isTriggerEvent": true,
*    "__v": 0,
*    "directives": [
*        "Welcome the guest",
*        "Direct guest to front desk"
*    ],
*    "actors": [
*       "bellhop",
*        "frontDesk"
*    ]
*}
*
* @apiErrorExample Error-Response
*   HTTP/1.1 404 Not Found
*{
*    "success": false,
*    "message": "Action not found "
*}
*
*/
router.get('/:id', (request, response) => {
  const id = request.params.id;
  actionApi.getAction(id, (error, action) => {
    if (error) {
      return response.status(404).json({
        success: false,
        message: 'Action not found ',
      });
    } else {
      if (action != null) {
        return response.status(200).json(action);
      }
      return response.status(404).json({
        success: false,
        message: 'Action not found ',
      });
    }
  });
});

/**
* @api {delete} /api/v1/actions/{id} Delete Action
* @apiName  Delete Action
* @apiGroup Actions
* @apiVersion 1.0.0
*
*  @apiParam {Number} id of Action
*
* @apiSuccessExample Success-Response
*   HTTP/1.1 204 OK
*
* @apiErrorExample Error-Response
*   HTTP/1.1 404 Not Found
*   {
*     "success": false,
*     "message": "Action not Found."
*   }
*
*/
router.delete('/:id', (request, response) => {
  const id = request.params.id;
  actionApi.deleteAction(id, (error, message) => {
    if (error) {
      return response.status(404).json({
        success: false,
        message: 'Action not found',
      });
    } else {
      return response
        .status(204)
        .json({ message: 'Action deleted successfully' });
    }
  });
});
