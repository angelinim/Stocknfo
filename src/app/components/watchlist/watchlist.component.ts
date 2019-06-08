import { Component, OnInit} from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';
import { stockNames } from 'src/app/interfaces/stock-information';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  _stockName: string;
  stockList: string[] = [];
  nameList: string[] = [];

  testList: stockNames[];

  set stockName(stkname: string){
    //console.log('New name: ' +stkname);
    this._stockName = stkname.toUpperCase();
    this.avs.getSymbolSearch(stkname).subscribe(
      res => {
        this.stockList = res.map(x => x["1. symbol"]);
        this.nameList = res.map(x => x["2. name"]);
      }
      
    );
    
    console.log(this._stockName);
  }

  get stockName(){
    return this._stockName;
  }

  constructor(private avs: AlphaVantageService) { }

  ngOnInit() {
  }

}
