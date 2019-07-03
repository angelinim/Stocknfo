import { Component, OnInit } from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';

@Component({
  selector: 'app-home-charts',
  templateUrl: './home-charts.component.html',
  styleUrls: ['./home-charts.component.scss']
})
export class HomeChartsComponent implements OnInit {

  readyToPlotDOW: boolean = false;
  readyToPlotQQQ: boolean = false;
  chartTitle = 'DOW Adjusted Daily';
  chartTitleQQQ = 'S&P 500 Daily Adjusted (QQQ)'
  chartType = 'LineChart';
  dataPointsDOW: any[] = [];
  dataPointsQQQ: any[] = [];
  options = {
    backgroundColor: '#303030',
    chartArea: {left:80,top:50,width:'100%',height:'85%'},
    hAxis: {textPosition: 'none'},
    vAxis: {textStyle:{ color: 'snow'},
            format: 'currency'},
    legend: {position: 'none'},
    crosshair: {trigger: 'both',
                color: "red"},
    titleTextStyle: {color: "snow"}
  };

  constructor(private avs: AlphaVantageService) { }

  ngOnInit() {
    this.avs.getDailyAdjustedDOW().subscribe(
      data => this.generateDataPointsDOW(data)
    );

    this.avs.getDailyAdjustedQQQ().subscribe(
      data => this.generateDataPointsQQQ(data)
    );
  }


  generateDataPointsDOW(info){
    const entries = Object.entries(info);

    for(let entry of entries){
      this.dataPointsDOW.unshift([entry[0], +entry[1]["5. adjusted close"]])
    }

    this.readyToPlotDOW = true;
  }

  generateDataPointsQQQ(info){
    const entries = Object.entries(info);

    for(let entry of entries){
      this.dataPointsQQQ.unshift([entry[0], +entry[1]["5. adjusted close"]])
    }

    this.readyToPlotQQQ = true;
  }
}
