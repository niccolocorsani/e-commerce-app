import {Component} from '@angular/core';
import {OpenComponentsService} from "../../services/open-components/open-components.service";
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../services/response/firebase-client-response";
import {AlertIonicService} from "../../services/alert-popup-ionic/alert-ionic.service";

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
})
export class LogInComponent {

    eMail = 'E-mail';
    password = 'Password'

    email_client: string
    password_client: string

    client_firebase = new FirebaseClientResponse()

    constructor(private openComponentsService: OpenComponentsService, private fireBaseClientservice: FireBaseRequestClientService, private alertService: AlertIonicService) {
    }


    addEmail(newItem: string) {
        this.email_client = newItem;
    }

    addPassword(newItem: string) {
        this.password_client = newItem;
    }


     async login() {

         this.client_firebase = await this.fireBaseClientservice.getClient(this.email_client)

         console.log(this.client_firebase)

         if (this.client_firebase == null)
             this.alertService.presentAlert('Utente non presente', '', '')
         if (this.client_firebase.password === this.password_client) {
             this.alertService.presentAlert('Login eseguito con successo', '', '')
             document.getElementById("logged").textContent = this.client_firebase.email;

         } else this.alertService.presentAlert('Password errata', '', '')
     }

    apriRegisterComponent() {
        this.openComponentsService.openDialogVarNewAccount = true;
        this.openComponentsService.openDialogCalendar = false;
        this.openComponentsService.openDialogVarShowUsers = false;
        this.openComponentsService.openDialogVarAccount = false;
        this.openComponentsService.openCarrello = false;
    }
}
