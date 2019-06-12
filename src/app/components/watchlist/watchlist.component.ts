import { Component, OnInit} from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';
import { stockNames } from 'src/app/interfaces/stock-information';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  constructor(private avs: AlphaVantageService) { }

  ngOnInit() {
  }

}
