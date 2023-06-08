import { Task } from "./task.model"

export interface User{
    Id:string
    Name :string
    Email:string
    Role:string
    UserName:string
    Password:string
    IsActive:string
    ProfileImage:string
    Tasks:Task[]
}