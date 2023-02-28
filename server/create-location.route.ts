import {Request, Response} from 'express';
import {LOCATIONS} from "./db-data";
import {setTimeout} from 'timers';


export function createLocation(req: Request, res: Response) {

  const newLocation = req.body;

  console.log("Creating new location", JSON.stringify(newLocation));

  // Generate a new unique ID for the location
  const newId = Math.max(...LOCATIONS.map(location => location.id)) + 1;

  // Create a new location object with the new ID and other properties
  const location = {
    id: newId,
    ...newLocation
  };

  // Add the new location to the LOCATIONS array
  LOCATIONS.push(location);

  console.log("new location", location);

  setTimeout(() => {

    res.status(200).json(location);

  }, 2000);
}
