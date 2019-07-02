import { Component, OnInit, Input } from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';

@Component({
  selector: 'app-watchlist-card',
  templateUrl: './watchlist-card.component.html',
  styleUrls: ['./watchlist-card.component.scss']
})
export class WatchlistCardComponent implements OnInit {

  @Input() symbol;
  info: {} = {};

  constructor(private avs: AlphaVantageService) { }

  ngOnInit() {
    this.avs.getStockQuote(this.symbol).subscribe(
      res => this.info = res
    );
  }

}
