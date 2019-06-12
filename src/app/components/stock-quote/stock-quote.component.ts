import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';

@Component({
  selector: 'app-stock-quote',
  templateUrl: './stock-quote.component.html',
  styleUrls: ['./stock-quote.component.scss']
})
export class StockQuoteComponent implements OnInit, OnChanges {


  @Input() symbol: string = '';
  information: {} = {};



  constructor(private avs: AlphaVantageService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log(changes.symbol.currentValue);

    if(changes.symbol){
      this.avs.getStockQuote(this.symbol).subscribe(
        info => this.information = info
      );
    }
    
  }
}
