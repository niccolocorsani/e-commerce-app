import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {FireBaseRequestProductService} from "../../services/firebase/fire-base-request-product.service";
import {FormBuilder} from "@angular/forms";

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


    constructor(private productsService: FireBaseRequestProductService, private fb: FormBuilder, private cd: ChangeDetectorRef, private afStorage: AngularFireStorage) {
    }

    ngOnInit() {
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

        const id = 'name1';
        this.ref = this.afStorage.ref(id);
        this.task = this.ref.put(event.target.files[0]);
        this.uploadProgress = this.task.percentageChanges();

        let url
        //// il problema sta nell'asincronia delle cose.....         await this.ref.getDownloadURL().subscribe(value =>{url = value} non lo aspetta
        await this.ref.getDownloadURL().subscribe(value => (this.productsService.display_image('name1', value)))
        this.delay(4000)
        console.log(url)
    }

    addProduct() {
        ////TODO da finire per bene...... che prende l'ultimo nome del prodotto e lo aggiunge
        this.productsService.get_last_product_name()
        ////TODO da finire per bene...... che prende l'ultimo nome del prodotto e lo aggiunge



        this.productsService.addProduct({
            name: 'ds',
            price: 32,
            id: 'de',
            description: "",
            img_name_ref: ""
        }, 'product_3')
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
