import * as express from 'express';
import {Application} from "express";
import { getAllLocations, getLocationById } from "./get-locations.route";
import { updateLocation } from './update-location.route';
import { createLocation } from './create-location.route';

const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

const cors = require('cors');

const PORT = 8080;

app.use(cors({origin: true}));

app.route('/api/locations').get(getAllLocations);

app.route('/api/locations/:id').get(getLocationById);

app.route('/api/locations').post(createLocation);

app.route('/api/locations/:id').put(updateLocation);

const httpServer = app.listen(PORT, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address()["port"]);
});



