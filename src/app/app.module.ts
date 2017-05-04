import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { Routes, RouterModule } from '@angular/router';

import { FitServiceService } from './fit-service.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AuthComponent } from './auth/auth.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { SedentaryComponent } from './sedentary/sedentary.component';
import { ErrorsComponent } from './errors/errors.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'sedentary', component: SedentaryComponent },
  { path: 'errors', component: ErrorsComponent }
];

var firebaseConf = {
  apiKey: "AIzaSyAGNwRYzH1Tm-GDrFxqeO5wXetI6dLzz3E",
  authDomain: "fitnesstracker-4cca4.firebaseapp.com",
  databaseURL: "https://fitnesstracker-4cca4.firebaseio.com",
  projectId: "fitnesstracker-4cca4",
  storageBucket: "fitnesstracker-4cca4.appspot.com",
  messagingSenderId: "978209569602"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    AuthComponent,
    ProfileComponent,
    SettingsComponent,
    SedentaryComponent,
    ErrorsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConf),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [FitServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
