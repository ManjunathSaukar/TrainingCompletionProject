import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginService } from 'src/app/services/login.service';
import ValidateForm from 'src/app/validation/validateForm';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit{
  sideNavStatus:boolean=true;
  isAdmin:any;
  imageUrl:any;
  defaultImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYvfnGmg22_Ssgv80U-hoM3cXaLkRI8UJBvYNPdbo&s"
  updateUser:FormGroup;
  public userDetails:any={};
  constructor(private route:ActivatedRoute,private loginApi:LoginService,private router:Router,
    private fb:FormBuilder,private toast:NgToastService,private _sanatizer:DomSanitizer){}
  
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
    this.route.paramMap.subscribe(
      {
        next:(params)=>{
          const id = params.get('id');
          if (id){
            this.loginApi.getUserById(id.toUpperCase())
            .subscribe({
              next:(response)=>{
                if(response.role==="ADMIN"){
                  this.isAdmin=true;
                }
                else{
                  this.isAdmin=false;
                }
                this.userDetails = response;
                this.userDetails.id=this.userDetails.id.toUpperCase();
                var reader=new FileReader();
                reader.onload=(event:any)=>{
                    this.imageUrl=this._sanatizer.bypassSecurityTrustResourceUrl(response.profileImage);
                }
                reader.readAsDataURL(new Blob([response.profileImage.toString()]))
              }
            }); 
          }
        }
      }
    )
    
    this.updateUser=this.fb.group({
      Name:[""],
      Email:[""],
      UserName:[""],
      ProfileImage:['']
    })
  }

  onUpdate(){
    if(this.updateUser.valid){
      this.updateUser.setValue({
        Name:(this.updateUser.value.Name=="")?this.userDetails.name:this.updateUser.value.Name,
        Email:(this.updateUser.value.Email=="")?this.userDetails.email:this.updateUser.value.Email,
        UserName:(this.updateUser.value.UserName=="")?this.userDetails.userName:this.updateUser.value.UserName,
        ProfileImage:this.imageUrl.toString()
      });
     this.loginApi.updateUser(this.userDetails.id,this.updateUser.value)
        .subscribe({
          next:(res=>{
            this.toast.success({detail:"SUCCESS",summary:"User Updated Succesfully!!",duration:5000})
            if(this.isAdmin===true){
              this.router.navigate(['login/dashboardadmin']);
            }
            else{
              this.router.navigate(['login/dashboarduser']);
            }
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
