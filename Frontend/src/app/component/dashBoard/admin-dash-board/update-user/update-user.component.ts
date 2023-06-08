import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginService } from 'src/app/services/login.service';
import ValidateForm from 'src/app/validation/validateForm';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{
  sideNavStatus:boolean=true;
  updateUser:FormGroup;
  public userDetail:any={};

  constructor(private route:ActivatedRoute,private loginApi:LoginService,private router:Router,
    private fb:FormBuilder,private toast:NgToastService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      {
        next:(params)=>{
          const id = params.get('id');
          if (id){
            this.loginApi.getUserById(id.toUpperCase())
            .subscribe({
              next:(response)=>{
                console.log(response.isActive)
                this.userDetail = response;
              }
            }); 
          }
        }
      }
    )

    this.updateUser=this.fb.group({
      IsActive:["",Validators.required]
    })
  }

  onUpdate(){
    if(this.updateUser.valid){
      console.log(this.updateUser.value)
     this.loginApi.updateUser(this.userDetail.id,this.updateUser.value)
        .subscribe({
          next:(res=>{
            this.toast.success({detail:"SUCCESS",summary:"User Updated Succesfully!!",duration:5000})
            this.router.navigate(['login/dashboardadmin']);
          }),
          error:(err=>{
            this.toast.error({detail:"ERROR",summary:err?.error.message,duration:5000})
          })
        })
    }
    else{
      ValidateForm.validateAllFormFields(this.updateUser);
    }
  }
}
