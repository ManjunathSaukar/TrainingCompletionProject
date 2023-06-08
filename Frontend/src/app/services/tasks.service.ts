import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private baseurl:string="https://localhost:7089/Tasks/";
  constructor(private http:HttpClient) { }

  getAllTask(id:string){
    return this.http.get<any>(`${this.baseurl}GetAllTasks/`+id);
  }
  addTask(id:string,addTasksObj:any){
    return this.http.post<any>(`${this.baseurl}AddTask/`+id,addTasksObj);
  }
  deleteTask(id:string){
    return this.http.delete<any>(`${this.baseurl}DeleteTask/`+id);
  }
  updateTask(id:string,updateTaskObj:any){
    return this.http.put<any>(`${this.baseurl}UpdateTask/`+id,updateTaskObj)
  }
  getTaskById(id:string):Observable<any>{
    return this.http.get(`${this.baseurl}GetTaskById/`+id)
  }
}
