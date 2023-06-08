import { Component,OnInit } from '@angular/core';


@Component({
  selector: 'app-user-dash-board',
  templateUrl: './user-dash-board.component.html',
  styleUrls: ['./user-dash-board.component.css']
})
export class UserDashBoardComponent implements OnInit{
  
  sideNavStatus:boolean=true;
  ngOnInit(): void {
    
  }
}
