import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
 providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private loginService:LoginService,private router:Router,private toast:NgToastService){}
 canActivate(
 route: ActivatedRouteSnapshot,
 state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  if(this.loginService.isLoggedIn()){
    return true;
  }
  else{
    this.toast.warning({detail:"WARNING",summary:"Please login first!!",duration:5000})
    this.router.navigate(['login']);
    return false;
  }
 }
}