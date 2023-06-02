import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import {  map, take } from "rxjs";
import { AuthService } from "./auth.service";

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  var router = inject(Router);
  return inject(AuthService).user.pipe(
    take(1),
    map(user => { 
      const isAuth = !!user;
      if(isAuth) {
        return true;
      }
      return router.createUrlTree(['/auth']);
    }));
};
