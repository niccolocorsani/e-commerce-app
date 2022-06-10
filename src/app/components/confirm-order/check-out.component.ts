import {Component, OnInit} from '@angular/core';
import Stepper from "bs-stepper";
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../services/response/firebase-client-response";
import {FirebaseProductResponse} from "../../services/response/firebase-product-response";
import {GlobalVariablesService} from "../../services/utility-services/global-variables.service";

@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html'
})
export class CheckOutComponent implements OnInit {

    pay = false;

    private stepper: Stepper;
    private client = new FirebaseClientResponse();
    private products: any;
    totalPrice = 0

    constructor(private fireBaseClientService: FireBaseRequestClientService, private globalVariableService: GlobalVariablesService) {
    }

    async ngOnInit() {

        let mail
        mail = document.getElementById("logged").textContent.split('.',).join('-').split('@',).join('_')    //let mail = document.getElementById("logged").textContent.split('.',).join('-').split('@',).join('_')

        if (this.globalVariableService.currentLoggedUserId != '')
            mail = this.globalVariableService.currentLoggedUserId

        this.client = await this.fireBaseClientService.getClient(mail)
        console.log(this.client)
        this.products = this.client.products
        this.products.shift()

        this.products.forEach(product => {
            this.totalPrice = this.totalPrice + product.price
        })

        if (this.client == undefined) {

        }
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
            linear: true,
            animation: true
        })
    }

    next() {
        this.stepper.next()
    }

    onSubmit() {
        return false
    }

    openPayments() {
        this.pay = true
    }

    logged() {

        if (this.client.city == undefined)
            return true
        else return false
    }
}
