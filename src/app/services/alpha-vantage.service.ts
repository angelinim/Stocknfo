import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, startWith, filter } from 'rxjs/operators'
import { stockInformationOHLC } from 'src/app/interfaces/stock-information';
import { stockNames } from 'src/app/interfaces/stock-information';

import * as config from 'src/app/config.js';

@Injectable({
  providedIn: 'root'
})
export class AlphaVantageService {

  
  private API_KEY: string = config.alphaVantageKey;
  private urlForRequest: string = 'https://www.alphavantage.co/query?apikey='+this.API_KEY;

  
  constructor(private http: HttpClient) { }


  //function to get stock names for the autocomplete
  //in the search component.
  getSymbolSearch(symbol: string){

    try{
      return this.http.get(this.urlForRequest+'&function=SYMBOL_SEARCH&keywords='+symbol)
      .pipe(
        map(info => info["bestMatches"].map(x => [x["1. symbol"], x["2. name"]])),
        tap(info => console.log(info))
      );
    }
    catch(err){
      console.log("ERROR: "+err);
    }
  }
  


  // will take function(intraday, daily, weekly, monthly), symbol, and
  //interval (if intraday) from the user and fetch appropriate data
  getOHLCinfo(symbol: string, interval: string): Observable<stockInformationOHLC>{
    
    try{
    if(interval === "daily"){
      return this.http.get<stockInformationOHLC>(this.urlForRequest + '&function=TIME_SERIES_DAILY&symbol='+symbol)
      .pipe(
        map(
          (info: stockInformationOHLC) => info = {
            metadata: info['Meta Data'],
            timeSeries: info['Time Series (Daily)']
          }));
    }
    else if(interval === "weekly"){
      return this.http.get<stockInformationOHLC>(this.urlForRequest + '&function=TIME_SERIES_WEEKLY&symbol='+symbol)
      .pipe(
        map(
          (info: stockInformationOHLC) => info = {
            metadata: info['Meta Data'],
            timeSeries: info['Weekly Time Series']
          }));
    }
    else if(interval === "monthly"){
      return this.http.get<stockInformationOHLC>(this.urlForRequest + '&function=TIME_SERIES_MONTHLY&symbol='+symbol)
      .pipe(
        map(
          (info: stockInformationOHLC) => info = {
            metadata: info['Meta Data'],
            timeSeries: info['Monthly Time Series']
          }));;
    }

    return this.http.get<stockInformationOHLC>(this.urlForRequest + '&function=TIME_SERIES_INTRADAY&symbol='+symbol+'&interval='+interval)
    .pipe(
      tap(info => console.log(info)),
      map(
        (info: stockInformationOHLC) => info = {
        metadata: info['Meta Data'],
        timeSeries: info['Time Series '+'('+interval+')']
      }));
    }
    catch(err){
      console.log("ERROR GETTING CANDLESTICK DATA: " +err.message)
    }
     
  }

  //retrieves RSI data from alpha vantage using a user inputted symbol and 
  //time interval
  getRSIinfo(symbol: string, interval: string){
    
    try{
    return this.http.get(this.urlForRequest+'&function=RSI&series_type=open&time_period=14&interval='+interval+'&symbol='+symbol).
    pipe(
      map(info => info["Technical Analysis: RSI"]),
      // tap(info => console.log(info))
    );
    }
    catch(err){
      console.log("ERROR GETTING RSI DATA: "+err.message);
    }
  }


  //retrieves MACD data from alpha vantage using a user inputted symbol and 
  //time interval... Time period will default to 14 as it is the most
  //commonly used interval for traders.
  getMACDinfo(symbol: string, interval: string){
    
    try{
    return this.http.get(this.urlForRequest+'&function=MACD&series_type=open&time_period=14&interval='+interval+'&symbol='+symbol).
    pipe(
      map(info => info["Technical Analysis: MACD"]),
      // tap(info => console.log(info))
    );
    }
    catch(err){
      console.log("ERROR GETTING MACD DATA: "+err.message);
    }
  }

  //gets general stock information from some user inputted symbol value
  getStockQuote(symbol: string){
    try{
      return this.http.get(this.urlForRequest+'&function=GLOBAL_QUOTE&symbol='+symbol).pipe(
        map(info => info["Global Quote"])
      );
    }
    catch(err){

    }
  }


}
