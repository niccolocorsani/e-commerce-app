import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";

@Component({
    selector: 'app-modal-confirm-order',
    templateUrl: './modal-confirm-order.component.html'
})
export class ModalConfirmOrderComponent implements OnInit {

    constructor(private router: Router, public modalController: ModalController) {
    }

    ngOnInit() {
    }


    navigateToCarrello() {
        this.router.navigate(['/carrello'])
        this.dismiss()
    }



    dismiss() {
        this.modalController.dismiss({
            'dismissed': true
        });
    }
}
