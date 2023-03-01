export interface Location {
  id: number;
  lat: number;
  lng: number;
  name: string;
}

export interface LocationResponse {
  results: Location[];
  currentPage: number;
  totalPages: number;
  length: number;
}
