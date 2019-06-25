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
  functionStr: string = "TIME_SERIES_INTRADAY";
  symbolStr: string = "MSFT";
  intervalStr: string = "60min"
  private urlForRequest: string = 'https://www.alphavantage.co/query?apikey='+this.API_KEY;

  
  constructor(private http: HttpClient) { }


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
  


  //this returns the open high low close information retrieved from the alphavantage server
  //eventually it will take function(intraday, daily, weekly, monthly), symbol, and
  //interval (if intraday) from the user but for now it works by changing the strings in this class.
  getOHLCinfo(): Observable<stockInformationOHLC>{
    console.log(this.urlForRequest);

    try{
      return this.http.get<stockInformationOHLC>(this.urlForRequest+'&function='+
      this.functionStr+'&symbol='+this.symbolStr+'&interval='+this.intervalStr)
      .pipe(
        //tap(info => console.log(JSON.stringify(info))),
        map(
          (info: stockInformationOHLC) => info = {
          metadata: info['Meta Data'],
          timeSeries: info['Time Series '+'('+this.intervalStr+')']
        }        
        ));
    }
    catch(err){
      console.log("ERROR: "+err);
    }
     
  }

  getRSIinfo(){
    return this.http.get(this.urlForRequest+'&function=RSI&series_type=open&time_period=14&interval='+this.intervalStr+'&symbol='+this.symbolStr).
    pipe(
      map(info => info["Technical Analysis: RSI"]),
      tap(info => console.log(info))
    );
  }

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
