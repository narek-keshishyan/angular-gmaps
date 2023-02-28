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

    form: FormGroup;

    location: Location | null;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<LocationDialogComponent>,
        private locationsStore: LocationsStore,
        @Inject(MAT_DIALOG_DATA) location: Location,
    ) {
        this.location = location;

      this.form = fb.group({
        name: [location?.name ? location.name : '', Validators.required],
        lat: [location?.lat ? location.lat : '', Validators.required],
        lng: [location?.lng ? location.lng : '', Validators.required],
      });
    }

    save() {
      const changes = this.form.value;
      if (this.location) {
        this.locationsStore.updateLocation(this.location.id, changes)
          .subscribe();
      } else {
        this.locationsStore.createLocation(changes)
          .subscribe();
      }
      this.dialogRef.close(changes);
    }

    close() {
        this.dialogRef.close();
    }

}
