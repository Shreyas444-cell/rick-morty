import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './authentication.service';
import { Inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
const authService= Inject(AuthService)
const router= Inject(Router)
  if (authService.isLoggedInSubject.value) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
