import {Component, OnInit} from '@angular/core';
import Stepper from "bs-stepper";
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../services/response/firebase-client-response";
import {FirebaseProductResponse} from "../../services/response/firebase-product-response";
import {GlobalVariablesService} from "../../services/utility-services/global-variables.service";
import {MyCookieService} from "../../services/my-cookies-service/my-cookie.service";
import {Router} from "@angular/router";
import {InitializeCurrentClientService} from "../../services/utility-services/initialize-current-client.service";

@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html'
})
export class CheckOutComponent implements OnInit {


    private stepper: Stepper;
    private client = new FirebaseClientResponse();
    private products: any;
    totalPrice = 0
    addressesPresent = true;
    namesPresents = true;


    constructor(private fireBaseClientService: FireBaseRequestClientService, private globalVariableService: GlobalVariablesService, private myCookieService: MyCookieService, private router: Router, private initializeCurrentClient : InitializeCurrentClientService) {
    }

    async ngOnInit() {


        this.stepper = new Stepper(document.querySelector('#stepper2'), {
            linear: false,
            animation: true
        })



        await this.initializeCurrentClient.initialize_client()
        this.client = this.globalVariableService.client


        this.products = this.client.products
        this.products.forEach(product => {
            this.totalPrice = this.totalPrice + product.price
        })


        if (this.client.street == undefined || this.client.street == '') this.addressesPresent = false
        if (this.client.name == undefined || this.client.name == '') this.namesPresents = false


    }


    next() {
        this.stepper.next()
    }


    addCity(newitem: string) {
        this.client.city = newitem;
    }

    addStreet(newitem: string) {
        this.client.street = newitem;
    }

    addCap(newitem: string) {
        this.client.cap = newitem;
    }


    addName(newitem: string) {
        this.client.name = newitem

    }

    addSurname(newitem: string) {
        this.client.surname = newitem
    }

    addPhone(newitem: string) {
        this.client.phone = newitem
    }

    onSubmit() {
        return false
    }

    async openPayments() {
        await this.fireBaseClientService.addClient(this.client)
        await this.fireBaseClientService.delay(100)
        this.router.navigate(['/payments']).then(page => {
            window.location.reload();
        });
    }


}
