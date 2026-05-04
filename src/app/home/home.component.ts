import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showWelcome: boolean = false;

  showWelcomeMessage() {
    this.showWelcome = true;
    setTimeout(() => {
      this.showWelcome = false;
    },3000);
  }
}
