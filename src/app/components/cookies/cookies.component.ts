import {Component, OnInit} from '@angular/core';
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../services/response/firebase-client-response";
import {GlobalVariablesService} from "../../services/utility-services/global-variables.service";
import {MyCookieService} from "../../services/my-cookies-service/my-cookie.service";

@Component({
    selector: 'app-cookies',
    templateUrl: './cookies.component.html'
})
export class CookiesComponent implements OnInit {

    hideThis = true;

    constructor( private fireBaseClientService: FireBaseRequestClientService, private globalVariableService: GlobalVariablesService, private myCookieService: MyCookieService) {
    }

    async ngOnInit() {
        await this.myCookieService.initCookie()
    }

    async setCookie() {
        const id = (Math.random() + 1).toString(36).substring(7) + 'cookie';
        //this.cookieService.set('id', id);
        document.cookie = 'my_cookie='+id+ '; expires=Fri, 31 Dec 2023 23:59:59 GMT; SameSite=None; Secure;'

        document.cookie = 'dsdddd=oinsdf; expires=Fri, 31 Dec 2023 23:59:59 GMT; SameSite=None; Secure;'



        //TODO..... dopo x tempo se il nome della key del cookie rimane il solito poi verra eliminato automaticamente.. infatti prima la key non era my_cookie, ma solo id... o forse era ngx-cookies-services che ha il bug


        // 1 day -> 24 hrs
        // ? day -> 6 hrs
        //(1*6)/24 -> 0.25 i.e. 6hrs
        let client = new FirebaseClientResponse()
        client.email = id
        let products = []
        products.push({description: "", id: "", img_name_ref: "", name: "", type: "", price: 0})
        client.products = products
        await this.fireBaseClientService.addClient(client)
        this.globalVariableService.currentLoggedUserId = client.email
        this.globalVariableService.hideCookieCard = true
        await this.myCookieService.initCookie()

    }
}
