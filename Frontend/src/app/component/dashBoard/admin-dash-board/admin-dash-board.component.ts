import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css']
})
export class AdminDashBoardComponent implements OnInit {
  sideNavStatus:boolean=true;
  public users:any[]=[]
  page:number=1; 
  count:number=0; 
  tableSize:number=8; 
  tableSizes:any = [5,10,15,20]; 
  constructor(private loginService:LoginService,private toast:NgToastService,public router:Router){
 
  }
  // ngOnInit(): void {
  //   this.loginService.getAllUser()
  //     .subscribe({
  //         next:(res=>{
  //           this.users=res;
  //           // console.log(res)
  //           // this.toast.success({detail:"SUCCESS",summary:"Task Deleted Succesfully!!",duration:5000})
  //           // this.router.navigate(['login/dashboarduser']);
  //         }),
  //         error:(err=>{
  //           //this.toast.error({detail:"ERROR",summary:err?.error.message,duration:5000})
  //           })
  //     });
  // }
  ngOnInit(): void { 
    this.taskList(); 
  } 
  taskList(){ 
    this.loginService.getAllUser()
      .subscribe(res=>{ 
       this.users=res; 
    })
  } 
  onTableDataChange(event:any){ 
    this.page=event; 
    this.taskList(); 
  } 
  onTableSizeChange(event:any):void{ 
    this.tableSize=event.target.value; 
    this.page=1; 
    this.taskList(); 
  } 
}
