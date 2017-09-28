import express, { Router } from 'express';
import seedAPI from '../api/seedApi';
const router = Router();

module.exports = router;

/**
* @api {get} /api/v1/seed Seed data
* @apiName  Seed data
* @apiGroup Seed
* @apiVersion 1.0.0
* @apiDescription This API can be used for clearing the data and set to inital state.
*
* @apiSuccessExample Success-Response
*   HTTP/1.1 200 OK
*  {
*    "success": true,
*    "message": "seed completed"
*  }
*
*
* @apiErrorExample Error-Response
*   HTTP/1.1 404 Not Found
*   {
*     "success": false,
*     "message": "Seed error"
*   }
*
*/
router.get('/', (request, response) => {
  seedAPI.seed(error => {
    if (error) {
      return response.status(404).json({
        success: false,
        message: 'Seed error',
      });
    } else {
      return response
        .status(200)
        .json({ success: true, message: 'seed completed' });
    }
  });
});
