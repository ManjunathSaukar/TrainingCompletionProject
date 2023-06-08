import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/loginSignUp/login/login.component';
import { SignupComponent } from './component/loginSignUp/signup/signup.component';
import { AdminDashBoardComponent } from './component/dashBoard/admin-dash-board/admin-dash-board.component';
import { UserDashBoardComponent } from './component/dashBoard/user-dash-board/user-dash-board.component';
import { AddTasksComponent } from './component/tasks/add-tasks/add-tasks.component';
import { ShowTasksComponent } from './component/tasks/show-tasks/show-tasks.component';
import { UpdateTasksComponent } from './component/tasks/update-tasks/update-tasks.component';
import { AddSubTaskComponent } from './component/subTasks/add-sub-task/add-sub-task.component';
import { ShowSubTaskComponent } from './component/subTasks/show-sub-task/show-sub-task.component';
import { DeleteSubTaskComponent } from './component/subTasks/delete-sub-task/delete-sub-task.component';
import { DeleteTaskComponent } from './component/tasks/delete-task/delete-task.component';
import { authGuard } from './authorization/auth.guard';
import { UpdateSubTaskComponent } from './component/subTasks/update-sub-task/update-sub-task.component';
import { UpdateUserComponent } from './component/dashBoard/admin-dash-board/update-user/update-user.component';
import { DeleteUserComponent } from './component/dashBoard/admin-dash-board/delete-user/delete-user.component';
import { UpdateProfileComponent } from './component/dashBoard/update-profile/update-profile.component';
import { ForgetPasswordComponent } from './component/loginSignUp/forget-password/forget-password.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"login/dashboardadmin",component:AdminDashBoardComponent,canActivate:[authGuard]},
  {path:"login/dashboardadmin/deleteuser/:id",component:DeleteUserComponent,canActivate:[authGuard]},
  {path:"login/dashboardadmin/updateuser/:id",component:UpdateUserComponent,canActivate:[authGuard]},
  {path:"login/dashboarduser",component:UserDashBoardComponent,canActivate:[authGuard]},
  {path:"login/updateprofile/:id",component:UpdateProfileComponent,canActivate:[authGuard]},
  {path:"forgetpassword",component:ForgetPasswordComponent},
  {path:"dashboarduser/addtask",component:AddTasksComponent,canActivate:[authGuard]},
  {path:"dashboarduser/showtasks",component:ShowTasksComponent,canActivate:[authGuard]},
  {path:"dashboarduser/updatetask/:id",component:UpdateTasksComponent,canActivate:[authGuard]},
  {path:"dashboarduser/deletetask/:id",component:DeleteTaskComponent,canActivate:[authGuard]},
  {path:"dashboarduser/task/addsubtask/:id",component:AddSubTaskComponent,canActivate:[authGuard]},
  {path:"dashboarduser/task/showallsubsasks",component:ShowSubTaskComponent,canActivate:[authGuard]},
  {path:"dashboarduser/task/showallsubsasks/:id",component:ShowSubTaskComponent,canActivate:[authGuard]},
  {path:"dashboarduser/task/updatesubtask/:id",component:UpdateSubTaskComponent,canActivate:[authGuard]},
  {path:"dashboarduser/task/deletesubtask/:id",component:DeleteSubTaskComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
