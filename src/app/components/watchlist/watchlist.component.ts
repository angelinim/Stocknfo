import { Component, OnInit} from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';
import { stockNames } from 'src/app/interfaces/stock-information';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  watchList: string[] = [];

  constructor(private avs: AlphaVantageService,
              private user: UserServiceService) { }

  ngOnInit() {
    this.user.currentUser$.subscribe(x => this.watchList = x.watchlist);
  }

}
