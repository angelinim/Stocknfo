import { Component, OnInit } from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';
import { stockInformationOHLC } from 'src/app/interfaces/stock-information';
//var CanvasJS = require('src/app/canvasjs.min.js');

@Component({
  selector: 'app-candle-stick-chart',
  templateUrl: './candle-stick-chart.component.html',
  styleUrls: ['./candle-stick-chart.component.scss']
})
export class CandleStickChartComponent implements OnInit {

  data: stockInformationOHLC;
  OHLCdataPoints: any[] = [];

  constructor(private avs: AlphaVantageService) { }

  ngOnInit() {
    this.avs.getOHLCinfo().subscribe(
      OHLCdata=>{
        this.data = {
          metadata: OHLCdata['Meta Data'],
          timeSeries: OHLCdata['Time Series '+'('+OHLCdata['Meta Data']['4. Interval']+')']
        };
        //console.log(this.data.timeSeries);
        this.generateDataPointLists(this.data);
      }
    )
  }


  generateDataPointLists(jsonData: stockInformationOHLC): void{

    const entries = Object.entries(jsonData.timeSeries);

    for(let entry of entries){
      this.OHLCdataPoints.push({x: entry[0], y: [+entry[1]["1. open"],
                                                 +entry[1]["2. high"],
                                                 +entry[1]["3. low"],
                                                 +entry[1]["4. close"],]});
    }
    console.log(this.OHLCdataPoints);
    
  }

}
