import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {LoadingService} from '../loading/loading.service';
import {MessagesService} from '../messages/messages.service';
import { Location, LocationResponse } from '../../core/models/location';


@Injectable({
    providedIn: 'root'
})
export class LocationsStore {
    private subject = new BehaviorSubject<LocationResponse>({
      results: [],
      currentPage: 0,
      totalPages: 0,
      length: 0
    });
  private subjectByParams = new BehaviorSubject<LocationResponse>({
    results: [],
    currentPage: 0,
    totalPages: 0,
    length: 0
  });

    locations$ : Observable<LocationResponse> = this.subjectByParams.asObservable();

    constructor(
        private http:HttpClient,
        private loading: LoadingService,
        private messages: MessagesService) {
          this.loadLocationsByParams(1,10);
    }

    public loadAllLocations(): Observable<LocationResponse> {
        const loadLocations$ = this.http.get<LocationResponse>('/api/locations')
            .pipe(
                catchError(err => {
                    const message = "Could not load locations";
                    this.messages.showErrors(message);
                    console.log(message, err);
                    return throwError(err);
                }),
                tap(locations => this.subject.next(locations)),
                shareReplay()
            );

        return this.loading.showLoaderUntilCompleted(loadLocations$);

    }

  public loadLocationsByParams(page: number, limit: number): void {
    const locationsByParams$ = this.http.get<LocationResponse>('/api/locations', {
      params: {
        page,
        limit
      }
    })
      .pipe(
        catchError(err => {
          const message = "Could not load locations";
          this.messages.showErrors(message);
          console.log(message, err);
          return throwError(err);
        }),
        tap(locations => this.subjectByParams.next(locations)),
        shareReplay()
      );

    this.loading.showLoaderUntilCompleted(locationsByParams$).subscribe();

  }

  public customTst(page: number, limit: number, sortBy = 'id', orderBy = 'asc'): Observable<LocationResponse> {
    const locationsByParams$ = this.http.get<LocationResponse>('/api/locations', {
      params: {
        page,
        limit,
        sort_by: sortBy,
        order_by: orderBy
      }
    })
      .pipe(
        catchError(err => {
          const message = "Could not load locations";
          this.messages.showErrors(message);
          console.log(message, err);
          return throwError(err);
        }),
        tap(locations => this.subjectByParams.next(locations)),
        shareReplay()
      );

    return this.loading.showLoaderUntilCompleted(locationsByParams$);

  }

  updateLocation(locationId: number, changes: Partial<Location>): Observable<Location> {
      const locations = this.subjectByParams.getValue();

      const index = locations.results.findIndex(location => location.id === locationId);

      const newLocation: Location = {
        ...locations.results[index],
        ...changes
      };

      const newLocations: Location[] = locations.results.slice(0);
      newLocations[index] = newLocation;

      this.subjectByParams.next({currentPage: locations.currentPage, totalPages: locations.totalPages, length: locations.length, results: newLocations});

      return this.http.put<Location>(`/api/locations/${locationId}`, changes)
          .pipe(
              catchError(err => {
                  const message = "Could not save location";
                  console.log(message, err);
                  this.messages.showErrors(message);
                  return throwError(err);
              }),
              shareReplay()
          );
  }

  createLocation(location: Location): Observable<Location> {
    const locations = this.subjectByParams.getValue();

    const newLocation: Location = {
      ...location
    };

    const newLocations: Location[] = [...locations.results, newLocation];

    this.subjectByParams.next({currentPage: locations.currentPage, totalPages: locations.totalPages, length: locations.length+1, results: locations.results});

    return this.http.post<Location>('/api/locations', newLocation)
      .pipe(
        catchError(err => {
          const message = "Could not create location";
          console.log(message, err);
          this.messages.showErrors(message);
          return throwError(err);
        }),
        shareReplay()
      );
  }
}
