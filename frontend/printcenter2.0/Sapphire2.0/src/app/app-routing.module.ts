import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ApphomeComponent } from './components/apphome/apphome.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { EditorComponent } from './components/editor/editor.component';
import { LibraryComponent } from './components/library/library.component';
import { OrdersPageComponent } from './components/orders-page/orders-page.component';
import { PhotosComponent } from './components/photos/photos.component';
import { PortalComponent } from './components/portal/portal.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { AuthguardService } from './services/authguard.service';


const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'portal', component: PortalComponent },
  { path: '', component: ApphomeComponent, canActivate: [AuthguardService] },
  { path: 'photos', component: PhotosComponent, canActivate: [AuthguardService] },
  { path: 'library', component: LibraryComponent, canActivate: [AuthguardService] },
  { path: 'editor', component: EditorComponent, canActivate: [AuthguardService] },
  { path: 'edit-page', component: EditPageComponent, canActivate: [AuthguardService] },
  { path: 'orders-page', component: OrdersPageComponent, canActivate: [AuthguardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
