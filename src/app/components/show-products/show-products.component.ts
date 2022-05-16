import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProductResponse} from "../../services/response/product-response";
import {FireBaseRequestProductsService} from "../../services/request/fire-base-request-products.service";
import {FormBuilder, Validators} from "@angular/forms";
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";

@Component({
    selector: 'app-show-products',
    templateUrl: './show-products.component.html',
})
export class ShowProductsComponent implements OnInit {

    public listElements: Array<ProductResponse> = [];

    constructor() {
    }

    ngOnInit(): void {
    }


}
