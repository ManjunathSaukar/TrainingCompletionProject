import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SubtasksService } from 'src/app/services/subtasks.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-show-sub-task',
  templateUrl: './show-sub-task.component.html',
  styleUrls: ['./show-sub-task.component.css']
})
export class ShowSubTaskComponent implements OnInit{
  sideNavStatus:boolean=true;
  public subtasks:any[]
  public task:any={};
  page: number = 1; 
  count: number = 0; 
  tableSize: number = 5; 
  tableSizes: any = [5, 10, 15, 20]; 
  constructor(private route:ActivatedRoute,private taskService:TasksService, private subTaskService:SubtasksService,
    private toast:NgToastService,private router:Router){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      {
        next:(params)=>{
          const id = params.get('id');
          if(id){
            this.subTaskService.getAllSubTask(id.toUpperCase())
            .subscribe({
              next:(res=>{
                this.subtasks=res;
                this.count=this.subtasks.length;
                //  this.router.navigate(['login/dashboarduser']);
              }),
              error:(err=>{
                this.toast.error({detail:"ERROR",summary:err?.error.message,duration:5000})
              })
            });

            this.taskService.getTaskById(id.toUpperCase())
              .subscribe({
                next:(res=>{
                  this.task=res;
                  this.task.id=this.task.id.toUpperCase();
                }),
                error:(err=>{
                  this.toast.error({detail:"ERROR",summary:err?.error.message,duration:5000})
                })
            }); 
          }
        }
      })
    }
    onTableDataChange(event: any) { 
      this.page = event; 
    } 
   
    onTableSizeChange(event: any): void { 
      this.tableSize = event.target.value; 
      this.page = 1; 
    } 
}
