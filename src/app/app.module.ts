import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule,
         MatIconModule, MatListModule, MatAutocompleteModule, 
         MatInputModule, MatCardModule, MatSelectModule, MatTableModule } from '@angular/material';
import { CandleStickChartComponent } from './components/charts/candle-stick-chart/candle-stick-chart.component';


import { GoogleChartsModule } from 'angular-google-charts';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { SearchComponent } from './components/search/search.component';
import { StockQuoteComponent } from './components/stock-quote/stock-quote.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavigationComponent,
    CandleStickChartComponent,
    WatchlistComponent,
    SearchComponent,
    StockQuoteComponent
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
    FormsModule,
    GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
