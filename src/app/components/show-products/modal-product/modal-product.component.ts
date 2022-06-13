import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AlertIonicService} from "../../../services/alert-popup-ionic/alert-ionic.service";
import {FirebaseProductResponse} from "../../../services/response/firebase-product-response";
import {ModalConfirmOrderComponent} from "./modal-confirm-order/modal-confirm-order.component";
import {FireBaseRequestClientService} from "../../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../../services/response/firebase-client-response";
import {FireBaseRequestProductService} from "../../../services/firebase/fire-base-request-product.service";
import {GlobalVariablesService} from "../../../services/utility-services/global-variables.service";

@Component({
    selector: 'app-modal-product',
    templateUrl: './modal-product.component.html'
})
export class ModalProductComponent implements OnInit {


    @Input() product

    constructor(public modalController: ModalController, private alertIonicService: AlertIonicService, private fireBaseRequestClientService: FireBaseRequestClientService, private globalVariableService: GlobalVariablesService) {
    }

    ngOnInit() {
    }

    async aggiungiAlCarrello(product) {


        console.log('Prodotto: ' + product.name + 'aggiunto al carrello')
        let badgeValue = document.getElementById('badge').textContent;
        if (badgeValue == '') badgeValue = '1'
        else {
            const num = Number(badgeValue);
            badgeValue = String(num + 1)
        }
        document.getElementById('badge').textContent = badgeValue


        this.dismiss()


        this.presentModal(product)


        let client = new FirebaseClientResponse()



        // Ridondanza di chiamate perchè spersso non funzionano
        client = await this.fireBaseRequestClientService.getClient(this.globalVariableService.currentLoggedUserId)
        await this.fireBaseRequestClientService.delay(100)

        if (client == null) {

            let client = await this.fireBaseRequestClientService.getClient(this.globalVariableService.currentLoggedUserId)
            client.products.push(product)
            this.fireBaseRequestClientService.addClient(client)
            return

        }
        if (client == undefined) {

            let client = await this.fireBaseRequestClientService.getClient(this.globalVariableService.currentLoggedUserId)
            client.products.push(product)
            this.fireBaseRequestClientService.addClient(client)
            return


        }
        if (client == undefined) {

            client = await this.fireBaseRequestClientService.getClient(this.globalVariableService.currentLoggedUserId)
            client.products.push(product)
            this.fireBaseRequestClientService.addClient(client)
            return

        }
        if (client == undefined) {

            await this.fireBaseRequestClientService.getClient(this.globalVariableService.currentLoggedUserId)
            client.products.push(product)
            this.fireBaseRequestClientService.addClient(client)
            return

        }
        client.products.push(product)
        this.fireBaseRequestClientService.addClient(client)


        // Ridondanza di chiamate perchè spersso non funzionano

    }

    dismiss() {
        this.modalController.dismiss({
            'dismissed': true
        });
    }


    async presentModal(product: FirebaseProductResponse) {
        const modal = await this.modalController.create({
                component: ModalConfirmOrderComponent,
                componentProps: {product: product}
            },
        );
        return await modal.present();
    }
}
