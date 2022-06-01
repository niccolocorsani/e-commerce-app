import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FirebaseProductResponse} from "../../services/response/firebase-product-response";
import {FireBaseRequestProductService} from "../../services/firebase/fire-base-request-product.service";
import {FormBuilder,} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AlertIonicService} from "../../services/alert-popup-ionic/alert-ionic.service";
import {ModalController} from "@ionic/angular";
import {ModalProductComponent} from "./modal-product/modal-product.component";

@Component({
    selector: 'app-show-products',
    templateUrl: './show-products.component.html',
})
export class ShowProductsComponent implements OnInit {

    public listElements: Array<FirebaseProductResponse> = [];

    list = []


    constructor(private productsService: FireBaseRequestProductService, private fb: FormBuilder, private cd: ChangeDetectorRef, private afStorage: AngularFireStorage, private alertIonic: AlertIonicService, public modalController: ModalController) {
    }

    async ngOnInit() {
        this.listElements = await this.productsService.getProducts()
        console.log(this.list)
    }


    displayProductInfoModal(item: FirebaseProductResponse) {
        this.presentModal(item)
        //this.alertIonic.presentAlert('<img id="img-product" src="'+item.img_name_ref+'" class="" height="200">','a skdfna n dsna sdnas d askjd bajbdjasbdjasbdjasdbajsidjfn',item.description)
    }


    async presentModal(product: FirebaseProductResponse) {
        const modal = await this.modalController.create({
                component: ModalProductComponent,
                cssClass: 'my-custom-class',
                componentProps: {product: product}
            },
        );
        return await modal.present();
    }
}
