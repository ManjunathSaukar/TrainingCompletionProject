import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from "@angular/forms";
import { Router } from '@angular/router';
import ValidateForm from 'src/app/validation/validateForm';
import { LoginService } from 'src/app/services/login.service';
import {NgToastService} from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash"
  loginForm:FormGroup;

  constructor(private fb:FormBuilder,private loginService:LoginService,private router:Router,private toast:NgToastService){

  }
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }

  hideShowPass(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText?this.type="text":this.type="password";
  }
  onLogin(){
    if(this.loginForm.valid){
      //send the object to database
      this.loginService.login(this.loginForm.value)
        .subscribe({
          next:(res=>{
            // console.log(res)
            this.loginForm.reset();
            this.loginService.storeToken(res.token);
            localStorage.setItem("userId",res.id);
            if(res.role==="ADMIN"){
              this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000})
              this.router.navigate(['login/dashboardadmin']);
            }
            else{
              this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000})
              this.router.navigate(['login/dashboarduser']);
            }
          }),
          error:(err=>{
            this.toast.error({detail:"ERROR",summary:"USER DOES NOT EXIST.",duration:5000})
          })
        })
    }
    else{
      //throws the error if form in not validate
      ValidateForm.validateAllFormFields(this.loginForm);
    }
  }
}
