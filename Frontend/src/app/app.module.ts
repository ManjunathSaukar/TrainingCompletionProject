import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './intercepter/token.interceptor';
import { NgToastModule } from 'ng-angular-popup';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/loginSignUp/login/login.component';
import { SignupComponent } from './component/loginSignUp/signup/signup.component';
import { AdminDashBoardComponent } from './component/dashBoard/admin-dash-board/admin-dash-board.component';
import { UserDashBoardComponent } from './component/dashBoard/user-dash-board/user-dash-board.component';
import { LoginService } from './services/login.service';
import { ShowSubTaskComponent } from './component/subTasks/show-sub-task/show-sub-task.component';
import { AddSubTaskComponent } from './component/subTasks/add-sub-task/add-sub-task.component';
import { UpdateSubTaskComponent } from './component/subTasks/update-sub-task/update-sub-task.component';
import { AddTasksComponent } from './component/tasks/add-tasks/add-tasks.component';
import { ShowTasksComponent } from './component/tasks/show-tasks/show-tasks.component';
import { UpdateTasksComponent } from './component/tasks/update-tasks/update-tasks.component';
import { DeleteTaskComponent } from './component/tasks/delete-task/delete-task.component';
import { DeleteSubTaskComponent } from './component/subTasks/delete-sub-task/delete-sub-task.component';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { AdminSidebarComponent } from './component/dashBoard/admin-dash-board/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from './component/dashBoard/admin-dash-board/admin-header/admin-header.component';
import { DeleteUserComponent } from './component/dashBoard/admin-dash-board/delete-user/delete-user.component';
import { UpdateUserComponent } from './component/dashBoard/admin-dash-board/update-user/update-user.component';
import { UpdateProfileComponent } from './component/dashBoard/update-profile/update-profile.component';
import { ForgetPasswordComponent } from './component/loginSignUp/forget-password/forget-password.component';
import { FooterComponent } from './component/footer/footer.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminDashBoardComponent,
    UserDashBoardComponent,
    ShowSubTaskComponent,
    AddSubTaskComponent,
    UpdateSubTaskComponent,
    AddTasksComponent,
    ShowTasksComponent,
    UpdateTasksComponent,
    DeleteTaskComponent,
    DeleteSubTaskComponent,
    HeaderComponent,
    SidebarComponent,
    AdminSidebarComponent,
    AdminHeaderComponent,
    DeleteUserComponent,
    UpdateUserComponent,
    UpdateProfileComponent,
    ForgetPasswordComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgToastModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    LoginService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
