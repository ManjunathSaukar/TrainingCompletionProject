import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  @Input() sideNavStatus:boolean=true;
  imageUrl:any
  userStatus:boolean=true;
  userDetail:any={}
  private userId=(localStorage.getItem("userId"));
  constructor(private loginApi:LoginService,private _sanatizer:DomSanitizer){

  }
  ngOnInit(): void {
    if(this.userId){
      this.loginApi.getUserById(this.userId?.toUpperCase())
      .subscribe(res=>{
        console.log(res)
        this.userDetail=res;
        var reader=new FileReader();
        reader.onload=(event:any)=>{
          this.imageUrl=this._sanatizer.bypassSecurityTrustResourceUrl(res.profileImage);
        }
        reader.readAsDataURL(new Blob([res.profileImage.toString()]))
      })
    }
  }
}
