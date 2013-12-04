var express = require('express'),

    app = express()
        .use(express.logger('dev'))
        .use(express.compress())
        .use(express.json())
        .post('/push/v1/pushPackages/:pushId', function(req, res) {
            res.sendfile(__dirname + '/AWSPush.pushpackage.zip');
        })
        .post('/push/v1/devices/:deviceToken/registrations/:pushId', function(req, res) {
            console.warn(req.params.deviceToken, 'subscribed');
        })
        .delete('/push/v1/devices/:deviceToken/registrations/:pushId', function(req, res) {
            console.warn(req.params.deviceToken, 'unsubscribed');            
        })
        .post('/push/v1/log', function(req, res) {
            console.warn('Receieved logs', req.body);
        })
        .use(express.static(__dirname + '/web'))
        .listen(port, function() {
            console.log("Listening on " + port);
        });
