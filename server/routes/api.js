const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


// connect
const connection = (closure)=> {
    return MongoClient.connect('mongodb://localhost:27017', (err, client)=> {
        if (err) return console.log(err);

        var db = client.db('mgmapp');
        closure(db);
        
       
    });
};


// error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};


// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res)=> {
    connection( (db)=> {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err)=> {
                sendError(err, res);
            });
    });
});


module.exports = router;
