import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';

@Component({
  selector: 'app-rsi-chart',
  templateUrl: './rsi-chart.component.html',
  styleUrls: ['./rsi-chart.component.scss']
})
export class RsiChartComponent implements OnInit, OnChanges {

  @Input() params;

  RSIdataPoints = [];
  chartType = "LineChart";
  chartTitle= "RSI"
  options = {
    titlePosition: 'in',
    titleTextStyle: {color: "snow", fontSize: 16},
    backgroundColor: '#303030',
    chartArea: {left:80,top:12,width:'100%',height:'90%'},
    vAxis: {textStyle:{ color: 'snow'},
            ticks: [0, 30, 50, 70, 100]
    },
    hAxis: {textPosition: 'none'},
    crosshair: {trigger: 'both',
                color: "red"},
    legend: {position: 'none'}
  }
  readyToPlot: boolean = false;

  constructor(private avs: AlphaVantageService) { }

  ngOnInit() {}

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.readyToPlot = false;

    this.avs.getRSIinfo(changes.params.currentValue.symbol, changes.params.currentValue.interval).subscribe(
      res => this.generateDataPoints(res)
    );
  }

  generateDataPoints(info){
    const entries = Object.entries(info);

    this.RSIdataPoints = [];

    //gets the first 100 datapoints only. That is the
    //amount returned opon calling for OHLC data
    for(let i = 0; i<100; i++){
      this.RSIdataPoints.unshift([entries[i][0], +entries[i][1]["RSI"]])
    }
    // console.log(this.RSIdataPoints);
    this.readyToPlot = true;
  }

}
