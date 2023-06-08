import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit{
  constructor(private route:ActivatedRoute,private loginApi:LoginService,private toast:NgToastService,
    private router:Router){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      {
        next:(params)=>{
          const id = params.get('id');
          if(id){
            if(confirm('Are you sure, you want to delete this user?')){
              this.loginApi.deleteUser(id.toUpperCase())
              .subscribe({
              next:(res=>{
                this.toast.success({detail:"SUCCESS",summary:"User Deleted Succesfully!!",duration:5000})
                this.router.navigate(['login/dashboardadmin']);
              }),
              error:(err=>{
                this.toast.error({detail:"ERROR",summary:err?.error.message,duration:5000})
                this.router.navigate(['login/dashboardadmin']);
              })
            }); 
            }
            else{
              this.router.navigate(['login/dashboardadmin']);
            }
          }
        }
      })
    }
}
