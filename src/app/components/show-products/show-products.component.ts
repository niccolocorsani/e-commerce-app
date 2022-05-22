import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProductResponse} from "../../services/response/product-response";
import {FireBaseRequestProductService} from "../../services/firebase/fire-base-request-product.service";
import {FormBuilder, } from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
    selector: 'app-show-products',
    templateUrl: './show-products.component.html',
})
export class ShowProductsComponent implements OnInit {

    public listElements: Array<ProductResponse> = [];


    constructor(private productsService: FireBaseRequestProductService, private fb: FormBuilder, private cd: ChangeDetectorRef, private afStorage: AngularFireStorage) {
    }

    ngOnInit() {
    }

    getProducts() {
        this.productsService.getProducts();
    }

    getProduct() {
        this.productsService.getProduct('product_1');
    }

}
