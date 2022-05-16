import {Component, OnInit} from '@angular/core';
import {RequestClientServiceService} from "../../../services/request/request-client-service.service";
import {RequestConsultantServiceService} from "../../../services/request/request-consultant-service.service";
import {ClientResponse} from "../../../services/response/client-response";
import {ConsultantResponse} from "../../../services/response/consultant-response";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent {



    userName = 'username';
    eMail = 'email';
    description = 'description';

    consultant_or_client: boolean;

    constructor(private consulantService: RequestConsultantServiceService, private clientService: RequestClientServiceService) {


        if (document.getElementById("header").textContent.includes("Client"))
            this.consultant_or_client = true;
        else this.consultant_or_client = false;
    }


    async submitToServerRegister() {
        await this.delay(500);

        if (document.getElementById("header").textContent.includes("Client")) {
            let client = new ClientResponse();
            client.userName = this.userName;
            client.email = this.eMail;
            client.description = this.description;
            this.clientService.putClient(client);
        } else {
            let consultant = new ConsultantResponse();
            consultant.userName = this.userName
            consultant.email = this.eMail;
            consultant.description = this.description;
            this.consulantService.putConsultant(consultant);
        }
        alert('aggiunto utente: ' + this.userName);
    }

    addInputToUserName(newItem: string) {
        this.userName = newItem;
    }

    addInputToEmail(newItem: string) {
        this.eMail = newItem;
    }

    addInputToDescription(newItem: string) {
        this.description = newItem;
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
