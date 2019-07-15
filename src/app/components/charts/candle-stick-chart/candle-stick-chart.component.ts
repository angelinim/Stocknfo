import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';
import { stockInformationOHLC } from 'src/app/interfaces/stock-information';

@Component({
  selector: 'app-candle-stick-chart',
  templateUrl: './candle-stick-chart.component.html',
  styleUrls: ['./candle-stick-chart.component.scss']
})
export class CandleStickChartComponent implements OnInit, OnChanges {

  @Input() params;

  readyToPlot: boolean = false;
  chartTitle = '';
  chartType = 'CandlestickChart';
  
  options = {
    backgroundColor: '#303030',
    chartArea: {left:80,top:12,width:'100%',height:'90%'},
    hAxis: {textPosition: 'none', gridlines: {count: 25}},
    vAxis: {textStyle:{ color: 'snow'},
            format: 'currency'
    },
    legend: {position: 'none'},
    candlestick: {
      fallingColor: { strokeWidth: 2, stroke:'#a52714' }, // red
      risingColor: { strokeWidth: 2, fill: '#0f9d58' },   // green
    }
  };
  columnNames = ['Date/Time', "OHLC", "B", "C", "D"];
  data: stockInformationOHLC;
  OHLCdataPoints: any[] = [];

  constructor(private avs: AlphaVantageService) { }

 ngOnInit() {}

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    // console.log("CHANGES FROM CANDLESTICK:")
    // console.log(changes.params.currentValue.interval);
    this.readyToPlot = false;
    this.avs.getOHLCinfo(changes.params.currentValue.symbol, changes.params.currentValue.interval).subscribe(
      OHLCdata=>{
        this.generateDataPointLists(OHLCdata);
      }
    );
  }



  generateDataPointLists(jsonData: stockInformationOHLC): void{

    const entries = Object.entries(jsonData.timeSeries);

    this.OHLCdataPoints = [];

    //going to leave this here. using the other loop for now because
    //getting weekly or monthly data will generate a graph with
    //20 years worth of data and I want this to be uniform for 
    //any calls to the database.

    // for(let entry of entries){
    //   //console.log(entry[0]);
    //   this.OHLCdataPoints.unshift([entry[0], parseFloat(entry[1]["3. low"]),
    //                                 parseFloat(entry[1]["1. open"]),
    //                                 parseFloat(entry[1]["4. close"]),
    //                                 parseFloat(entry[1]["2. high"])]);
    // }

    for(let i = 0; i < 100; i++){
      this.OHLCdataPoints.unshift([entries[i][0], parseFloat(entries[i][1]["3. low"]),
      parseFloat(entries[i][1]["1. open"]),
      parseFloat(entries[i][1]["4. close"]),
      parseFloat(entries[i][1]["2. high"])]);
    }
    this.readyToPlot = true;
    // console.log(this.OHLCdataPoints);
  }

}
