import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuctionOverviewComponent } from './auction-overview/auction-overview.component';
import { NewAuctionComponent } from './new-auction/new-auction.component';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';

const routes: Routes = [
  { path: '', component: AuctionOverviewComponent },
  { path: 'overview', component: AuctionOverviewComponent },
  { path: 'auction', component: NewAuctionComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AuctionOverviewComponent,
    NewAuctionComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
