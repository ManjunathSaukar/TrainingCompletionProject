import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SubtasksService } from 'src/app/services/subtasks.service';

@Component({
  selector: 'app-add-sub-task',
  templateUrl: './add-sub-task.component.html',
  styleUrls: ['./add-sub-task.component.css']
})
export class AddSubTaskComponent implements OnInit{
  sideNavStatus:boolean=true;
  addSubTask:FormGroup;

  constructor(private route:ActivatedRoute,private subTaskService:SubtasksService,private router:Router,
    private fb:FormBuilder,private toast:NgToastService){}

  ngOnInit(): void {
    this.addSubTask=this.fb.group({
      Name:["",Validators.required],
      Description:["",Validators.required],
      Status:[""]
    })
  }

  onAddSubtask(){
    this.route.paramMap.subscribe(
      {
        next:(params)=>{
          const id = params.get('id');
          if(id){
            this.addSubTask.patchValue({
              Status:"INCOMPLETE",
            }); 
            this.subTaskService.addSubTask(id.toUpperCase(),this.addSubTask.value)
            .subscribe({
              next:(res=>{
                this.toast.success({detail:"SUCCESS",summary:"SubTask Added Succesfully!!",duration:5000})
                this.router.navigate(['login/dashboarduser']);
              }),
              error:(err=>{
                this.toast.error({detail:"ERROR",summary:err?.error.message,duration:5000})
              })
            });
          }
        }
      })
  }
}
