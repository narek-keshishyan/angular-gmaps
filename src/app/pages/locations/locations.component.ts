import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationsStore } from '../../shared/services/locations.store';
import { Location } from '../../core/models/location';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { LocationDialogComponent } from '../../features/location-dialog/location-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationsComponent implements OnInit {
  public locationsByParams$!: Observable<any>;

  public length = 30;
  public pageSize = 10;
  public pageIndex = 0;
  public pageSizeOptions = [10, 50, 100];

  public hidePageSize = false;
  public showPageSizeOptions = true;
  public showFirstLastButtons = true;
  public disabled = false;

  public pageEvent!: PageEvent;

  constructor(private locationsStore: LocationsStore, public dialog: MatDialog) {}

  ngOnInit() {
    this.locationsByParams$ = this.locationsStore.locations$;
  }

  public sortData(sort: Sort): void {
    this.locationsByParams$ = this.locationsStore.customTst(this.pageIndex+1, this.pageSize, sort.active, sort.direction);
  }

  public handlePageEvent(e: PageEvent): void {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.locationsByParams$ = this.locationsStore.customTst(this.pageIndex+1, this.pageSize);
  }

  public openAddModal(): void {
    const dialogRef = this.dialog.open(LocationDialogComponent, this.createDialogConfig());
    dialogRef.afterClosed()
      .pipe(
        filter(val => !!val),
      )
      .subscribe();
  }

  public openEditModal(location: Location): void {
    const dialogRef = this.dialog.open(LocationDialogComponent, this.createDialogConfig(location));
    dialogRef.afterClosed()
      .pipe(
        filter(val => !!val),
      )
      .subscribe();
  }

  private createDialogConfig(location?: Location): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";
    dialogConfig.data = location || null;
    return dialogConfig;
  }
}
