import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesSearchComponent } from './movies-search/movies-search.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [

  { path: '', component: MoviesSearchComponent, data: { title: 'Sign In' } },
  { path: 'login', component: LoginComponent, data: { title: 'Sign In' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
