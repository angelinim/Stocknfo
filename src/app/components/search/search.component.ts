import { Component, OnInit} from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';
import { stockNames } from 'src/app/interfaces/stock-information';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  _stockName: string;
  stockList: string[] = [];
  nameList: string[] = [];
  stockSymbol: string = '';

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

  searchStock(){
    this.stockSymbol = this.stockName;
    console.log(this.stockSymbol);
  }

  constructor(private avs: AlphaVantageService) { }

  ngOnInit() {
  }
}
