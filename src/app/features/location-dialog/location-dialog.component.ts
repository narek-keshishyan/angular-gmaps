import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Location } from '../../core/models/location';
import { LocationsStore } from '../../shared/services/locations.store';
import { LoadingService } from '../../shared/loading/loading.service';
import { MessagesService } from '../../shared/messages/messages.service';

@Component({
    selector: 'location-dialog',
    templateUrl: './location-dialog.component.html',
    styleUrls: ['./location-dialog.component.css'],
    providers: [
        LoadingService,
        MessagesService
    ]
})
export class LocationDialogComponent {
  public form: FormGroup;
  public location: Location | null;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<LocationDialogComponent>,
      private locationsStore: LocationsStore,
      @Inject(MAT_DIALOG_DATA) location: Location,
  ) {
      this.location = location;

      this.form = fb.group({
        name: [location?.name ? location.name : '', Validators.required],
        lat: [location?.lat ? location.lat : '', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d+)?$')]],
        lng: [location?.lng ? location.lng : '', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d+)?$')]],
      });
  }

  get name() {
    return this.form.get('name');
  }

  get lat() {
    return this.form.get('lat');
  }

  get lng() {
    return this.form.get('lng');
  }

  save() {
    if (this.form.valid) {
      const changes = {...this.form.value, lat: Number(this.form.value.lat), lng: Number(this.form.value.lng)};
      console.log('changes', changes);
      if (this.location) {
        this.locationsStore.updateLocation(this.location.id, changes)
          .subscribe();
      } else {
        this.locationsStore.createLocation(changes)
          .subscribe();
      }
      this.dialogRef.close(changes);
    }
  }

  close() {
      this.dialogRef.close();
  }
}
