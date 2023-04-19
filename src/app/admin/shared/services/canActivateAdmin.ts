import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";

import {AuthService} from "./auth.service";

export const canActivateAdmin: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if (authService.isAuthenticated()) {
    return true
  } else {
    router.navigate(['/admin', 'login'], {
      queryParams: {
        authAgain: true
      }
    })
    return false
  }

}
