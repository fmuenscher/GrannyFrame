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
import {Image} from "./models/Image";

/*****************************************************************************
 * Define app and database connection                                        *
 *****************************************************************************/
const app = express();
let client: MongoClient;
let database: Db;

let imageList: Collection<Image>;

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

server.listen(port, async () => {
    console.log(`
        -------------------------------------------------------------
        Server started: https://${host}:${port}
        Database Config: mongodb://${mongo_host}:${mongo_port}
        Google Callback URL: ${process.env.G_CLIENT_CALLBACKURL}
        -------------------------------------------------------------
    `);
    // Start up database connection
    try {
        // Use connect method to connect to the Server
        client = await MongoClient.connect(`mongodb://${mongo_host}:${mongo_port}`, {
            useUnifiedTopology: true
        });
        database = client.db("drawio");
        imageList = database.collection<Image>("imageList");
        console.log("Database is connected ...\n");
    } catch (err) {
        console.error("Error connecting to database ...\n" + err);
    }
});

/*****************************************************************************
 * HTTP ROUTES                                                               *
 *****************************************************************************/
app.get('/images/:start/:limit', async (req: Request, res: Response) => {
    const start: number = Number(req.params.start);
    const limit: number = Number(req.params.limit);
    // Create database query and data
    const query: Object = {};

    // request images from database
    try {
        let localImageList: Image[];
        localImageList = await localImageList.find(query, {}).skip(start).limit(limit).sort({_id: -1}).toArray();
        let idList: string[] = [];
        localImageList.forEach(image => {
            idList.push(image["_id"])
        });
        // Send image list to client
        res.status(200).send({
            message: 'Successfully requested image list',
            idList: idList
        });
    } catch (err) {
        // Database operation has failed
        res.status(500).send({
            message: 'Database request failed: ' + err,
        });
    }
});

app.get('/image/:id', async (req: Request, res: Response) => {
    // Create database query and data
    const id: string = req.params.id;
    const query: Object = {_id: new ObjectID(id)};

    // request image from database
    try {
        let image: Image = await imageList.findOne(query);
        image.id = image["_id"];
        delete image["_id"];
        // Send image to client
        res.status(200).send({
            message: 'Successfully requested image by id: ' + id,
            image: image
        });
    } catch (err) {
        // Database operation has failed
        res.status(500).send({
            message: 'Database request failed: ' + err,
        });
    }
});