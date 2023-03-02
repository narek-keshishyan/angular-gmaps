import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { MapComponent } from './pages/map/map.component';
import { LocationsComponent } from './pages/locations/locations.component';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'locations', component: LocationsComponent },
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  { path: '**', redirectTo: '/map', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
