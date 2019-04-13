"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var path = require("path");
var ip = require("ip");
var data = require("./data/data");
var main;
(function (main) {
    var PORT = 5000;
    var app = (function () {
        function app() {
            this.core = express();
            this.core.use(morgan('short'));
            this.core.use(express.static(path.resolve('../client/build/')));
            this.core.use(express.static(path.resolve('./data/img')));
            this.core.use(bodyParser.json());
            this.core.get('/api/getData', function (req, res) {
                res.contentType('application/json');
                res.write(JSON.stringify(data));
                res.end();
            });
            this.core.get('/api/img/:name', function (req, res) {
                res.sendFile(path.resolve("./data/img/" + req.params.name));
            });
            this.core.get('*', function (req, res) {
                res.sendFile(path.resolve('../client/build/index.html'));
            });
            this.core.post('/api/decrypt', function (req, res) {
                var response = {
                    type: false,
                    message: ""
                };
                if (req.body.value == 'SPSTAR')
                    response.type = true;
                response.type ? response.message = "+853 王嘉怡" : "wrong_message.";
                res.send(response);
            });
        }
        app.prototype.init = function () {
            this.core.listen(PORT, function () {
                console.log("App is listening on " + ip.address() + ":" + PORT);
            });
        };
        return app;
    }());
    main.app = app;
})(main || (main = {}));
var webApp = new main.app();
webApp.init();
