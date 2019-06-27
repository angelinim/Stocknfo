import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss']
})
export class ChartContainerComponent implements OnInit {

  params: {};

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(
    params => {
      this.params = params;
      // console.log(params);
    });
   }

  ngOnInit() {

  }

}
