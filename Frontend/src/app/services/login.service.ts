import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseurl:string="https://localhost:7089/User/";
  constructor(private http:HttpClient,private router:Router,private toast:NgToastService) { }

  signUp(registerObj:any){
    return this.http.post<any>(`${this.baseurl}Register`,registerObj);
  }
  login(loginObj:any){
    return this.http.post<any>(`${this.baseurl}Login`,loginObj);
  }
  signOut(){
    localStorage.clear();
    localStorage.clear();
    this.router.navigate(['login']);
    this.toast.success({detail:"SUCCESS",summary:"LogOut Successfully!!",duration:5000})
  }
  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue);
  }
  getToken(){
    localStorage.getItem('token');
  }
  isLoggedIn():boolean{
    if(!!localStorage.getItem('token')){
      return true;
    }
    return false;
  }
  getAllUser(){
    return this.http.get<any>(`${this.baseurl}GetAllUser`);
  }
  getUserById(id:string){
    return this.http.get<any>(`${this.baseurl}GetUserById/`+id);
  }
  deleteUser(id:string){
    return this.http.delete<any>(`${this.baseurl}DeleteUser/`+id);
  }
  updateUser(id:string,updateData:any){
    return this.http.put<any>(`${this.baseurl}UpdateUser/`+id,updateData);
  }
  forgetPassword(forgetPasswordData:any){
    return this.http.post<any>(`${this.baseurl}ForgotPassword`,forgetPasswordData);
  }
}