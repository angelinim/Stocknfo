import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-quote',
  templateUrl: './stock-quote.component.html',
  styleUrls: ['./stock-quote.component.scss']
})
export class StockQuoteComponent implements OnInit, OnChanges {


  @Input() symbol;
  intervalSelect = "weekly"
  information: {} = {};



  constructor(private avs: AlphaVantageService,
              private router: Router) {
                
               }

  ngOnInit() {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    if(changes.symbol){
      this.avs.getStockQuote(this.symbol[0]).subscribe(
        info => this.information = info
      );
    }
    
  }

  loadChart(){
    this.router.navigate(['main/chart', {symbol: this.information["01. symbol"], interval: this.intervalSelect}]);
  }
}
