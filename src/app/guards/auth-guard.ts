import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }
  const user = authService.currentUser;
  const allowedRoles = route.data?.['roles'] as string[];
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};