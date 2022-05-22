import {Component} from '@angular/core';
import {OpenComponentsService} from "../../services/open-components/open-components.service";
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../services/response/firebase-client-response";

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
})
export class LogInComponent {

    eMail = 'E-mail';
    password = 'Password'


    email_client: string
    password_client: string

    client = new FirebaseClientResponse()

    constructor(private openComponentsService: OpenComponentsService, private fireBaseClientservice: FireBaseRequestClientService) {
    }


    addEmail(newItem: string) {
        this.email_client = newItem;
        alert(this.email_client)
    }

    addPassword(newItem: string) {
        this.password_client = newItem;
        alert(this.password_client)

    }


    async login() {

        this.client.email = this.email_client
        this.client.password = this.password_client
        this.fireBaseClientservice.getClient('client_1')

    }

    apriRegisterComponent() {
        this.openComponentsService.openDialogVarNewAccount = true;
        this.openComponentsService.openDialogCalendar = false;
        this.openComponentsService.openDialogVarShowUsers = false;
        this.openComponentsService.openDialogVarAccount = false;
        this.openComponentsService.openCarrello = false;
    }
}
