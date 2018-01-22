import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AppRoutingModule } from './/app-routing.module';
import { ApiService } from './api.service';
import { AllProductComponent } from './all-product/all-product.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    AllProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
