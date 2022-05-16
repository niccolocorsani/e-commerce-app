import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/compat/database";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ProductResponse} from "../response/product-response";
import {map} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use

@Injectable({
    providedIn: 'root'
})
export class FireBaseRequestProductsService {


    constructor(private db: AngularFireDatabase, private firestore: AngularFirestore, private afStorage: AngularFireStorage) {
    }


    productRef: AngularFireObject<any>;
    productsRef: AngularFireList<any>;

    products = []

    charged_image_ref: string

////CRUD
    public getProducts(): any {
        this.db.list('/products').valueChanges().subscribe(value => (console.log(value)));

    }


    public getProduct(product_key: string) {
        this.db.object('products/' + product_key).valueChanges().subscribe(value => (console.log(value)));
    }


    public addProduct(product: ProductResponse, product_key: string) {
        this.db.object('products/' + product_key).update(product)
    }


    public deleteProduct(product_key: string) {
        this.db.object('products/' + product_key).remove();
    }

////CRUD


//// Other methods
    public display_image(name: string, downloadUrl: string) {
        let url
        let img = document.getElementById('image2');
        img.setAttribute('src', downloadUrl);
        this.charged_image_ref = downloadUrl
        console.log(this.charged_image_ref);

        this.addProduct({
            name: 'ds',
            price: 32,
            id: 'de',
            description: "",
            img_name_ref: ""
        }, 'product_3')
    }

//// Other methods

}