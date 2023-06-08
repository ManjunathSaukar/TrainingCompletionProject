import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SubtasksService } from 'src/app/services/subtasks.service';

@Component({
  selector: 'app-delete-sub-task',
  templateUrl: './delete-sub-task.component.html',
  styleUrls: ['./delete-sub-task.component.css']
})
export class DeleteSubTaskComponent {
  sideNavStatus:boolean=true;
  constructor(private route:ActivatedRoute,private subtaskApi:SubtasksService,private toast:NgToastService,
    private router:Router){

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      {
        next:(params)=>{
          const id = params.get('id');
          if(id){
            if(confirm('Are You sure, you want to delete this subtask?')){
              this.subtaskApi.deleteSubTask(id.toUpperCase())
                .subscribe({
                next:(res=>{
                  this.toast.success({detail:"SUCCESS",summary:"SubTask Deleted Succesfully!!",duration:5000})
                  this.router.navigate(["login/dashboarduser"]);
              }),
              error:(err=>{
                this.toast.error({detail:"ERROR",summary:err?.error.message,duration:5000})
              })
            }); 
            }
            else{
              this.router.navigate(["login/dashboarduser"])
            }
            
          }
        }
      })
    }
}
