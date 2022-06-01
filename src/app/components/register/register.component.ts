import {Component} from '@angular/core';
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../services/response/firebase-client-response";
import {AlertController} from "@ionic/angular";
import {AlertIonicService} from "../../services/alert-popup-ionic/alert-ionic.service";
import Stepper from "bs-stepper";
import {FirebaseProductResponse} from "../../services/response/firebase-product-response";


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
    name_client = "";
    surname_client = "";
    street_client = '';
    email_client = ""
    cap_client = '' //// se qualche valore è undefined o null la richiesta http non
    products = []


    private stepper: Stepper;

    next2() {
        this.stepper.to(2);
        document.getElementById("step2").setAttribute("style", "background-color: black;")
        document.getElementById("step1").setAttribute("style", "background-color: #c1a977;")
        document.getElementById("step3").setAttribute("style", "background-color: #c1a977;")

    }

    next3() {
        this.stepper.to(3);
        document.getElementById("step3").setAttribute("style", "background-color: black;")
        document.getElementById("step2").setAttribute("style", "background-color: #c1a977;")
        document.getElementById("step1").setAttribute("style", "background-color: #c1a977;")

    }

    onSubmit() {
        return false;
    }

    constructor(private fireBaseClientservice: FireBaseRequestClientService, private alertService: AlertIonicService) {
    }


    ngOnInit(): void {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
            linear: true,
            animation: true
        })
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

        /// SE mail inserita con Google
        if (document.getElementById('mail').textContent != null) {
            this.client.email = document.getElementById('mail').textContent.split('.',).join('-').split('@',).join('_')
            console.log(this.client.email)
        } else this.client.email = this.email_client.split('.',).join('-').split('@',).join('_')
        /// SE mail inserita con Google

        if (this.password_1 !== this.password_2)
            this.alertService.presentAlert('Le due password inserite non corrispondono', 'Errore', '')
        else this.client.password = this.password_1


        alert(this.client.email)
        this.client.name = this.name_client
        this.client.surname = this.surname_client
        this.client.cap = this.cap_client
        this.client.street = this.street_client
        this.products.push({
            description: "", id: "", img_name_ref: "", name: "", type: "",
            price: 3

        })
        this.client.products = this.products
        this.fireBaseClientservice.addClient(this.client)
        this.alertService.presentAlert('Utente registrato con successo', '', '')


        document.getElementById("logged").textContent = this.client.email.split('-',).join('.').split('_',).join('@');

        //this.client
    }


}
