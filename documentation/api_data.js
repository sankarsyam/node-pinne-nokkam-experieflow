define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/actions",
    "title": "Create Action",
    "name": "Create_Action",
    "group": "Actions",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "needsCompletionConfirmation",
            "description": "<p>CompletionConfirmation of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "expiresInMinutes",
            "description": "<p>Expires InMinutes of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "offerLimit",
            "description": "<p>Offer Limit of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "textMessage",
            "description": "<p>Message  of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "scriptSample",
            "description": "<p>script of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isTriggerEvent",
            "description": "<p>TriggerEvent of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "directives",
            "description": "<p>Array of directives</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "actors",
            "description": "<p>Array of actors</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "  HTTP/1.1 201 OK\n{\n   \"name\": \"Enters Lobby\",\n   \"description\": \"Guest enters the lobby\",\n   \"needsCompletionConfirmation\": false,\n   \"expiresInMinutes\": 2,\n   \"offerLimit\": 2,\n   \"textMessage\": \"\",\n   \"scriptSample\": \"Welcome to the hotel\",\n   \"isTriggerEvent\": true,\n   \"__v\": 0,\n   \"directives\": [\n       \"Welcome the guest\",\n       \"Direct guest to front desk\"\n   ],\n   \"actors\": [\n      \"bellhop\",\n       \"frontDesk\"\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false,\n  \"message\": \"Action not Updated.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/actions.js",
    "groupTitle": "Actions"
  },
  {
    "type": "delete",
    "url": "/api/v1/actions/{id}",
    "title": "Delete Action",
    "name": "Delete_Action",
    "group": "Actions",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>of Action</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false,\n  \"message\": \"Action not Found.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/actions.js",
    "groupTitle": "Actions"
  },
  {
    "type": "get",
    "url": "/api/v1/actions/{id}",
    "title": "Get  Action",
    "name": "Get_Action_by_Id",
    "group": "Actions",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "  HTTP/1.1 200 OK\n{\n  \"_id\": \"596364cbf1957c2c4c9f613d\",\n   \"name\": \"Enters Lobby\",\n   \"description\": \"Guest enters the lobby\",\n   \"needsCompletionConfirmation\": false,\n   \"expiresInMinutes\": 2,\n   \"offerLimit\": 2,\n   \"textMessage\": \"\",\n   \"scriptSample\": \"Welcome to the hote\",\n   \"isTriggerEvent\": true,\n   \"__v\": 0,\n   \"directives\": [\n       \"Welcome the guest\",\n       \"Direct guest to front desk\"\n   ],\n   \"actors\": [\n      \"bellhop\",\n       \"frontDesk\"\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "  HTTP/1.1 404 Not Found\n{\n   \"success\": false,\n   \"message\": \"Action not found \"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/actions.js",
    "groupTitle": "Actions"
  },
  {
    "type": "get",
    "url": "/api/v1/actions",
    "title": "Get All  Actions",
    "name": "Get_All_Action",
    "group": "Actions",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "  HTTP/1.1 200 OK\n[  \n{\n  \"_id\": \"596364cbf1957c2c4c9f613d\",\n   \"name\": \"Enters Lobby\",\n   \"description\": \"Guest enters the lobby\",\n   \"needsCompletionConfirmation\": false,\n   \"expiresInMinutes\": 2,\n   \"offerLimit\": 2,\n   \"textMessage\": \"\",\n   \"scriptSample\": \"Welcome to the hote\",\n   \"isTriggerEvent\": true,\n   \"__v\": 0,\n   \"directives\": [\n       \"Welcome the guest\",\n       \"Direct guest to front desk\"\n   ],\n   \"actors\": [\n      \"bellhop\",\n       \"frontDesk\"\n   ]\n}\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "  HTTP/1.1 404 Not Found\n{\n   \"success\": false,\n   \"message\": \"Action not found \"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/actions.js",
    "groupTitle": "Actions"
  },
  {
    "type": "put",
    "url": "/api/v1/actions/{id}",
    "title": "Update Action",
    "name": "Update_Action",
    "group": "Actions",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "needsCompletionConfirmation",
            "description": "<p>CompletionConfirmation of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "expiresInMinutes",
            "description": "<p>Expires InMinutes of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "offerLimit",
            "description": "<p>Offer Limit of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "textMessage",
            "description": "<p>Message  of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "scriptSample",
            "description": "<p>sample script for Action</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isTriggerEvent",
            "description": "<p>TriggerEvent of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "directives",
            "description": "<p>Array of directives</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "actors",
            "description": "<p>Array of actors</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "  HTTP/1.1 201 OK\n{\n  \"_id\": \"596364cbf1957c2c4c9f613d\",\n   \"name\": \"Enters Lobby\",\n   \"description\": \"Guest enters the lobby\",\n   \"needsCompletionConfirmation\": false,\n   \"expiresInMinutes\": 2,\n   \"offerLimit\": 2,\n   \"textMessage\": \"\",\n   \"scriptSample\": \"Welcome to the hotel\",\n   \"isTriggerEvent\": true,\n   \"__v\": 0,\n   \"directives\": [\n       \"Welcome the guest\",\n       \"Direct guest to front desk\"\n   ],\n   \"actors\": [\n      \"bellhop\",\n       \"frontDesk\"\n   ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false,\n  \"message\": \"Action not Updated.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/actions.js",
    "groupTitle": "Actions"
  },
  {
    "type": "post",
    "url": "/api/v1/flows",
    "title": "Create Flow",
    "name": "Create_Experience_Flow",
    "group": "ExperienceFlows",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Flow Name</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isActive",
            "description": "<p>Flow is Active or not</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "triggerCriteria",
            "description": "<p>List of triggers IDs and associated values</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "action",
            "description": "<p>Action Object of Flow</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action.name",
            "description": "<p>name of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action.description",
            "description": "<p>description of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "action.needsCompletionConfirmation",
            "description": "<p>Completion confirmation of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "action.expiresInMinutes",
            "description": "<p>Expiry time of action</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "action.actors",
            "description": "<p>List of actors liek bellhop,guest..</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "action.offerLimit",
            "description": "<p>Offer limit</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action.textMessage",
            "description": "<p>Text Message for the  action</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action.scriptSample",
            "description": "<p>Script sample for the action</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "action.directives",
            "description": "<p>Directives for the action</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "action.isTriggerEvent",
            "description": "<p>checks whether Trigger is an event</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "  {\n  \"_id\": \"595a50748207c11c9cf227f0\",\n   \"action\": {\n       \"_id\": \"595a50748207c11c9cf227ef\",\n       \"name\": \"Room Ready\",\n       \"description\": \"The Guest’s room was isready, please give keys\",\n       \"needsCompletionConfirmation\": true,\n       \"expiresInMinutes\": 5,\n       \"offerLimit\": 1,\n       \"textMessage\": \"\",\n       \"scriptSample\": \"Hey Sree, Room is ready .Enjoy your day.\",\n       \"isTriggerEvent\": true,\n       \"__v\": 0,\n       \"directives\": [\n           \"Give guest a relaxed service\"\n       ],\n       \"actors\": [\n           \"bellhop\",\n           \"frontDesk\"\n       ]\n   },\n   \"name\": \"Guest Arrival\",\n   \"isActive\": false,\n   \"__v\": 0,\n       \"triggerCriteria\": [\n          {\n             \"trigger\" : {\n\n               \"_id\": \"595a32da6d297a20a026ba52\",\n               \"type\": \"Room\",\n               \"subType\": \"isReady\",\n               \"action\": null,\n               \"values\": [\n                       \"True\",\n                       \"False\"\n                      ]\n             },\n             \"value\": \"True\",\n          }\n       ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false,\n  \"message\": \"Flow not Created.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/flows.js",
    "groupTitle": "ExperienceFlows"
  },
  {
    "type": "delete",
    "url": "/api/v1/flows/{id}",
    "title": "Delete Flow",
    "name": "Delete_Experience_Flow",
    "group": "ExperienceFlows",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Flow Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false,\n  \"message\": \"Flow not Found.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/flows.js",
    "groupTitle": "ExperienceFlows"
  },
  {
    "type": "get",
    "url": "/api/v1/flows?triggerType=Room&triggerSubType=isReady&triggerSubTypeValue=true",
    "title": "Get All Experience flows with queries",
    "name": "Get_All_Experience_flows",
    "group": "ExperienceFlows",
    "version": "1.0.0",
    "description": "<p>This API is used for getting flows matching filter criteria It can have values triggerType ,triggerSubType ,triggerSubTypeValue and combination of these values</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "query",
            "description": "<p>Searchable fields can have values of flow Object and trigger object</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "  HTTP/1.1 200 OK\n  [    \n  {\n       \"_id\": \"595a32da6d297a20a026ba55\",\n       \"action\": {\n           \"_id\": \"595a32da6d297a20a026ba54\",\n           \"name\": \"Room Ready\",\n           \"description\": \"The Guest’s room was isready, please give keys\",\n           \"needsCompletionConfirmation\": true,\n           \"expiresInMinutes\": 5,\n           \"offerLimit\": 1,\n           \"textMessage\": \"\",\n           \"scriptSample\": \"Hey Sree, Room is ready .Enjoy your day.\",\n           \"isTriggerEvent\": true,\n           \"__v\": 0,\n \n         \"directives\": [\n               \"Give guest a relaxed service\"\n           ],\n           \"actors\": [\n               \"bellhop\",\n               \"frontDesk\"\n           ]\n       },\n       \"name\": \"Guest Arrival\",\n       \"isActive\": false,\n       \"__v\": 0,\n       \"triggerCriteria\": [\n          {\n             \"trigger\" : {\n\n               \"_id\": \"595a32da6d297a20a026ba52\",\n               \"type\": \"Room\",\n               \"subType\": \"isReady\",\n               \"action\": null,\n               \"values\": [\n                       \"True\",\n                       \"False\"\n                      ]\n             },\n             \"value\": \"True\",\n          }\n       ]\n   }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false,\n  \"message\": \"Flow not found .\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/flows.js",
    "groupTitle": "ExperienceFlows"
  },
  {
    "type": "get",
    "url": "/api/v1/flows/{id}",
    "title": "Get Experience Flow",
    "name": "Get_All_Profiles",
    "group": "ExperienceFlows",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "  HTTP/1.1 200 OK\n  [    \n  {\n       \"_id\": \"595a32da6d297a20a026ba55\",\n       \"action\": {\n           \"_id\": \"595a32da6d297a20a026ba54\",\n           \"name\": \"Room Ready\",\n           \"description\": \"The Guest’s room was isready, please give keys\",\n           \"needsCompletionConfirmation\": true,\n           \"expiresInMinutes\": 5,\n           \"offerLimit\": 1,\n           \"textMessage\": \"\",\n           \"scriptSample\": \"Hey Sree, Room is ready .Enjoy your day.\",\n           \"isTriggerEvent\": true,\n           \"__v\": 0,\n \n         \"directives\": [\n               \"Give guest a relaxed service\"\n           ],\n           \"actors\": [\n               \"bellhop\",\n               \"frontDesk\"\n           ]\n       },\n       \"name\": \"Guest Arrival\",\n       \"isActive\": false,\n       \"__v\": 0,\n       \"triggerCriteria\": [\n          {\n             \"trigger\" : {\n\n               \"_id\": \"595a32da6d297a20a026ba52\",\n               \"type\": \"Room\",\n               \"subType\": \"isReady\",\n               \"action\": null,\n               \"values\": [\n                       \"True\",\n                       \"False\"\n                      ]\n             },\n             \"value\": \"True\",\n          }\n       ]\n   }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false,\n  \"message\": \"Flow not found .\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/flows.js",
    "groupTitle": "ExperienceFlows"
  },
  {
    "type": "put",
    "url": "/api/v1/flows/{id}",
    "title": "Update Flow",
    "name": "Update_Experience_Flow",
    "group": "ExperienceFlows",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Flow Name</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isActive",
            "description": "<p>Flow is Active or not</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "triggerCriteria",
            "description": "<p>List of triggers IDs and associated values</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "action",
            "description": "<p>Action Object of Flow</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action.name",
            "description": "<p>name of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action.description",
            "description": "<p>description of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "action.needsCompletionConfirmation",
            "description": "<p>Completion confirmation of Action</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "action.expiresInMinutes",
            "description": "<p>Expiry time of action</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "action.actors",
            "description": "<p>List of actors liek bellhop,guest..</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "action.offerLimit",
            "description": "<p>Offer limit</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action.textMessage",
            "description": "<p>Text Message for the  action</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action.scriptSample",
            "description": "<p>Script sample for the action</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "action.directives",
            "description": "<p>Directives for the action</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "action.isTriggerEvent",
            "description": "<p>checks whether Trigger is an event</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "  {\n  \"_id\": \"595a50748207c11c9cf227f0\",\n   \"action\": {\n       \"_id\": \"595a50748207c11c9cf227ef\",\n       \"name\": \"Room Ready\",\n       \"description\": \"The Guest’s room was isready, please give keys\",\n       \"needsCompletionConfirmation\": true,\n       \"expiresInMinutes\": 5,\n       \"offerLimit\": 1,\n       \"textMessage\": \"\",\n       \"scriptSample\": \"Hey Sree, Room is ready .Enjoy your day.\",\n       \"isTriggerEvent\": true,\n       \"__v\": 0,\n       \"directives\": [\n           \"Give guest a relaxed service\"\n       ],\n       \"actors\": [\n           \"bellhop\",\n           \"frontDesk\"\n       ]\n   },\n   \"name\": \"Guest Arrival\",\n   \"isActive\": false,\n   \"__v\": 0,\n       \"triggerCriteria\": [\n          {\n             \"trigger\" : {\n\n               \"_id\": \"595a32da6d297a20a026ba52\",\n               \"type\": \"Room\",\n               \"subType\": \"isReady\",\n               \"action\": null,\n               \"values\": [\n                       \"True\",\n                       \"False\"\n                      ]\n             },\n             \"value\": \"True\",\n          }\n       ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false,\n  \"message\": \"Flow not Updated.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/flows.js",
    "groupTitle": "ExperienceFlows"
  },
  {
    "type": "get",
    "url": "/api/v1/seed",
    "title": "Seed data",
    "name": "Seed_data",
    "group": "Seed",
    "version": "1.0.0",
    "description": "<p>This API can be used for clearing the data and set to inital state.</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": " HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"message\": \"seed completed\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"success\": false,\n  \"message\": \"Seed error\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/seed.js",
    "groupTitle": "Seed"
  },
  {
    "type": "get",
    "url": "/api/v1/triggers",
    "title": "List of triggers",
    "name": "List_of_Triggers",
    "group": "Triggers",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "  HTTP/1.1 200 OK*   \n[\n   {\n       \"categoryName\": \"location\",\n       \"triggers\": [\n           {\n               \"_id\": \"59631d79f5908c2c8cfef6e9\",\n               \"type\": \"location\",\n               \"subType\": \"spa\",\n               \"location\": \"59631d79f5908c2c8cfef6e8\",\n               \"action\": null,\n               \"complaint\": null,\n               \"__v\": 0\n           },\n    }\n    .\n    .\n]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/triggers.js",
    "groupTitle": "Triggers"
  },
  {
    "type": "get",
    "url": "/api/v1/triggers/{triggerCategory}",
    "title": "Get triggers for specific trigger Category",
    "name": "triggers_for_specific_trigger_category",
    "group": "Triggers",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "location",
            "description": "<p>locations, profiles, complaints etc.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "  HTTP/1.1 200 OK*   \n[\n   {\n       \"_id\": \"59673542b39b8d548c6362ac\",\n       \"type\": \"action\",\n       \"subType\": null,\n       \"location\": null,\n       \"action\": \"59673542b39b8d548c6362ab\",\n       \"complaint\": null,\n       \"__v\": 0\n   }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response",
          "content": "HTTP/1.1 404 Not Found\n{\n   \"success\": false,\n   \"message\": \"List not found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/triggers.js",
    "groupTitle": "Triggers"
  }
] });
