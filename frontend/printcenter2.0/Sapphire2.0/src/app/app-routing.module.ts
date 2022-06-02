import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ApphomeComponent } from './components/apphome/apphome.component';
import { PhotosComponent } from './components/photos/photos.component';
import { PortalComponent } from './components/portal/portal.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { AuthguardService } from './services/authguard.service';


const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'portal', component: PortalComponent },
  { path: '', component: ApphomeComponent, canActivate: [AuthguardService] },
  { path: 'photos', component: PhotosComponent, canActivate: [AuthguardService] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
