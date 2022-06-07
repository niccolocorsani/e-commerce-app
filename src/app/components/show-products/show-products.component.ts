import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FirebaseProductResponse} from "../../services/response/firebase-product-response";
import {FireBaseRequestProductService} from "../../services/firebase/fire-base-request-product.service";
import {FormBuilder,} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AlertIonicService} from "../../services/alert-popup-ionic/alert-ionic.service";
import {IonContent, ModalController} from "@ionic/angular";
import {ModalProductComponent} from "./modal-product/modal-product.component";

@Component({
    selector: 'app-show-products',
    templateUrl: './show-products.component.html',

})
export class ShowProductsComponent implements OnInit {

    public listElements: Array<FirebaseProductResponse> = [];


    constructor(private productsService: FireBaseRequestProductService, private fb: FormBuilder, private cd: ChangeDetectorRef, private afStorage: AngularFireStorage, private alertIonic: AlertIonicService, public modalController: ModalController, private ionContent: IonContent) {
    }

    async ngOnInit() {
        let scrolling = 0
        let i = 0
        this.listElements = await this.productsService.getProducts()
        console.log(this.listElements)
        while (true) {
            document.getElementById('scroller').scrollTo({
                top: 0,
                left: scrolling,
                behavior: 'smooth'
            });
            i++
            scrolling = scrolling + document.getElementById('scroller').scrollWidth / 5
            await this.delay(5000)
            if (i == 5) {
                scrolling = -scrolling
                i = 0
            }
            console.log(scrolling)
        }
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

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    apriProdotti(tipologia: string) {

        if (tipologia === 'arredamento') {
            this.listElements = this.listElements.filter(
                product => product.type === 'arredamento');
        }
        if (tipologia === 'borse') {
            this.listElements = this.listElements.filter(
                product => product.type === 'borse');
        }
        if (tipologia === 'accessori') {
            this.listElements = this.listElements.filter(
                product => product.type === 'accessori');
        }
        if (tipologia === 'ecosostenibili') {
            this.listElements = this.listElements.filter(
                product => product.type === 'ecosostenibili');
        }
        if (tipologia === 'fashion') {
            this.listElements = this.listElements.filter(
                product => product.type === 'fashion');
        }
        if (tipologia === 'arazzi') {
            this.listElements = this.listElements.filter(
                product => product.type === 'arazzi');
        }
        if (tipologia === 'cuscini') {
            this.listElements = this.listElements.filter(
                product => product.type === 'cuscini');
        }
        if (tipologia === 'arredamento') {
            this.listElements = this.listElements.filter(
                product => product.type === 'arredamento');
        }
        if (tipologia === 'orecchini') {
            this.listElements = this.listElements.filter(
                product => product.type === 'orecchini');
        }
        if (tipologia === 'cappelli') {
            this.listElements = this.listElements.filter(
                product => product.type === 'cappelli');
        }
        if (tipologia === 'sciarpe') {
            this.listElements = this.listElements.filter(
                product => product.type === 'sciarpe');
        }










        this.ionContent.scrollToPoint(0,300,300);
        console.log(this.listElements)
    }

}
