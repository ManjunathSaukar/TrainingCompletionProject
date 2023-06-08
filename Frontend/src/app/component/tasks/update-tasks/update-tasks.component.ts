import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import {NgToastService} from 'ng-angular-popup'
import ValidateForm from 'src/app/validation/validateForm';

@Component({
  selector: 'app-update-tasks',
  templateUrl: './update-tasks.component.html',
  styleUrls: ['./update-tasks.component.css']
})
export class UpdateTasksComponent implements OnInit{
  sideNavStatus:boolean=true;
  updateTask:FormGroup;
  public taskDetail:any={};

  constructor(private route:ActivatedRoute,private taskService:TasksService,private router:Router,
    private fb:FormBuilder,private toast:NgToastService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      {
        next:(params)=>{
          const id = params.get('id');
          if (id){
            this.taskService.getTaskById(id.toUpperCase())
            .subscribe({
              next:(response)=>{
                console.log(response)
                this.taskDetail = response;
                this.taskDetail.id=this.taskDetail.id.toUpperCase();
              }
            }); 
          }
        }
      }
    )

    this.updateTask=this.fb.group({
      Name:[""],
      Status:[""]
    })
  }

  onUpdate(){
    if(this.updateTask.valid){
     this.updateTask.setValue({
      Name:(this.updateTask.value.Name=="")?this.taskDetail.name:this.updateTask.value.Name,
      Status:(this.updateTask.value.Status=="")?this.taskDetail.status:this.updateTask.value.Status,
    });
     this.taskService.updateTask(this.taskDetail.id,this.updateTask.value)
        .subscribe({
          next:(res=>{
            this.toast.success({detail:"SUCCESS",summary:"Task Updated Succesfully!!",duration:5000})
            this.router.navigate(['login/dashboarduser']);
          }),
          error:(err=>{
            this.toast.error({detail:"ERROR",summary:err?.error.message,duration:5000})
          })
        })
    }
    else{
      ValidateForm.validateAllFormFields(this.updateTask);
    }
  }
}
