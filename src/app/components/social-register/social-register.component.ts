import { Component, OnInit } from '@angular/core';
import {ClientResponse} from "../../services/response/client-response";
import {ConsultantResponse} from "../../services/response/consultant-response";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {RequestClientServiceService} from "../../services/request/request-client-service.service";
import {RequestConsultantServiceService} from "../../services/request/request-consultant-service.service";

//https://www.npmjs.com/package/angularx-social-login
//https://www.positronx.io/angular-google-social-login-tutorial-with-example/
//https://remotestack.io/create-login-with-facebook-in-angular-application/


@Component({
  selector: 'app-social-register',
  templateUrl: './social-register.component.html',
})
export class SocialRegisterComponent implements OnInit {




  user = new SocialUser();
  client = new ClientResponse(); // importante che sia istanziato se no da impossible to ser client.firstName of null o of undefined
  consultant = new ConsultantResponse();

  constructor(private authService: SocialAuthService,private clientService: RequestClientServiceService,private consultantService: RequestConsultantServiceService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user ;
    });
  }


  async signInWithGoogle(): Promise<void> {
    await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID); //// importante qui await, perchè se no non viene aggiornato il this.user
    this.pushUserToBackEnd();
  }

  async signInWithFB(): Promise<void> {
    await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.pushUserToBackEnd();
  }

  signOut(): void {
    this.authService.signOut();
  }

   pushUserToBackEnd() {
    if (document.getElementById("header").textContent.includes("Client")) {
      this.client.firstName = this.user.name.split(" ")[0];
      this.client.lastName = this.user.name.split(" ")[1];
      this.client.userName = this.client.firstName + "_" + this.client.lastName;
      this.client.email = this.user.email;
      this.clientService.putClient(this.client);
      alert('aggiunto utente: ' + this.client.userName);
    }
    else {

      this.consultant.firstName = this.user.name.split(" ")[0];
      this.consultant.lastName = this.user.name.split(" ")[1];
      this.consultant.userName = this.consultant.firstName + "_" + this.consultant.lastName;
      this.consultant.email = this.user.email;
      this.consultantService.putConsultant(this.consultant);

    }
  }

}
