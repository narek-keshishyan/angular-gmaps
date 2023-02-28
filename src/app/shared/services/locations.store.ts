import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {LoadingService} from '../loading/loading.service';
import {MessagesService} from '../messages/messages.service';
import { Location } from '../../core/models/location';


@Injectable({
    providedIn: 'root'
})
export class LocationsStore {

    private subject = new BehaviorSubject<Location[]>([]);

    locations$ : Observable<Location[]> = this.subject.asObservable();

    constructor(
        private http:HttpClient,
        private loading: LoadingService,
        private messages: MessagesService) {

        this.loadLocations();

    }

    private loadLocations() {

        const loadLocations$ = this.http.get<Location[]>('/api/locations')
            .pipe(
                catchError(err => {
                    const message = "Could not load locations";
                    this.messages.showErrors(message);
                    console.log(message, err);
                    return throwError(err);
                }),
                tap(locations => this.subject.next(locations))
            );

        this.loading.showLoaderUntilCompleted(loadLocations$)
            .subscribe();

    }

    saveLocation(locationId:string, changes: Partial<Location>): Observable<any> {

        const locations = this.subject.getValue();

        const index = locations.findIndex(location => location.id == locationId);

        const newLocation: Location = {
          ...locations[index],
          ...changes
        };

        const newLocations: Location[] = locations.slice(0);

        newLocations[index] = newLocation;

        this.subject.next(newLocations);

        return this.http.put(`/api/locations/${locationId}`, changes)
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

}
