import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  apiLoaded: Observable<boolean>;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  public infoContent = '';
  public showSidePanel = false;
  public selectedMarker: any;

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 4;

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) {
      this.markerPositions.push(event.latLng.toJSON());
    }
  }

  openInfoWindow(marker: MapMarker, content: google.maps.LatLngLiteral) {
    if (this.infoWindow !== undefined) {
      this.infoContent = content.lat.toString();
      this.selectedMarker = content;
      this.showSidePanel = true;
      this.infoWindow.open(marker);
    }
  }

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  toggleSidePanel() {
    this.showSidePanel = !this.showSidePanel;
  }

  ngOnInit() {
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
