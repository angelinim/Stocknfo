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
    this.avs.getStockQuote(this.symbol).subscribe(
      info => this.information = info
    );
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    throw new Error("Method not implemented.");
  }
}
