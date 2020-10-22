//Header component will change accordingly user login and logout

import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { RestService } from '../rest.service';
import { Users_New } from '../users';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  currentUser: Users_New;
  flag: any = false;
  flagType: any = false;
  userId: any;
  type: any;
  user: Users_New[] = []

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private restApi: RestService,
        private cd: ChangeDetectorRef
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
    
  ngOnInit() {
    
    if(localStorage.getItem("currentUser") != null){
        this.flag = true;
        this.userId = this.authenticationService.currentUserValue.id;
        this.type = this.authenticationService.currentUserValue.type;

        this.restApi.getUser(this.userId).subscribe((response) => {
          this.user=response;
    });
    if(this.type == 'admin'){
      this.flagType = true;
      this.cd.detectChanges();
    }
   }
  }
    logout() {
        this.cd.detectChanges();
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
