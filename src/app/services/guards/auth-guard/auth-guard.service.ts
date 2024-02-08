import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarService, SNACKBAR_TYPES } from '../../snackbar/snackbar.service';
import { TokenService } from '../../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private token: TokenService, private snackbar: SnackbarService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.token.getToken()) {

      var is_cashier: boolean = this.token.getUser()?.groups.find(x => x.indexOf('Cashier') > -1) != undefined
      var is_admin: boolean = this.token.getUser()?.groups.find(x => x.indexOf('Admin') > -1) != undefined

      return true
    }

    this.snackbar.openSnackBar("Session expired. Please sign in again.", "Dismiss", 3)
    this.router.navigate(['/login'], { queryParams: { redirect: state.url, login: true } });
    return false;
  }
}
