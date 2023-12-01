import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AutoLogoutService } from 'app/login/auto-logout.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private autoLogoutService: AutoLogoutService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser == null) {
      this.router.navigate(['/login']);
    }
    this.autoLogoutService.initInterval();
    return true;
  }
}
