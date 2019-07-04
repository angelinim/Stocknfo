import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit{
 
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
    this.router.navigate(['main/login']);
  }

  watchlist(){
    this.router.navigate(['main/watchlist']);
  }

  search(){
    this.router.navigate(['main/search']);
  }

  home(){
    this.router.navigate(['main/home'])
  }

}
