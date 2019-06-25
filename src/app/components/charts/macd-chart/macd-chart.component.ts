import { Component, OnInit } from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';

@Component({
  selector: 'app-macd-chart',
  templateUrl: './macd-chart.component.html',
  styleUrls: ['./macd-chart.component.scss']
})
export class MacdChartComponent implements OnInit {
  MACDdataPoints = [];
  readyToPlot: boolean = false

  chartType = "ComboChart"
  chartTitle= "MACD"
  chartHeight= 275;
  options = {
    series: {0: {type: "line", color: "blue"}, 1: {type: "line", color: "red"}, 2: {type: "steppedArea", color: "green"}},
    backgroundColor: '#303030',
    chartArea: {left:80,top:0,width:'100%',height:'90%'},
    vAxis: {textStyle:{ color: 'snow'},
            ticks: [-2, -1, 0, 1, 2]
    },
    hAxis: {textPosition: 'none', gridlines: {count: 25}},
    crosshair: {trigger: 'both',
                color: "red"},
    legend: {position: 'none'}
  }

  constructor(private avs: AlphaVantageService) { }

  ngOnInit() {
    this.avs.getMACDinfo().subscribe(
      res => this.generateDataPoints(res)
    )
  }

  generateDataPoints(info){
    const entries = Object.entries(info);

    for(let i=0; i<100; i++){
      this.MACDdataPoints.unshift([entries[i][0], +entries[i][1]["MACD"], +entries[i][1]["MACD_Signal"], +entries[i][1]["MACD_Hist"]]);
    }
    this.readyToPlot = true;
    console.log(this.MACDdataPoints)
  }
}
