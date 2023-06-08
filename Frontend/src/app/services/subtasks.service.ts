import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubtasksService {

  private baseurl:string="https://localhost:7089/SubTask/";
  constructor(private http:HttpClient) { }

  getAllSubTask(id:string):Observable<any>
  {
    return this.http.get<any>(`${this.baseurl}GetAllSubTasks/`+id);
  }
  addSubTask(id:string,addSubTasksObj:any){
    return this.http.post<any>(`${this.baseurl}AddSubTask/`+id,addSubTasksObj);
  }
  deleteSubTask(id:string){
    return this.http.delete<any>(`${this.baseurl}DeleteSubTask/`+id);
  }
  updateSubTask(id:string,updateSubTaskObj:any){
    return this.http.put<any>(`${this.baseurl}UpdateSubTask/`+id,updateSubTaskObj)
  }
  getSubTaskById(id:string):Observable<any>{
    return this.http.get(`${this.baseurl}GetSubTaskById/`+id)
  }
}
