import {Request, Response} from 'express';
import {LOCATIONS} from "./db-data";
import {setTimeout} from 'timers';


export function updateLocation(req: Request, res: Response) {

  /*
    console.log("ERROR saving location!");
    res.sendStatus(500);
    return;
  */


  const id = req.params["id"],
    changes = req.body;

  console.log("Saving location changes", id, JSON.stringify(changes));

  const index = LOCATIONS.findIndex(location => location.id === Number(id));

  if (index === -1) {
    console.log(`Location with id ${id} not found`);
    res.sendStatus(404);
    return;
  }

  const location = LOCATIONS[index];

  const newLocation = {
    ...location,
    ...changes
  };

  LOCATIONS[index] = newLocation;

  console.log("new location version", newLocation);

  setTimeout(() => {

    res.status(200).json(newLocation);

  }, 500);

}
