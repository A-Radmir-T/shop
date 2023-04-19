import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";

import {AuthService} from "./auth.service";

export const canActivateLogin: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if (authService.isAuthenticated()) {
    router.navigate(['/admin', 'dashboard'])
    return false
  } else {
    return true
  }

}
