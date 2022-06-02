import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {FireBaseRequestProductService} from "../../services/firebase/fire-base-request-product.service";
import {FormBuilder} from "@angular/forms";
import {FirebaseProductResponse} from "../../services/response/firebase-product-response";
import {AlertIonicService} from "../../services/alert-popup-ionic/alert-ionic.service";

@Component({
    selector: 'app-consultant-e-commerce-features',
    templateUrl: './consultant-e-commerce-features.component.html',
})
export class ConsultantECommerceFeaturesComponent implements OnInit {


    img: any;
    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;
    uploadProgress: Observable<number>;
    price = 'prezzo';


    description = 'descrizione';
    name = 'nome';
    type = 'tipologia'

    product = new FirebaseProductResponse()
    url: any;


    constructor(private productsService: FireBaseRequestProductService, private fb: FormBuilder, private cd: ChangeDetectorRef, private afStorage: AngularFireStorage, private alertService: AlertIonicService) {
    }

    ngOnInit() {
    }


    addName(newItem: string) {
        this.name = newItem;
    }

    addDescription(newItem: string) {
        this.description = newItem;
    }

    addPrice(newItem: string) {
        this.price = newItem;
    }

    addType(newItem: string) {
        this.type = newItem;
    }


    async onFileChangeImage(event: any) {
        const reader = new FileReader();
        let arrayBuffer: any;
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            this.img = document.getElementById('image');

            reader.onload = () => {
                arrayBuffer = reader.result;
                if (typeof reader.result === 'string') {
                    this.img.setAttribute('src', reader.result);
                }
                // need to run CD since file load runs outside of zone
                this.cd.markForCheck();

            }
        }
        const id = (Math.random() + 1).toString(36).substring(7);
        this.ref = this.afStorage.ref(id);
        this.task = this.ref.put(event.target.files[0]);
        this.uploadProgress = this.task.percentageChanges();


        await this.ref.getDownloadURL().subscribe(value => (this.url = value))
        await this.delay(4000)
        this.productsService.display_image('name1', this.url)
    }

    addProduct() {


        this.productsService.addProduct({
            name: this.name,
            price: Number(this.price),
            id: '',
            description: this.description,
            img_name_ref: this.url,
            type: this.type
        }, '')
        this.alertService.presentAlert('Prodotto aggiunto con successo', '', '')

    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


}
