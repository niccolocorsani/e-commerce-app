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


    productRef: AngularFireObject<any>;
    productsRef: AngularFireList<any>;
    products = []
    charged_image_ref: string
    last_product = ''


    constructor(private db: AngularFireDatabase, private firestore: AngularFirestore, private afStorage: AngularFireStorage) {
    }

////CRUD
    public getProducts(): any {
        this.db.list('/products').valueChanges().subscribe(value => {
            (console.log(value))
            this.products = value
        });
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

    public get_last_product_name(): any {
        this.db.list('/products').snapshotChanges().subscribe(val =>{
            console.log(val[val.length-1].key)
            this.last_product = val[val.length-1].key
        })
    }

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