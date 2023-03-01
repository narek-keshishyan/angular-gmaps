import {Request, Response} from 'express';
import { LOCATIONS } from "./db-data";

export function getLocationsByParams(req: Request, res: Response) {
  /*
      console.log("ERROR loading locations!");
      res.status(500).json({message: 'error occurred.'});
      return;
  */

  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const length = LOCATIONS.length;

  // sort the locations based on the query parameters
  const sortBy = req.query.sort_by as string || 'name';
  const orderBy = req.query.order_by as string || 'asc';
  let sortedLocations = [...LOCATIONS];
  sortedLocations.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return orderBy === 'desc' ? -1 : 1;
    }
    if (a[sortBy] > b[sortBy]) {
      return orderBy === 'asc' ? 1 : -1;
    }
    return 0;
  });

  let results;
  let totalPages;
  if (!req.query.page && !req.query.limit) {
    results = sortedLocations;
    totalPages = 1;
  } else {
    results = sortedLocations.slice(startIndex, endIndex);
    totalPages = Math.ceil(sortedLocations.length / limit);
  }

  setTimeout(() => {
    res.status(200).json({
      results,
      currentPage: page,
      totalPages,
      length
    });
  }, 500);
}




export function getLocationById(req: Request, res: Response) {

    const locationId = req.params["id"];

    const locations:any = Object.values(LOCATIONS);

    const location = locations.find((location: { id: string; }) => location.id == locationId);

    res.status(200).json(location);
}
