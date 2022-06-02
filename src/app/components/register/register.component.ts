import {Component} from '@angular/core';
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../services/response/firebase-client-response";
import {AlertController, ModalController} from "@ionic/angular";
import {AlertIonicService} from "../../services/alert-popup-ionic/alert-ionic.service";
import Stepper from "bs-stepper";
import {FirebaseProductResponse} from "../../services/response/firebase-product-response";
import {Router} from "@angular/router";
import {
    ModalConfirmOrderComponent
} from "../show-products/modal-product/modal-confirm-order/modal-confirm-order.component";
import {GeoLocationModalHelperComponent} from "./geo-location-modal-helper/geo-location-modal-helper.component";


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
    city = 'Città';
    phone= 'Numero di telefono';



    password_1: string
    password_2: string


    client = new FirebaseClientResponse()
    name_client = "";
    surname_client = "";
    street_client = '';
    email_client = ""
    city_client = "";
    phone_client = ""

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

    next4() {
        this.stepper.to(4);
        document.getElementById("step3").setAttribute("style", "background-color: #c1a977;")
        document.getElementById("step44").setAttribute("style", "background-color: black;")


    }

    onSubmit() {
        return false;
    }

    constructor(private fireBaseClientservice: FireBaseRequestClientService, private alertService: AlertIonicService, private router: Router, public modalController: ModalController) {
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

    addPhone(newItem: string) {
        this.phone_client = newItem;
    }


    addPassword_1(newItem: string) {
        this.password_1 = newItem;
    }

    addPassword_2(newItem: string) {
        this.password_2 = newItem;
    }

    addCity(newItem: string) {
        this.city_client = newItem;
    }

    submitToFireBase() {

        /// SE mail inserita con Google
        if (document.getElementById('mail').textContent != '') {
            this.client.email = document.getElementById('mail').textContent.split('.',).join('-').split('@',).join('_')
            console.log(this.client.email)

        } else this.client.email = this.email_client.split('.',).join('-').split('@',).join('_')
        /// SE mail inserita con Google


        if (this.password_1 !== this.password_2)
            this.alertService.presentAlert('Le due password inserite non corrispondono', 'Errore', '')
        else this.client.password = this.password_1


        this.client.name = this.name_client
        this.client.surname = this.surname_client
        this.client.cap = this.cap_client
        this.client.street = this.street_client
        this.client.phone = this.phone_client
        this.client.city = this.city_client
        this.products.push({description: "", id: "", img_name_ref: "", name: "", type: "", price: 3})
        this.client.products = this.products
        this.fireBaseClientservice.addClient(this.client)
        this.alertService.presentAlert('Utente registrato con successo', '', '')
        document.getElementById("logged").textContent = this.client.email.split('-',).join('.').split('_',).join('@');
        this.router.navigate(['/client'])

    }


    async openModalLocation() {
        const modal = await this.modalController.create({
                component: GeoLocationModalHelperComponent,
            },
        );
        modal.onDidDismiss()
            .then((data) => {

                this.cap = data.data['cap']
                this.cap_client = data.data['cap'];

                this.city = data.data['city']
                this.city_client = data.data['city']

                this.street = data.data['street']
                this.street_client = data.data['street']; // Here's your selected user!

            });

        return await modal.present();
    }


}
