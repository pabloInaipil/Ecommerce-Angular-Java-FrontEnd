import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;

  storage: Storage = sessionStorage;

  constructor( private OktaAuthService: OktaAuthService) { }

  ngOnInit(): void {

    // Sibscribe to authenticated state changes 
    this.OktaAuthService.$authenticationState.subscribe(
      (result) => { 
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    )
  }
  getUserDetails() {
   if (this.isAuthenticated) { 

    // Fetch the logged in user details  (user´s claims)
    //
    // user full name is exposed as a property name 
    this.OktaAuthService.getUser().then( 
      res => { 
        this.userFullName = res.name;

        // retrieve the user´s email from aunthentication response
        const theEmail = res.email;

        // now store the email in browser storage
        this.storage.setItem('userEmail', JSON.stringify(theEmail));
      }
    );
   }

  }

  logout() { 

    // Terminates the session width Okta and removes current tokens.
    this.OktaAuthService.signOut();
    
  }

}
