import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AlphaVantageService } from 'src/app/services/alpha-vantage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-stock-quote',
  templateUrl: './stock-quote.component.html',
  styleUrls: ['./stock-quote.component.scss']
})
export class StockQuoteComponent implements OnInit, OnChanges {


  //this is the stock symbol input FROM the search component
  @Input() symbol: string;
  //this is the default choice on the dropdown menu for charts
  intervalSelect = "weekly"
  information: {} = {};//stores the stock information (i.e. the quote)



  constructor(private avs: AlphaVantageService,
              private userService: UserServiceService,
              public snackbar: MatSnackBar,
              private router: Router) {
                
               }

  ngOnInit() {
    console.log(this.symbol);
  }

  //the symbol changes when a new company is searched for in the search component
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

    if(changes.symbol){
      //empties the information for the stock
      //this makes the quote component more 
      //responsive.
      this.information = {};
      this.avs.getStockQuote(this.symbol).subscribe(
        info => {
            this.information = info;
            console.log(this.information)
        }
      );
    }
    
  }

  //this checks to see if the quote has values in it
  //basically if one were to search for a stock that 
  //doesn't exist then this would return false and would remove the quote
  //from the screen
  emptyQuote(){
    //if the length of the quote is 0 it is considered empty
    //basic logic
    if(Object.keys(this.information).length === 0){
      return false;
    }
    return true;
  }

  //this will navigate to the chart component with the entered symbol
  //and the interval that the user choses in this component.
  loadChart(){
    this.router.navigate(['chart', {symbol: this.information["01. symbol"], interval: this.intervalSelect}]);
  }

  addQuoteToWatchlist(){

    this.userService.addToWatchlist(this.symbol.toLowerCase()).then(
      response=> {
        if(response.isSuccess){
          this.snackbar.open(response.message,"",{duration: 4000});
        }
        else{
          this.snackbar.open(response.message);
        }
      }
    );
  }

}
