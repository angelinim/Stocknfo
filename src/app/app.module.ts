import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule,
         MatIconModule, MatListModule, MatAutocompleteModule, 
         MatInputModule, MatCardModule, MatSelectModule, MatTableModule,
         MatSnackBarModule } from '@angular/material';
import { CandleStickChartComponent } from './components/charts/candle-stick-chart/candle-stick-chart.component';


import { GoogleChartsModule } from 'angular-google-charts';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { SearchComponent } from './components/search/search.component';
import { StockQuoteComponent } from './components/stock-quote/stock-quote.component';
import { WatchlistCardComponent } from './components/watchlist-card/watchlist-card.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { RsiChartComponent } from './components/charts/rsi-chart/rsi-chart.component';
import { MacdChartComponent } from './components/charts/macd-chart/macd-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavigationComponent,
    CandleStickChartComponent,
    WatchlistComponent,
    SearchComponent,
    StockQuoteComponent,
    WatchlistCardComponent,
    LoginComponent,
    RsiChartComponent,
    MacdChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
