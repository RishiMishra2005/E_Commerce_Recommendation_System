import { CanActivateFn, Router } from '@angular/router';
import { UserAuthenService } from '../Services/user-auth.service';
import { inject } from '@angular/core';
import { DataTransferServiceService } from '../Services/data-transfer-service.service';

export const userGuardGuard: CanActivateFn = (route, state) => {
  const userAuth = inject(UserAuthenService)
  const router = inject(Router);
  const dataTransferService=inject(DataTransferServiceService);
  //const det=localStorage.getItem("loggedUser");
  const det=dataTransferService.getLoggedUser();
  if (det!=null && det.role=='A') {
    return true
  }
  else {
    alert("Please login to the administrator account");
    return false;
  }

};
