import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  language='en';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    
  }
  title = 'iheb';
  swithlanguage():void {
    if(this.language === 'en'){
      this.language ='fr';

    }else{
      this.language= "en";
    }
    this.translate.use(this.language);
  }
}
