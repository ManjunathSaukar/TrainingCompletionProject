import { SubTask } from "./subtask.model"

export interface Task{
    Id:string
    Name:string
    Status:string
    Subtask:SubTask[]
}