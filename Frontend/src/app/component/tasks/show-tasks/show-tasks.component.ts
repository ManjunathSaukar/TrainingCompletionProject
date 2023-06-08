import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {NgToastService} from 'ng-angular-popup';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css']
})
export class ShowTasksComponent implements OnInit{
  public tasks:any[]
  page:number=1; 
  count:number=0; 
  tableSize:number=8; 
  tableSizes:any = [5,10,15,20]; 
  private userId=(localStorage.getItem("userId"));
  constructor(private loginService:LoginService,private taskservice:TasksService,
    private toast:NgToastService,private router:Router){

  }
  // ngOnInit(): void {
  //   if(this.userId){
  //     this.taskservice.getAllTask(this.userId)
  //       .subscribe(res=>{
  //        this.tasks=res;
  //     })
  //   }
  // }
  ngOnInit(): void { 
    this.taskList(); 
  } 
  taskList(){ 
    if(this.userId){ 
      this.taskservice.getAllTask(this.userId.toUpperCase()) 
        .subscribe(res=>{ 
         this.tasks=res; 
      }) 
    } 
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
