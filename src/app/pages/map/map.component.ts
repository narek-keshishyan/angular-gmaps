import { Component, OnInit, ViewChild } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { HttpClient } from '@angular/common/http';
import { LocationsStore } from '../../shared/services/locations.store';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  apiLoaded: Observable<boolean>;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  public infoContent = '';
  public showSidePanel = false;
  public showContent = false;
  public selectedMarker: any;
  public locations$!: Observable<any>;

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 4;

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) {
      this.markerPositions.push(event.latLng.toJSON());
    }
  }

  openInfoWindow(marker: MapMarker, location: any) {
    if (this.infoWindow !== undefined) {
      this.infoContent = location.name;
      this.selectedMarker = location;
      this.showSidePanel = true;
      this.infoWindow.open(marker);
    }
  }

  constructor(httpClient: HttpClient, private locationsStore: LocationsStore) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  toggleSidePanel() {
    this.showSidePanel = !this.showSidePanel;
    this.showContent = false;
  }

  onTransitionEnd() {
    if (this.showSidePanel) {
      this.showContent = true;
    } else {
      this.showContent = false;
    }
  }

  ngOnInit() {
    this.locations$ = this.locationsStore.locations$;

    this.markerPositions = [
      {
        lat:  35.00524,
        lng: 32.06384
      },
      {
        lat:  35.10524,
        lng: 32.16384
      },
      {
        lat:  35.56524,
        lng: 32.45638
      },
      {
        lat:  35.46524,
        lng: 32.15638
      },
      {
        lat:  35.16524,
        lng: 33.45638
      }
    ];
  }

}
