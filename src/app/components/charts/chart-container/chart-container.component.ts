import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface parameters {
  symbol: string,
  interval: string
}

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss']
})
export class ChartContainerComponent implements OnInit {

  params: parameters;
  intervalSelect: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(
    params => {
      this.params = {
        symbol: params.symbol,
        interval: params.interval
      };
      this.intervalSelect= params.interval;
      console.log(params);
    });
   }

  ngOnInit() {

  }

  onIntervalChange(){
    this.params.interval = this.intervalSelect;
    this.router.navigate(['chart', {symbol: this.params.symbol, interval: this.params.interval}])
  }

}
