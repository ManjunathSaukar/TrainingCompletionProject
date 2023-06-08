import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit{
  constructor(private route:ActivatedRoute,private taskService:TasksService,private toast:NgToastService,
    private router:Router){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      {
        next:(params)=>{
          const id = params.get('id');
          if(id){
            if(confirm('Are You sure, you want to delete this task?')){
              this.taskService.deleteTask(id)
              .subscribe({
              next:(res=>{
                this.toast.success({detail:"SUCCESS",summary:"Task Deleted Succesfully!!",duration:5000})
                this.router.navigate(['login/dashboarduser']);
              }),
              error:(err=>{
                this.toast.error({detail:"ERROR",summary:err?.error.message,duration:5000})
              })
            }); 
            }
            else{
              this.router.navigate(['login/dashboarduser']);
            }
            
          }
        }
      })
    }
}
