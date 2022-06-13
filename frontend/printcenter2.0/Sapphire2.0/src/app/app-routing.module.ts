import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ApphomeComponent } from './components/apphome/apphome.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { EditorComponent } from './components/editor/editor.component';
import { LibraryComponent } from './components/library/library.component';
import { OrderformComponent } from './components/orderform/orderform.component';
import { PhotosComponent } from './components/photos/photos.component';
import { PortalComponent } from './components/portal/portal.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SalesComponent } from './components/sales/sales.component';
import { AuthguardService } from './services/authguard.service';


const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'portal', component: PortalComponent },
  { path: '', component: ApphomeComponent, canActivate: [AuthguardService] },
  { path: 'photos', component: PhotosComponent, canActivate: [AuthguardService] },
  { path: 'library', component: LibraryComponent, canActivate: [AuthguardService] },
  { path: 'editor', component: EditorComponent, canActivate: [AuthguardService] },
  { path: 'edit-page', component: EditPageComponent, canActivate: [AuthguardService] },
  { path: 'orderform', component: OrderformComponent, canActivate: [AuthguardService]},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'sales', component: SalesComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
