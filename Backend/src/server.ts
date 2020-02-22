import express = require ('express');
import bodyParser = require("body-parser");
import socket = require('socket.io');
import {Request, Response} from 'express';
import * as http from "http";

import {
    Collection,
    Db,
    DeleteWriteOpResultObject, FindOneOptions,
    InsertOneWriteOpResult,
    MongoClient,
    ObjectID,
    UpdateWriteOpResult
} from "mongodb";

/*****************************************************************************
 * Define app and database connection                                        *
 *****************************************************************************/
const app = express();
let client: MongoClient;
let database: Db;

/*****************************************************************************
 * Configure web-app                                                         *
 *****************************************************************************/
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

/*****************************************************************************
 * Start server and connect to database                                      *
 *****************************************************************************/
let port = process.env.PORT || 8443;
let host = process.env.API_URL || 'localhost';
let mongo_host = process.env.MONGO_HOST || 'localhost';
let mongo_port = process.env.MONGO_PORT || 27017;
let production: boolean = JSON.parse((process.env.PRODUCTION || 'false'));

let server = http.createServer(app);