import {

    ChangeDetectorRef,
    Component, ElementRef,
    HostListener,
    OnInit,
    ViewChild
} from '@angular/core';
import {FirebaseProductResponse} from "../../services/response/firebase-product-response";
import {FireBaseRequestProductService} from "../../services/firebase/fire-base-request-product.service";
import {FormBuilder,} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AlertIonicService} from "../../services/alert-popup-ionic/alert-ionic.service";
import {IonContent, ModalController} from "@ionic/angular";
import {ModalProductComponent} from "./modal-product/modal-product.component";
import {MyCookieService} from "../../services/my-cookies-service/my-cookie.service";
import {MailServiceService} from "../../services/mail-notification-service/mail-service.service";
import {InitializeCurrentClientService} from "../../services/utility-services/initialize-current-client.service";
import {GlobalVariablesService} from "../../services/utility-services/global-variables.service";

@Component({
    selector: 'app-show-products',
    templateUrl: './show-products.component.html',

})
export class ShowProductsComponent implements OnInit {

    public listElements: Array<FirebaseProductResponse> = [];
    private scrHeight: number;
    private scrWidth: number;
    display = true

    @ViewChild('myDiv') myDiv: ElementRef<HTMLElement>;

     triggerFalseClick() {
        //TODO da finire... Guarda che da un errore nella console normaleeee Questo serve perchè quando lo schermo è piccolo non parte in automatico il video, ma forse cliccando play su di esso parte
       // let el: HTMLElement = this.myDiv.nativeElement;
       // el.click();
    }

    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        if (this.scrWidth < 550) {
            this.display = false
        } else this.display = true

    }


    constructor(private productsService: FireBaseRequestProductService, private fb: FormBuilder, private cd: ChangeDetectorRef, private afStorage: AngularFireStorage, private alertIonic: AlertIonicService, public modalController: ModalController, private ionContent: IonContent, private myCookieService: MyCookieService, private mailService: MailServiceService, private initializeClientService: InitializeCurrentClientService, private globalVariableService: GlobalVariablesService) {
        this.getScreenSize();
    }

    async ngOnInit() {


        this.triggerFalseClick()


        await this.initializeClientService.initialize_client()
        console.log('ds')

        let scrolling = 0
        let i = 0
        this.listElements = await this.productsService.getProducts()
        while (true) {
            document.getElementById('scroller').scrollTo({top: 0, left: scrolling, behavior: 'smooth'});
            i++
            scrolling = scrolling + document.getElementById('scroller').scrollWidth / 5
            await this.delay(5000)
            await this.delay(100)

            if (i == 5) {
                scrolling = -scrolling
                i = 0
            }
        }

    }

    async ngAfterViewInit() {

        await this.ionContent.scrollToBottom(100)
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


    async apriProdotti(tipologia: string) {

        this.listElements = await this.productsService.getProducts()

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

        this.ionContent.scrollToPoint(0, 10000, 400);
    }

}
