import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/compat/database";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FirebaseProductResponse} from "../response/firebase-product-response";
import {catchError, map, throwError} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {OpenComponentsService} from "../open-components/open-components.service";
import {AngularFireFunctions} from "@angular/fire/compat/functions";
import {AlertController} from "@ionic/angular";
import {HttpErrorResponse} from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class FireBaseRequestProductService {


    productRef: AngularFireObject<any>;
    productsRef: AngularFireList<any>;
    products = []
    charged_image_ref: string
    last_product = ''
    variable_to_wait: any;


    myObserver = {
        next: (value: any) => this.variable_to_wait = value,
        error: (err: any) => alert('Observer got an error: ' + err + '..'),
    };

    constructor(private alertController: AlertController, private functions: AngularFireFunctions, private db: AngularFireDatabase, private firestore: AngularFirestore, private afStorage: AngularFireStorage, private openComponentService: OpenComponentsService) {
    }

////CRUD
    public async getProducts() {
        this.db.list('/products').valueChanges().subscribe(this.myObserver);
        console.log('getProducts API')
        await this.spinner_delay()
        return this.variable_to_wait
    }


    public async getProduct(product_key: string) {
        this.variable_to_wait = await this.db.object('products/' + product_key).valueChanges().subscribe(this.myObserver);
        await this.spinner_delay()
        return this.variable_to_wait
    }


    public async addProduct(product: FirebaseProductResponse, product_key: string) {
        this.variable_to_wait = await this.db.object('products/' + product.name).update(product)


    }


    public deleteProduct(product_key: string) {
        this.db.object('products/' + product_key).remove();
    }

////CRUD
    public get_last_product_name(): any {
        this.db.list('/products').snapshotChanges().subscribe(val => {
            console.log(val[val.length - 1].key)
            this.last_product = val[val.length - 1].key
        })
    }

//// Other methods
    public display_image(name: string, downloadUrl: string) {

        console.log(downloadUrl)
        let url
        let img = document.getElementById('image2');
        img.setAttribute('src', downloadUrl);
        this.charged_image_ref = downloadUrl
        console.log(this.charged_image_ref);

    }

//// Other methods
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async spinner_delay() {
        this.openComponentService.spinner = true
        while (this.variable_to_wait === undefined) {
            await this.delay(2000)
        }
        this.openComponentService.spinner = false
    }
}