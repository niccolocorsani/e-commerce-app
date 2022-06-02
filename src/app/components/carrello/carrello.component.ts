import {Component, OnInit} from '@angular/core';
import {OpenComponentsService} from "../../services/open-components/open-components.service";
import {Router} from "@angular/router";
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../services/response/firebase-client-response";
import {FirebaseProductResponse} from "../../services/response/firebase-product-response";
import {FireBaseRequestProductService} from "../../services/firebase/fire-base-request-product.service";

@Component({
    selector: 'app-carrello',
    templateUrl: './carrello.component.html'
    //,
//  styleUrls: ['./carrello.component.scss'],
})
export class CarrelloComponent implements OnInit {


    products = []
    client


    constructor(private openComponentsService: OpenComponentsService, private router: Router, private fireBaseClientService: FireBaseRequestClientService) {
    }


    async ngOnInit() {

        let mail = document.getElementById("logged").textContent.split('.',).join('-').split('@',).join('_')    //let mail = document.getElementById("logged").textContent.split('.',).join('-').split('@',).join('_')
        mail = mail.split('.',).join('-').split('@',).join('_')
        this.client = await this.fireBaseClientService.getClient(mail)
        console.log(this.client)
        this.products = this.client.products
        this.products.shift()

    }

    navigateToProducts() {
        this.router.navigate(['/client'])
    }

    navigateToCheckOut() {
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
