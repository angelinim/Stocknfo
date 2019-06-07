import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatAutocompleteModule,MatInputModule, MatCardModule } from '@angular/material';
import { CandleStickChartComponent } from './components/charts/candle-stick-chart/candle-stick-chart.component';


import { GoogleChartsModule } from 'angular-google-charts';
import { WatchlistComponent } from './components/watchlist/watchlist.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavigationComponent,
    CandleStickChartComponent,
    WatchlistComponent
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
    GoogleChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
