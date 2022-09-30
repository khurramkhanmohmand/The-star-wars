import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    NavbarComponent,
    WorkInProgressComponent,
    DetailPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
