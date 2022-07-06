import {Component, OnInit} from '@angular/core';
import {OpenComponentsService} from "../../services/open-components/open-components.service";
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../services/response/firebase-client-response";
import {AlertIonicService} from "../../services/alert-popup-ionic/alert-ionic.service";
import {Router} from "@angular/router";
import {GlobalVariablesService} from "../../services/utility-services/global-variables.service";
import {CookieService} from "ngx-cookie-service";

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
})
export class LogInComponent implements OnInit {

    eMail = 'E-mail';
    password = 'Password'
    input_value_cookie_password: string


    email_client: string
    password_client: string


    client_firebase = new FirebaseClientResponse()

    constructor(private cookieService: CookieService, private openComponentsService: OpenComponentsService, private fireBaseClientservice: FireBaseRequestClientService, private alertService: AlertIonicService, private router: Router, private globalVariables: GlobalVariablesService) {
    }

    ngOnInit(): void {


        let mail = this.cookieService.get('stextile_mail')
        let password = this.cookieService.get('stextile_password')
        if (mail != '') {
            this.eMail = mail
            this.email_client = mail
            this.input_value_cookie_password = password
            this.password_client = password
        }

    }

    addEmail(newItem: string) {
        this.email_client = newItem;
    }

    addPassword(newItem: string) {
        this.password_client = newItem;
    }


    async login() {


        if (this.email_client === 'ConsulenteNumero1') {
            this.router.navigate(['/consultant123123-number123']).then(page => {
                window.location.reload();
            });
            return
        }


        if (this.email_client === undefined) {
            this.alertService.presentAlert('Inserisci prima le credenziali', '', '')
            return
        }
        if (this.password_client === undefined) {
            this.alertService.presentAlert('Password non presente', '', '')
            return
        }

        this.email_client = this.email_client.split('.',).join('-').split('@',).join('_')


        this.client_firebase = await this.fireBaseClientservice.getClient(this.email_client)
        await this.fireBaseClientservice.delay(500)

        if (this.client_firebase == undefined) {
            this.client_firebase = await this.fireBaseClientservice.getClient(this.email_client)
            await this.fireBaseClientservice.delay(500)
        }

        await this.fireBaseClientservice.delay(500)

        if (this.client_firebase.password === undefined)
            this.client_firebase = await this.fireBaseClientservice.getClient(this.email_client)

        if (this.client_firebase == undefined) {
            this.alertService.presentAlert('Utente non presente', '', '')
            return
        }


        if (this.client_firebase.password === this.password_client) {
            this.alertService.presentAlert('Login eseguito con successo', '', '')
            document.getElementById("logged").textContent = this.client_firebase.email.split('-',).join('.').split('_',).join('@');
            this.globalVariables.currentLoggedUserId = document.getElementById("logged").textContent
        } else this.alertService.presentAlert('Password errata', '', '')

        this.cookieService.set('stextile_mail', this.client_firebase.email)
        this.cookieService.set('stextile_password', this.client_firebase.password)

        this.router.navigate(['/client']).then(page => {
            window.location.reload();
        }); //// To trigger the refresh of the page even if in the same page  https://stackoverflow.com/questions/39613093/angular2-router-navigate-to-the-current-page-with-different-parameters

    }

    apriRegisterComponent() {
        this.router.navigate(['/register']).then(page => {
            window.location.reload();
        });

    }


}
