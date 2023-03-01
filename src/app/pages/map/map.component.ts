import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { LocationsStore } from '../../shared/services/locations.store';
import { Location, LocationResponse } from '../../core/models/location';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  public apiLoaded$: Observable<boolean>;
  public locations$!: Observable<LocationResponse>;

  public infoContent = '';
  public showSidePanel = false;
  public showContent = false;
  public selectedMarker!: Location;

  public center: google.maps.LatLngLiteral = {lat: 32, lng: 35};
  public zoom = 7;

  constructor(httpClient: HttpClient, private locationsStore: LocationsStore) {
    this.apiLoaded$ = httpClient
      .jsonp('https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit() {
    this.locations$ = this.locationsStore.loadAllLocations();
  }

  public openInfoWindow(marker: MapMarker, location: Location): void {
    if (this.infoWindow !== undefined) {
      this.infoContent = location.name;
      this.selectedMarker = location;
      this.showSidePanel = true;
      this.infoWindow.open(marker);
    }
  }

  public toggleSidePanel(): void {
    this.showSidePanel = !this.showSidePanel;
    this.showContent = false;
  }

  public onTransitionEnd(): void {
    this.showContent = this.showSidePanel;
  }
}
