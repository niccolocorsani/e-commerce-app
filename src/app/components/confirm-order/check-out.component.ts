import {Component, OnInit} from '@angular/core';
import Stepper from "bs-stepper";
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../services/response/firebase-client-response";
import {FirebaseProductResponse} from "../../services/response/firebase-product-response";
import {GlobalVariablesService} from "../../services/utility-services/global-variables.service";
import {MyCookieServiceService} from "../../services/my-cookies-service/my-cookie-service.service";
import {Router} from "@angular/router";

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
    city: any;
    street: any;
    cap: any;

    constructor(private fireBaseClientService: FireBaseRequestClientService, private globalVariableService: GlobalVariablesService, private myCookieService: MyCookieServiceService, private router: Router) {
    }

    async ngOnInit() {


        this.stepper = new Stepper(document.querySelector('#stepper2'), {
            linear: true,
            animation: true
        })

        await this.myCookieService.initCookie()
        await this.myCookieService.initCookieCredential()

        let id = this.globalVariableService.currentLoggedUserId
        this.client = await this.fireBaseClientService.getClient(id)
        await this.fireBaseClientService.delay(500)

        if (this.client == undefined) {
            this.client = await this.fireBaseClientService.getClient(id)
            await this.fireBaseClientService.delay(1000)
        }
        if (this.client == undefined) {
            this.client = await this.fireBaseClientService.getClient(id)
            await this.fireBaseClientService.delay(1000)
        }
        if (this.client == undefined) {
            this.client = await this.fireBaseClientService.getClient(id)
            await this.fireBaseClientService.delay(1000)
        }


        console.log(this.client)
        this.products = this.client.products
        this.products.shift()

        this.products.forEach(product => {
            this.totalPrice = this.totalPrice + product.price
        })


        /////TODO da finire che se non è presente l'indirizzo a cui inviare le cose.. Lo chiede nello stepper, altrimenti lo mostra

        try {
            this.client.street
        } catch (e) {
            this.addressesPresent = false
        }
    }


    next() {
        this.stepper.next()
    }

    onSubmit() {
        return false
    }

    openPayments() {
        this.router.navigate(['/payments']).then(page => {
            window.location.reload();
        });
    }

    addCity($event: any) {

    }

    addStreet($event: any) {

    }

    addCap($event: any) {

    }
}
