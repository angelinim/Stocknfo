import { Component, OnInit, Input } from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-watchlist-card',
  templateUrl: './watchlist-card.component.html',
  styleUrls: ['./watchlist-card.component.scss']
})
export class WatchlistCardComponent implements OnInit {

  @Input() symbol;
  info: {} = {};

  constructor(private avs: AlphaVantageService, private router: Router, private userService: UserServiceService) { }

  ngOnInit() {
    this.avs.getStockQuote(this.symbol).subscribe(
      res => this.info = res
    );
  }

  loadChart(){
    this.router.navigate(['main/chart', {symbol: this.info["01. symbol"], interval: "weekly"}]);
  }

  removeStock(){
    const symbol: string = this.info["01. symbol"]

    console.log(this.info["01. symbol"])
    this.userService.removeFromWatchlist(symbol.toLowerCase());
  }

}
