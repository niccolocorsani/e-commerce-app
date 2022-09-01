import {Component, OnInit} from '@angular/core';
import {OpenComponentsService} from "../../services/open-components/open-components.service";
import {Router} from "@angular/router";
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {AlertIonicService} from "../../services/alert-popup-ionic/alert-ionic.service";
import {GlobalVariablesService} from "../../services/utility-services/global-variables.service";
import {MyCookieService} from "../../services/my-cookies-service/my-cookie.service";
import {InitializeCurrentClientService} from "../../services/utility-services/initialize-current-client.service";



@Component({
    selector: 'app-carrello',
    templateUrl: './carrello.component.html'
})
export class CarrelloComponent implements OnInit {


    products = []
    client
    totalePrezzo = 0;
    nessunProdotto = false;


    constructor(private openComponentsService: OpenComponentsService, private router: Router, private fireBaseClientService: FireBaseRequestClientService, private ionicAlert: AlertIonicService, private globalVariableService: GlobalVariablesService, private myCookieService: MyCookieService, private initializeCurrentClient: InitializeCurrentClientService) {
    }


    async ngOnInit() {

        await this.initializeCurrentClient.initialize_client()
        if (this.globalVariableService.currentLoggedUserId == '') {
            await this.ionicAlert.presentAlert('Accetta i cookie o registrati per procedere con gli acquisti', '', '')// caso in cui utente non è ne registrato ne ha accettato i cookies
            this.router.navigate(['/client']).then(page => {
                window.location.reload();
            });
        }

        this.client = await this.fireBaseClientService.getClient(this.globalVariableService.currentLoggedUserId)
        await this.fireBaseClientService.delay(500)
        this.client = await this.fireBaseClientService.getClient(this.globalVariableService.currentLoggedUserId)

        this.products = this.client.products
        this.products = this.client.products.filter((value, index, self) => index === self.findIndex((t) => (t.place === value.place && t.name === value.name)))
        this.products = this.products.filter(value => value.description != '' && value.name != '' && value.img_name_ref != '');
        this.products.forEach(product => {
            this.totalePrezzo = this.totalePrezzo + Number(product.price)
        })

        if(this.totalePrezzo == 0) this.nessunProdotto = true
        else  this.nessunProdotto = false


        if(!this.globalVariableService.currentLoggedUserId.includes("okie"))
        document.getElementById("logged").textContent = this.globalVariableService.currentLoggedUserId.split('-',).join('.').split('_',).join('@');


    }

    navigateToProducts() {
        this.router.navigate(['/client'])
    }

    navigateToCheckOut() {
        if (this.products.length == 0) {
            this.ionicAlert.presentAlert('Nessun prodotto presente nel carrello', '', '')
            return
        }
        this.router.navigate(['/checkout'])
    }


    removeProduct(index: any) {


        this.client.products.splice(index, 1)

        this.fireBaseClientService.addClient(this.client)
        //this.fireBaseClientService.addClient()
        // await this.fireBaseClientService.getClient(mail)
        this.router.navigate(['/carrello']).then(page => {
            window.location.reload();
        });

    }


}
