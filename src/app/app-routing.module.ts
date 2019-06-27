import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { ChartContainerComponent } from './components/charts/chart-container/chart-container.component';

const routes: Routes = [
  {path: 'main', component: MainNavigationComponent, children: [
    {path: 'search', component: SearchComponent},
    {path: 'watchlist', component: WatchlistComponent},
    {path: 'login', component: LoginComponent},
    {path: 'chart', component: ChartContainerComponent}
  ]},
  // {path: '', redirectTo: 'main', pathMatch: 'full'},
  // {path: '**', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
