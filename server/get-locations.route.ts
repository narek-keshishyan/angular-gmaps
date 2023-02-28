import {Request, Response} from 'express';
import { LOCATIONS } from "./db-data";



export function getAllLocations(req: Request, res: Response) {

/*
    console.log("ERROR loading locations!");
    res.status(500).json({message: 'error occurred.'});
    return;
*/



        setTimeout(() => {

             res.status(200).json(LOCATIONS);

        }, 1500);


}


export function getLocationById(req: Request, res: Response) {

    const locationId = req.params["id"];

    const locations:any = Object.values(LOCATIONS);

    const location = locations.find((location: { id: string; }) => location.id == locationId);

    res.status(200).json(location);
}
