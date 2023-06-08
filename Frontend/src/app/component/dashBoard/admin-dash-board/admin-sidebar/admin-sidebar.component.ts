import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit{
  @Input() sideNavStatus:boolean=true;
  imageUrl:any
  userStatus:boolean=true;
  adminDetail:any={}
  private userId=(localStorage.getItem("userId"));
  constructor(private loginApi:LoginService,private _sanatizer:DomSanitizer){
  }
  ngOnInit(): void {
    if(this.userId){
      this.loginApi.getUserById(this.userId?.toUpperCase())
      .subscribe(res=>{
        console.log(res)
        this.adminDetail=res;
        var reader=new FileReader();
        reader.onload=(event:any)=>{
          this.imageUrl=this._sanatizer.bypassSecurityTrustResourceUrl(res.profileImage);
        }
        reader.readAsDataURL(new Blob([res.profileImage.toString()]))
      })
    }
  }
}
