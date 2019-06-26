import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';
import { Router } from '@angular/router';

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
              private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log(changes.symbol.currentValue);

    if(changes.symbol){
      this.avs.getStockQuote(this.symbol[0]).subscribe(
        info => this.information = info
      );
    }
    
  }

  loadChart(){
    this.router.navigate(['main']);
    //for now this routes to main but it will eventually 
    //load the charts for the chosen stock.
  }
}
