import { Component, OnInit } from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';
import { stockInformationOHLC } from 'src/app/interfaces/stock-information';

@Component({
  selector: 'app-candle-stick-chart',
  templateUrl: './candle-stick-chart.component.html',
  styleUrls: ['./candle-stick-chart.component.scss']
})
export class CandleStickChartComponent implements OnInit {

  chartTitle = '';
  chartType = 'CandlestickChart';
  chartWidth = '1700';
  chartHeight = '800';
  
  options = {
    legend: 'none',
    backgroundColor: '#303030',
    chartArea: {left:150,top:40,width:'90%',height:'75%'},
    hAxis: { textStyle: {color: 'snow'},
              minValue: 100
    },
    vAxis: {textStyle:{ color: 'snow'},
            format: 'currency'
    },
    candlestick: {
      fallingColor: { strokeWidth: 1, stroke:'#a52714' }, // red
      risingColor: { strokeWidth: 1, fill: '#0f9d58' },   // green
    }
  };
  columnNames = ['Date/Time', "A", "B", "C", "D"];
  data: stockInformationOHLC;
  OHLCdataPoints: any[] = [];

  constructor(private avs: AlphaVantageService) { }

  ngOnInit() {
    this.avs.getOHLCinfo().subscribe(
      OHLCdata=>{
        this.data = {
          metadata: OHLCdata['Meta Data'],
          timeSeries: OHLCdata['Time Series '+'('+OHLCdata['Meta Data']['4. Interval']+')']
        },
        //console.log(this.data.timeSeries);
        this.generateDataPointLists(this.data);
      }
    );
  }


  generateDataPointLists(jsonData: stockInformationOHLC): void{

    const entries = Object.entries(jsonData.timeSeries);

    for(let entry of entries){
      this.OHLCdataPoints.unshift([entry[0], parseFloat(entry[1]["3. low"]),
                                    parseFloat(entry[1]["1. open"]),
                                    parseFloat(entry[1]["4. close"]),
                                    parseFloat(entry[1]["2. high"])]);
    }
    console.log(this.OHLCdataPoints);
    
  }

}
