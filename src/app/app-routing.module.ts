import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { ChartContainerComponent } from './components/charts/chart-container/chart-container.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  // {path: 'main', component: MainNavigationComponent},
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {path: 'watchlist', component: WatchlistComponent},
  {path: 'login', component: LoginComponent},
  {path: 'chart', component: ChartContainerComponent},

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
