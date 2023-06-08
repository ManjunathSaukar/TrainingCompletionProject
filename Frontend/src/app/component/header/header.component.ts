import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  @Output() sideNavToggled=new EventEmitter<boolean>();
  menuSatus:boolean=true;
  constructor(private loginService:LoginService){
 
  }
  ngOnInit(): void {
    
  }
  sideNavtoggled(){
    this.menuSatus=!this.menuSatus;
    this.sideNavToggled.emit(this.menuSatus);
  }
  signOut(){
    this.loginService.signOut();
  }
}
