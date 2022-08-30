import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";

@Component({
    selector: 'app-modal-confirm-order',
    templateUrl: './modal-confirm-order.component.html'
})
export class ModalConfirmOrderComponent implements OnInit {


    @Input() product

    constructor(private router: Router, public modalController: ModalController) {
    }

    ngOnInit() {
    }


    navigateToCarrello() {
        this.router.navigate(['/carrello']).then(page => { window.location.reload(); });
        this.dismiss()
    }



    dismiss() {
        this.modalController.dismiss({
            'dismissed': true
        });
    }
}
