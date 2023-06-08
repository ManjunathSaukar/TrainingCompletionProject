import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import {NgToastService} from 'ng-angular-popup'
import ValidateForm from 'src/app/validation/validateForm';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit{
  sideNavStatus:boolean=true;
  addTask:FormGroup;
  userId:any=localStorage.getItem('userId');
  constructor(private taskService:TasksService,private router:Router,
    private fb:FormBuilder,private toast:NgToastService){}

  ngOnInit(): void {
    this.addTask=this.fb.group({
      Name:["",Validators.required],
      Status:["",Validators.required]
    })
  }

  onAdd(){
    if(this.addTask.valid){
     this.taskService.addTask(this.userId.toUpperCase(),this.addTask.value)
        .subscribe({
          next:(res=>{
            this.toast.success({detail:"SUCCESS",summary:"Task Added Succesfully!!",duration:5000})
            this.router.navigate(['login/dashboarduser']);
          }),
          error:(err=>{
            this.toast.error({detail:"ERROR",summary:err?.error.message,duration:5000})
          })
        })
    }
    else{
      // logic for throwing Error if Form is Not Valid
      ValidateForm.validateAllFormFields(this.addTask);
    }
  }
}
