import {Component, OnInit} from '@angular/core';
import {OpenComponentsService} from "../../services/open-components/open-components.service";
import {Router} from "@angular/router";
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../services/response/firebase-client-response";
import {FirebaseProductResponse} from "../../services/response/firebase-product-response";
import {FireBaseRequestProductService} from "../../services/firebase/fire-base-request-product.service";
import {AlertIonicService} from "../../services/alert-popup-ionic/alert-ionic.service";
import {GlobalVariablesService} from "../../services/utility-services/global-variables.service";
import {MyCookieServiceService} from "../../services/my-cookies-service/my-cookie-service.service";

@Component({
    selector: 'app-carrello',
    templateUrl: './carrello.component.html'
})
export class CarrelloComponent implements OnInit {


    products = []
    client
    totalePrezzo = 0;


    constructor(private openComponentsService: OpenComponentsService, private router: Router, private fireBaseClientService: FireBaseRequestClientService, private ionicAlert: AlertIonicService, private globalVariableService: GlobalVariablesService, private myCookieService: MyCookieServiceService) {
    }


    async ngOnInit() {


        console.log('carrello')
        let id = document.getElementById("logged").textContent.split('.',).join('-').split('@',).join('_')    //let mail = document.getElementById("logged").textContent.split('.',).join('-').split('@',).join('_')
        if (id.includes('ccedi')) // caso in cui utente non sia loggato
            await this.myCookieService.initCookie()
        await this.myCookieService.initCookieCredential()

        if (this.globalVariableService.currentLoggedUserId == '')
            alert('accetta i cookie o registrati per procedere con gli acquisti')// caso in cui utente non è ne registrato ne ha accettato i cookies

        this.client = await this.fireBaseClientService.getClient(this.globalVariableService.currentLoggedUserId)

        await this.fireBaseClientService.delay(500)

        this.client = await this.fireBaseClientService.getClient(this.globalVariableService.currentLoggedUserId)

        console.log(this.client)
        this.products = this.client.products

        this.products = this.products.filter((value, index, self) =>
            index === self.findIndex((t) => (t.place === value.place && t.name === value.name))
        )
        this.products = this.products.filter(product => product.description != '')

        document.getElementById('badge').textContent = String(this.products.length)

        console.log('Prodotti' + this.client.products)


        this.products.forEach(product => {
            this.totalePrezzo =  this.totalePrezzo + Number(product.price)
            console.log(this.totalePrezzo)
        })
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

        console.log('prima della rimozione ' + this.client.products)


        if (this.client.products[index + 1].description != '') {
            this.client.products.splice(index + 1, 1)
        }
        console.log('dopo la rimozione ' + this.client.products)
        this.fireBaseClientService.addClient(this.client)
        //this.fireBaseClientService.addClient()
        // await this.fireBaseClientService.getClient(mail)
        this.router.navigate(['/carrello']).then(page => {
            window.location.reload();
        });

    }


}
