import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar/navbar.component';
import { WelcomeComponent } from './features/sections/welcome/welcome/welcome.component';
import { AdvertComponent } from './features/sections/advert/advert/advert.component';
import { AboutComponent } from './features/sections/about/about/about.component';
import { ContactComponent } from './features/sections/contact/contact/contact.component';
import { FooterComponent } from './core/components/footer/footer/footer.component';
import { InfobarComponent } from './core/components/footer/footerinfo/infobar/infobar.component';
import { HomeComponent } from './features/sections/home/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    AdvertComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    InfobarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
