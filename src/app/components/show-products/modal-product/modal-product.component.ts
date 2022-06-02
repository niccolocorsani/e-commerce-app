import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AlertIonicService} from "../../../services/alert-popup-ionic/alert-ionic.service";
import {FirebaseProductResponse} from "../../../services/response/firebase-product-response";
import {ModalConfirmOrderComponent} from "./modal-confirm-order/modal-confirm-order.component";
import {FireBaseRequestClientService} from "../../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../../services/response/firebase-client-response";

@Component({
    selector: 'app-modal-product',
    templateUrl: './modal-product.component.html'
})
export class ModalProductComponent implements OnInit {


    @Input() product

    constructor(public modalController: ModalController, private alertIonicService: AlertIonicService, private fireBaseRequestClientService: FireBaseRequestClientService) {
    }

    ngOnInit() {
    }

    async aggiungiAlCarrello(product) {



        if (document.getElementById("logged").textContent.includes('Accedi')) {
            this.alertIonicService.presentAlert('Esegui il login prima di aggiungere prodotti','','')
            return
        }

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
        client = await this.fireBaseRequestClientService.getClient(document.getElementById("logged").textContent.split('.',).join('-').split('@',).join('_'))

        console.log(client)


        client.products.push(product)
        this.fireBaseRequestClientService.addClient(client)

    }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
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
