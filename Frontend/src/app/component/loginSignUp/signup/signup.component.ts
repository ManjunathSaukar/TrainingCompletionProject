import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/validation/validateForm';
import { LoginService } from 'src/app/services/login.service';
import {NgToastService} from 'ng-angular-popup'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash";
  signUpForm:FormGroup;
  imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYvfnGmg22_Ssgv80U-hoM3cXaLkRI8UJBvYNPdbo&s';
  constructor(private fb:FormBuilder,private loginService:LoginService,private router:Router,private toast:NgToastService) {}
  
  onUploadImage(event:any){
    const file=event.target.files[0];
    console.log(file)
    var reader=new FileReader();
    reader.onload=(event:any)=>{
      this.imageUrl=event.target.result;
    }
    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.signUpForm=this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      userName:['',Validators.required],
      password:['',Validators.required],
      ProfileImage:['']
    })
  }
  hideShowPass(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon="fa-eye":this.eyeIcon="fa-eye-slash";
    this.isText?this.type="text":this.type="password";
  }
  onSignUp(){
    if(this.signUpForm.valid){
      this.signUpForm.patchValue({
        ProfileImage:this.imageUrl.toString()
      });
      this.loginService.signUp(this.signUpForm.value)
        .subscribe({
          next:(res=>{
            this.signUpForm.reset();
            this.loginService.storeToken(res.token);
            localStorage.setItem("userId",res.id);
            if(res.role==="ADMIN"){
              this.router.navigate(['login/dashboardadmin']);
              this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000})
            }
            else{
              this.router.navigate(['login/dashboarduser']);
              this.toast.success({detail:"SUCCESS",summary:res.message,duration:5000})
            }
          }),
          error:(err=>{
            this.toast.error({detail:"ERROR",summary:err.message,duration:5000})
          })
      })
    }
    else{
      ValidateForm.validateAllFormFields(this.signUpForm);
    }
  }
}
