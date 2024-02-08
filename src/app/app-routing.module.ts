import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesSearchComponent } from './movies-search/movies-search.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './services/guards/auth-guard/auth-guard.service';


const routes: Routes = [
  {
    path: '', component: MoviesSearchComponent, canActivate: [AuthGuardService], children: [
    ]
  },

  { path: 'login', component: LoginComponent, data: { title: 'Sign In' } },
  { path: 'signup', component: SignupComponent, data: { title: 'Sign up component' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
