import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApphomeComponent } from './components/apphome/apphome.component';
import { PortalComponent } from './components/portal/portal.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QRCodeModule } from 'angular2-qrcode';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PhotosComponent } from './components/photos/photos.component';
import { UploadComponent } from './components/upload/upload.component';
import { LibraryComponent } from './components/library/library.component';
import { EditorComponent } from './components/editor/editor.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { OrderformComponent } from './components/orderform/orderform.component';
import { FooterComponent } from './components/footer/footer.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SalesComponent } from './components/sales/sales.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';










@NgModule({
  declarations: [
    AppComponent,
    ApphomeComponent,
    PortalComponent,
    RegistrationComponent,
    NavbarComponent,
    PhotosComponent,
    UploadComponent,
    LibraryComponent,
    EditorComponent,
    EditPageComponent,
    OrderformComponent,
    FooterComponent,
    CheckoutComponent,
    SalesComponent,
    ThankyouComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    QRCodeModule,
    HttpClientModule,
    FormsModule,


  ],

  providers: [LibraryComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}


