import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isLoggedIn: boolean = false;
  ngOnInit(): void {
    
    this.userService.currentUser$.subscribe(user =>{
      if(user){this.isLoggedIn = true}
      else{this.isLoggedIn = false}
    })
  }

  constructor(private router: Router,
              private userService: UserServiceService) {}

  logout(){
    this.userService.logout();
  }

  login(){
    this.router.navigate(['login']);
  }

  watchlist(){
    this.router.navigate(['watchlist']);
  }

  search(){
    this.router.navigate(['search']);
  }

  home(){
    this.router.navigate(['home'])
  }
}
