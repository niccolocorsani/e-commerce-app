import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../services/response/firebase-client-response";
import {GlobalVariablesService} from "../../services/utility-services/global-variables.service";
import {MyCookieServiceService} from "../../services/my-cookies-service/my-cookie-service.service";

@Component({
    selector: 'app-cookies',
    templateUrl: './cookies.component.html'
})
export class CookiesComponent implements OnInit {

    hideThis = true;

    constructor(private cookieService: CookieService, private fireBaseClientService: FireBaseRequestClientService, private globalVariableService: GlobalVariablesService, private myCookieService: MyCookieServiceService) {
    }

    async ngOnInit() {
        await this.myCookieService.initCookie()
    }

    async setCookie() {
        const id = (Math.random() + 1).toString(36).substring(7) + 'cookie';
        this.cookieService.set('id', id, 0.25);
        // 1 day -> 24 hrs
        // ? day -> 6 hrs
        //(1*6)/24 -> 0.25 i.e. 6hrs
        let client = new FirebaseClientResponse()
        client.email = id
        let products = []
        products.push({description: "", id: "", img_name_ref: "", name: "", type: "", price: 3})
        client.products = products
        this.fireBaseClientService.addClient(client)
        this.globalVariableService.hideCookieCard = true
        await this.myCookieService.initCookie()

    }
}
