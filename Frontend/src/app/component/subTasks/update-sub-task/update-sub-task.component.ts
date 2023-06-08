import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SubtasksService } from 'src/app/services/subtasks.service';
import ValidateForm from 'src/app/validation/validateForm';

@Component({
  selector: 'app-update-sub-task',
  templateUrl: './update-sub-task.component.html',
  styleUrls: ['./update-sub-task.component.css']
})
export class UpdateSubTaskComponent {
  sideNavStatus:boolean=true;
  updateSubTask:FormGroup;
  public subTaskDetail:any={};

  constructor(private route:ActivatedRoute,private subTaskapi:SubtasksService,private router:Router,
    private fb:FormBuilder,private toast:NgToastService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      {
        next:(params)=>{
          const id = params.get('id');
          if (id){
            this.subTaskapi.getSubTaskById(id.toUpperCase())
            .subscribe({
              next:(response)=>{
                console.log(response)
                this.subTaskDetail = response;
                this.subTaskDetail.id=this.subTaskDetail.id.toUpperCase();
              }
            }); 
          }
        }
      }
    )

    this.updateSubTask=this.fb.group({
      Name:[""],
      Description:[""],
      Status:[""]
    })
  }

  onUpdate(){
    if(this.updateSubTask.valid){
      this.updateSubTask.patchValue({
        Name:(this.updateSubTask.value.Name=="")?this.subTaskDetail.name:this.updateSubTask.value.Name,
        Description:(this.updateSubTask.value.Description=="")?this.subTaskDetail.description:this.updateSubTask.value.Description,
        Status:(this.updateSubTask.value.Status=="")?this.subTaskDetail.status:this.updateSubTask.value.Status,
      }); 
      console.log(this.updateSubTask.value)
     this.subTaskapi.updateSubTask(this.subTaskDetail.id,this.updateSubTask.value)
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
      ValidateForm.validateAllFormFields(this.updateSubTask);
    }
  }
}
