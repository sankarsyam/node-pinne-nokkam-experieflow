import express, { Router } from 'express';
import bodyParser from 'body-parser';
import triggerAPI from '../api/triggerApi';

const router = Router();
module.exports = router;
/**

* @api {get} /api/v1/triggers List of triggers
* @apiName List of Triggers
* @apiGroup Triggers

* @apiVersion 1.0.0
*
*
* @apiSuccessExample Success-Response
*   HTTP/1.1 200 OK*   
*[
*    {
*        "categoryName": "location",
*        "triggers": [
*            {
*                "_id": "59631d79f5908c2c8cfef6e9",
*                "type": "location",
*                "subType": "spa",
*                "location": "59631d79f5908c2c8cfef6e8",
*                "action": null,
*                "complaint": null,
*                "__v": 0
*            },
*     }
*     .
*     .
*]
*/

router.get('/', (request, response) => {
  triggerAPI.getTriggers((error, triggers) => {
    if (error) {
      return response.status(404).json({
        success: false,
        message: 'List not found ',
      });
    } else {
      return response.status(200).json(triggers);
    }
  });
});
/**
* @api {get} /api/v1/triggers/{triggerCategory} Get triggers for specific trigger Category
* @apiName triggers for specific trigger category 
* @apiGroup Triggers
* @apiVersion 1.0.0
*
* @apiParam {String} location locations, profiles, complaints etc.

* @apiSuccessExample Success-Response
*   HTTP/1.1 200 OK*   
*[
*    {
*        "_id": "59673542b39b8d548c6362ac",
*        "type": "action",
*        "subType": null,
*        "location": null,
*        "action": "59673542b39b8d548c6362ab",
*        "complaint": null,
*        "__v": 0
*    }
*]
*
* @apiErrorExample Error-Response
* HTTP/1.1 404 Not Found
*{
*    "success": false,
*    "message": "List not found"
*}
*/

router.get('/:triggerCategory', (request, response) => {
  const category = request.params.triggerCategory;

  triggerAPI.getTriggerCategories(category, (error, triggers) => {
    if (error) {
      return response.status(404).json({
        success: false,
        message: 'List not found ',
      });
    } else {
      if (null != triggers) {
        return response.status(200).send(triggers);
      }
      return response.status(404).json({
        success: false,
        message: 'List not found',
      });
    }
  });
});
