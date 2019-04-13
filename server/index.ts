import express = require('express');
import bodyParser = require('body-parser');
import morgan = require('morgan');
import path = require('path')
import ip = require('ip');
import * as data from './data/data'

module main{
    const PORT = 5000

    export class app{
        private core:express.Application
    
        constructor(){
            this.core = express()
            this.core.use(morgan('short'))
            this.core.use(express.static(path.resolve('../client/build/')))
            this.core.use(express.static(path.resolve('./data/img')))
            this.core.use(bodyParser.json())

            this.core.get('/api/getData', (req, res) => {
                res.contentType('application/json');
                res.write(JSON.stringify(data))
                res.end()
            })

            this.core.get('/api/img/:name', (req, res) => {
                res.sendFile(path.resolve(`./data/img/${req.params.name}`))
            })

            this.core.get('*', (req, res) => {
                res.sendFile(path.resolve('../client/build/index.html'));
            })

            this.core.post('/api/decrypt',(req, res) => {
                let response = {
                    type:false,
                    message: "",
                    subMsg: ""
                }

                if(req.body.value == 'SPSTAR') response.type = true;
                response.type?response.message = "+853 王嘉怡 (接線後請自我介紹) ":"wrong_message."

                res.send(response)
            })
        }
    
        public init(){
            this.core.listen(PORT, ()=>{
                console.log(`App is listening on ${ip.address()}:${PORT}`)
            })
        }
    }
}

var webApp = new main.app()
webApp.init()