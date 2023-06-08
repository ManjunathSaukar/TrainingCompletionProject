import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginService } from 'src/app/services/login.service';
import ValidateForm from 'src/app/validation/validateForm';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash"
  resetForm:FormGroup;

  constructor(private fb:FormBuilder,private loginApi:LoginService,private router:Router,private toast:NgToastService){

  }
  ngOnInit(): void {
    this.resetForm=this.fb.group({
      userEmail:['',Validators.required],
      newPassword:['',Validators.required],
      confirmNewPassword:['',Validators.required]
    })
  }

  hideShowPass(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText?this.type="text":this.type="password";
  }
  onForgot(){
    if(this.resetForm.valid){
      const userEmail = this.resetForm.value.userEmail || ''; // Assign empty string if username is null or undefined 
      const newPassword = this.resetForm.value.newPassword || ''; 
      const confirmNewPassword = this.resetForm.value.confirmNewPassword||''; 
   
      if (newPassword !== confirmNewPassword) { 
        this.toast.error({detail:"ERROR",summary:"Password Mismatch.!!",duration:5000})
        // Handle password mismatch error 
        return; 
      } 
      this.loginApi.forgetPassword(this.resetForm.value)
        .subscribe({
          next:(res=>{
            this.toast.success({detail:"SUCCESS",summary:"Password Reset Successfully.!!",duration:5000})
            this.router.navigate(['login'])
          }),
          error:(err=>{
            this.toast.error({detail:"ERROR",summary:"USER DOES NOT EXIST.",duration:5000})
          })
        })
    }
    else{
      ValidateForm.validateAllFormFields(this.resetForm);
    }
  }
}
