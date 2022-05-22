import {Component} from '@angular/core';
import {ClientResponse} from "../../services/response/client-response";
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../services/response/firebase-client-response";
import {AlertController} from "@ionic/angular";
import {AlertIonicService} from "../../services/alert-popup-ionic/alert-ionic.service";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent {

    eMail = 'E-mail';
    password = 'Password'
    name = 'Nome'
    surname = 'Cognome'
    street = 'Indirizzo'
    cap = 'cap'


    password_1: string
    password_2: string


    client = new FirebaseClientResponse()
    name_client= "";
    surname_client= "";
    street_client= '';
    email_client= ""
    cap_client= '' //// se qualche valore è undefined o null la richiesta http non


    constructor(private fireBaseClientservice: FireBaseRequestClientService, private alertService : AlertIonicService) {
    }

    selectChange(e) {
        console.log(e);
    }

    addEmail(newItem: string) {
        this.email_client = newItem;
    }

    addName(newItem: string) {
        this.name_client = newItem;
    }

    addSurname(newItem: string) {
        this.surname_client = newItem;
    }

    addStreet(newItem: string) {
        this.street_client = newItem;
    }

    addCap(newItem: string) {
        this.cap_client = newItem;
    }

    addPassword_1(newItem: string) {
        this.password_1 = newItem;
    }

    addPassword_2(newItem: string) {
        this.password_2 = newItem;
    }


    submitToFireBase() {


        this.client.name = this.name_client
        this.client.surname = this.surname_client
        this.client.email = this.email_client
        this.client.cap = this.cap_client
        this.client.street = this.street_client

        if (this.password_1 !== this.password_2)
            this.alertService.presentAlert('Le due password inserite non corrispondono','Errore','')
        else this.client.password = this.password_1

        this.fireBaseClientservice.addClient(this.client)

        //this.client

    }

}
