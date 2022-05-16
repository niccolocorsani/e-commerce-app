import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {FireBaseRequestProductsService} from "../../services/request/fire-base-request-products.service";
import {FormBuilder} from "@angular/forms";

@Component({
    selector: 'app-consultant-e-commerce-features',
    templateUrl: './consultant-e-commerce-features.component.html',
})
export class ConsultantECommerceFeaturesComponent implements OnInit {

    constructor(private productsService: FireBaseRequestProductsService, private fb: FormBuilder, private cd: ChangeDetectorRef, private afStorage: AngularFireStorage) {
    }

    ngOnInit() {
    }


    getProducts() {
        this.productsService.getProducts();
    }

    getProduct() {
        this.productsService.getProduct('product_1');
    }

    addProduct() {
        this.productsService.addProduct({
            name: 'ds',
            price: 32,
            id: 'de',
            description: "",
            img_name_ref: ""
        }, 'product_3')
    }


    img: any;
    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;
    uploadProgress: Observable<number>;

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

        const id = 'name1';
        this.ref = this.afStorage.ref(id);
        this.task = this.ref.put(event.target.files[0]);
        this.uploadProgress = this.task.percentageChanges();

        let url
        ////TODO il problema sta nell'asincronia delle cose.....         await this.ref.getDownloadURL().subscribe(value =>{url = value} non lo aspetta

        await this.ref.getDownloadURL().subscribe(value => (this.productsService.display_image('name1', value)))

        this.delay(4000)

        console.log(url)


    }


    addItem(newItem: string) {
        console.log(newItem);
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
