import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarService } from '../../snackbar/snackbar.service';
import { TokenService } from '../../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private token: TokenService, private snackbar: SnackbarService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const role = route.data['role'];

    var has_role: boolean = this.token.getUser()?.groups.find(x => x.indexOf(role) > -1) != undefined

    if (!has_role) {
      this.snackbar.openSnackBar("You are not allowed to access this page.", "Dismiss", 3)
      this.router.navigate(['home'])
    }

    return has_role

  }
}
