import {Component} from '@angular/core';
import {OpenComponentsService} from "../../services/open-components/open-components.service";
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../services/response/firebase-client-response";
import {AlertIonicService} from "../../services/alert-popup-ionic/alert-ionic.service";
import {Router} from "@angular/router";

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

    constructor(private openComponentsService: OpenComponentsService, private fireBaseClientservice: FireBaseRequestClientService, private alertService: AlertIonicService, private router: Router) {
    }


    addEmail(newItem: string) {
        this.email_client = newItem;
    }

    addPassword(newItem: string) {
        this.password_client = newItem;
    }


    async login() {

        this.email_client = this.email_client.split('.',).join('-').split('@',).join('_')
        if (this.email_client === 'ConsulenteNumero1') {
            this.openComponentsService.openClient = false
            this.openComponentsService.openConsultant = true
            return
        }


        this.client_firebase = await this.fireBaseClientservice.getClient(this.email_client)

        console.log(this.client_firebase)

        if (this.client_firebase == null)
            this.alertService.presentAlert('Utente non presente', '', '')
        if (this.client_firebase.password === this.password_client) {
            this.alertService.presentAlert('Login eseguito con successo', '', '')
            document.getElementById("logged").textContent = this.client_firebase.email.split('-',).join('.').split('_',).join('@');

        } else this.alertService.presentAlert('Password errata', '', '')
    }

    apriRegisterComponent() {
        this.router.navigate(['/register'])

    }
}
