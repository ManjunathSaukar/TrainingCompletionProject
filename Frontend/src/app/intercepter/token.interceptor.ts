import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService:LoginService,private toast:NgToastService,private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //return next.handle(request);
    const token =localStorage.getItem("token");
    request=request.clone({
        setHeaders:{Authorization: `Bearer ${token}`}
    });
    
    return next.handle(request).pipe(
      catchError((err)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
            this.loginService.signOut();
            this.toast.warning({detail:"WARNNING",summary:"Token is Expired,Please Login Again !!"})
          }
        }
        return throwError(()=>new Error("Some Others Error Happen!!"));
      })
    )
  }
}
