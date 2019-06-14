import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  URI: string = "http://localhost:3000/watchlist"

  constructor(private http: HttpClient) { }


  getWatchlist(){
    this.http.get(this.URI)
  }
}
