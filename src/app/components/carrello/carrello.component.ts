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


    constructor(private openComponentsService: OpenComponentsService, private router: Router, private fireBaseClientService: FireBaseRequestClientService, private ionicAlert: AlertIonicService, private globalVariableService: GlobalVariablesService, private myCookieService: MyCookieServiceService) {
    }


    async ngOnInit() {

        this.myCookieService.initCookie()

        let mail = document.getElementById("logged").textContent.split('.',).join('-').split('@',).join('_')    //let mail = document.getElementById("logged").textContent.split('.',).join('-').split('@',).join('_')
        mail = mail.split('.',).join('-').split('@',).join('_')

        if (mail.includes('ccedi') && this.globalVariableService.currentLoggedUserId != '') {
            mail = this.globalVariableService.currentLoggedUserId
            this.client = await this.fireBaseClientService.getClient(mail)
            await this.fireBaseClientService.delay(500)
        }
        console.log(this.client)
        this.products = this.client.products
        this.products.shift()
        this.products = this.products.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.place === value.place && t.name === value.name
                ))
        )

        console.log(this.products)
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
        this.products = this.client.products
        //this.fireBaseClientService.addClient()
        // await this.fireBaseClientService.getClient(mail)
    }


}
