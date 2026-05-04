import { Component } from '@angular/core';

@Component({
  selector: 'app-navadmin',
  templateUrl: './navadmin.component.html',
  styleUrls: ['./navadmin.component.css','./../../assets/AdminDashboard/style.css']
})
export class NavadminComponent {
  toggle(){
    const elemnt = document.body as HTMLBodyElement
    elemnt.classList.toggle('toggle-sidebar') 
  }
}
