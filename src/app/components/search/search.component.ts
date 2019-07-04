import { Component, OnInit} from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';
import { stockNames } from 'src/app/interfaces/stock-information';
import { forkJoin } from 'rxjs';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  _stockName;
  stockSymbol;
  stockList;

  searchNameLength: number = 0;

  set stockName(stkname: string){
    console.log('New name: ' +stkname);
    this._stockName = stkname;

    this.avs.getSymbolSearch(stkname).subscribe(
      res => {
        this.stockList = res;
        // console.log(this.stockList)
        }
    );

    this.searchNameLength++;
    console.log(this._stockName);
  }

  get stockName(){
    return this._stockName;
  }

  searchStock(){
    this.stockSymbol = this.stockName;
    this.searchNameLength = 0;
    console.log("SENDING:  " + this.stockSymbol);
  }

  constructor(private avs: AlphaVantageService, private userService: UserServiceService) { }

  ngOnInit() {
  }
}
