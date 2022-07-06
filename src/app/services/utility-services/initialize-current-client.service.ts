import {Injectable} from '@angular/core';
import {MyCookieService} from "../my-cookies-service/my-cookie.service";
import {GlobalVariablesService} from "./global-variables.service";
import {FireBaseRequestClientService} from "../firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../response/firebase-client-response";

@Injectable({
    providedIn: 'root'
})
export class InitializeCurrentClientService {

    private client = new FirebaseClientResponse();


    constructor(private myCookieService: MyCookieService, private globalVariableService: GlobalVariablesService, private fireBaseClientService: FireBaseRequestClientService) {
    }

    async initialize_client() {

        //// TODO ributtare questo pattern come inizializzazione di ogni componente
        await this.myCookieService.initCookie()
        await this.myCookieService.initCookieCredential()
        let id = this.globalVariableService.currentLoggedUserId
        this.client = await this.fireBaseClientService.getClient(id)
        await this.fireBaseClientService.delay(500)
        if (this.client == undefined) {
            this.client = await this.fireBaseClientService.getClient(id)
            await this.fireBaseClientService.delay(1000)
        }
        if (this.client == undefined) {
            this.client = await this.fireBaseClientService.getClient(id)
            await this.fireBaseClientService.delay(1000)
        }
        if (this.client == undefined) {
            this.client = await this.fireBaseClientService.getClient(id)
            await this.fireBaseClientService.delay(1000)
        }
        //// TODO ributtare questo pattern come inizializzazione di ogni componente
        this.globalVariableService.client = this.client
    }


}
