import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApphomeComponent } from './components/apphome/apphome.component';
import { PortalComponent } from './components/portal/portal.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PhotosComponent } from './components/photos/photos.component';
import { UploadComponent } from './components/upload/upload.component';
import { LibraryComponent } from './components/library/library.component';





@NgModule({
  declarations: [
    AppComponent,
    ApphomeComponent,
    PortalComponent,
    RegistrationComponent,

    NavbarComponent,
     PhotosComponent,
     UploadComponent,
     LibraryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatSliderModule,
    HttpClientModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
