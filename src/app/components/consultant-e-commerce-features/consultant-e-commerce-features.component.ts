import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";
import {FireBaseRequestProductService} from "../../services/firebase/fire-base-request-product.service";
import {FormBuilder} from "@angular/forms";
import {FirebaseProductResponse} from "../../services/response/firebase-product-response";
import {AlertIonicService} from "../../services/alert-popup-ionic/alert-ionic.service";
import {OpenComponentsService} from "../../services/open-components/open-components.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-consultant-e-commerce-features',
    templateUrl: './consultant-e-commerce-features.component.html',
})
export class ConsultantECommerceFeaturesComponent implements OnInit {


    img: any;
    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;
    uploadProgress: Observable<number>;
    variable_to_wait: any

    price = 'Prezzo';
    description = 'Descrizione';
    name = 'Nome';
    type = 'Tipologia'
    peso = 'Peso'
    materiale = 'Materiale';
    dimensioni = 'Dimensioni';


    product_price = ''
    product_description = ''
    product_name = ''
    product_type = ''
    product_materiale = '';
    product_dimensioni = '';

    product_peso = 10

    product = new FirebaseProductResponse()
    url: any;


    constructor(private productsService: FireBaseRequestProductService, private fb: FormBuilder, private cd: ChangeDetectorRef, private afStorage: AngularFireStorage, private alertService: AlertIonicService, private openComponentService: OpenComponentsService, private router : Router) {
    }

    ngOnInit() {
        console.log('oo')
    }


    addName(newItem: string) {
        this.product_name = newItem;
    }

    addDescription(newItem: string) {
        this.product_description = newItem;
    }

    addPrice(newItem: string) {
        this.product_price = newItem;
    }

    addPeso(newItem: string) {
        this.product_peso = Number(newItem);

    }

    selectedType($event: any) {
        this.product_type = $event.target.value;
    }


    addMateriale($event: any) {
        this.product_materiale = $event.target.value;

    }

    addDimensioni($event: any) {
        this.product_dimensioni = $event.target.value;

    }

    async onFileChangeImage(event: any) {

        if (this.product_type == '' || this.product_name == '' || this.product_description == '' || this.product_price == '' || this.product_type == '') {
            await this.alertService.presentAlert('Riempire tutti i campi prima di procedere', '', '')
            this.router.navigate(['/consultant123123-number123']).then(page => {
                window.location.reload();
            });
        }

  //// questo controllo verifica che il numero productpeso sia un numero e dal momento che precedentemente è stato applicato il metodo Number().. se ritornal Nan non è stato inserito un nemero parabile
        if (isNaN(this.product_peso)) {
            await this.alertService.presentAlert('(valore numerico)','Inserire un peso corretto ','')
            this.router.navigate(['/consultant123123-number123']).then(page => {
                window.location.reload();
            });
        }
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

        let progress = 0

        await this.uploadProgress.subscribe(value => {
            progress = value
            //// Fondamentale che il file sia caricato completamente, altrimenti il flusso andrà male
        })


        await this.delay(1000)

        if (progress != 100)
            await this.delay(3000)
        if (progress != 100)
            await this.delay(3000)
        if (progress != 100)
            await this.delay(3000)
        if (progress != 100)
            await this.delay(5000)
        if (progress != 100)
            await this.delay(6000)
        if (progress != 100)
            await this.delay(7000)
        if (progress != 100)
            await this.delay(8000)
        if (progress != 100)
            await this.delay(9000)
        if (progress != 100)
            await this.delay(10000)
        if (progress != 100)
            await this.delay(12000)
        if (progress != 100)
            await this.delay(15000)


        await this.ref.getDownloadURL().subscribe(value => {
            this.url = value

            this.productsService.addProduct({
                name: this.product_name,
                price: Number(this.product_price),
                id: '',
                description: this.description,
                img_name_ref: this.url,
                type: this.type,
                peso: this.product_peso,
                materiale: this.product_materiale,
                dimensioni: this.product_dimensioni,
                city: '',
                street: '',
                cap: ''
            }, this.product_name)
        })

        let prod = this.productsService.getProduct(this.product_name)
        if (prod != null)
            await this.alertService.presentAlert('Prodotto aggiunto con successo', '', '')
    }


    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async spinner_delay() {
        this.openComponentService.spinner = true
        while (this.variable_to_wait === undefined) {
            await this.delay(1000)
        }
        this.openComponentService.spinner = false
    }

}
