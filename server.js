var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express'),
    options = {
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.crt')
    },
    app = express()
        .use(express.logger('dev'))
        .use(express.compress())
        .use(express.bodyParser())
        .post('/push/v1/pushPackages/:pushId', function(req, res) {
            res.sendfile('AWSPush.pushpackage.zip');
        })
        .post('/push/v1/devices/:deviceToken/registrations/:pushId', function(req, res) {
            console.warn(req.params.deviceToken, 'subscribed');
            res.send(200);
        })
        .delete('/push/v1/devices/:deviceToken/registrations/:pushId', function(req, res) {
            console.warn(req.params.deviceToken, 'unsubscribed');
            res.send(200);
        })
        .post('/push/v1/log', function(req, res) {
            console.warn('Receieved logs', req.body);
            res.send(200);
        })
        .use(express.static('web'));
        
http.createServer(app).listen(80);
https.createServer(options, app).listen(443);
