import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {FireBaseRequestClientService} from "../firebase/fire-base-request-client.service";
import {GlobalVariablesService} from "../utility-services/global-variables.service";
import {OpenComponentsService} from "../open-components/open-components.service";

@Injectable({
    providedIn: 'root'
})
export class MyCookieServiceService {

    private variable_to_wait: any;

    constructor(public cookieService: CookieService, private fireBaseClientService: FireBaseRequestClientService, private globalVariableService: GlobalVariablesService, private openComponentService: OpenComponentsService) {
    }


    async initCookie() {
        let cookie = this.cookieService.get('id')
        console.log('cookie: ' + cookie)

        if (cookie != '') {

            try {    //// questo try catch risolve il problema del  fatto che questa funzione fallisce spesso, ma riporvandola tre o 4 volte funziona, guarda blocco catch
                this.globalVariableService.hideCookieCard = true
                let client = await this.fireBaseClientService.getClient(cookie)
                console.log(client.products)
                this.variable_to_wait = client
                await this.spinner_delay()

                ////Wait
                console.log(client)
                if (client == null)
                    await this.delay(300)
                await this.delay(100)
                this.globalVariableService.currentLoggedUserId = cookie
                ////Wait
                let prods = client.products.filter((value, index, self) => index === self.findIndex((t) => (t.place === value.place && t.name === value.name)))
                console.log(prods)

                if (prods.length != 1)
                    document.getElementById('badge').textContent = String(prods.length - 1)
            } catch (e) {
                await this.delay(1000)
                console.log(e)
                this.initCookie()
            }
            this.variable_to_wait = 'oo'
        } else {
            console.log('cookie non presente')
        }
    }

    async initCookieCredential() {
        let id = this.cookieService.get('stextile_mail')
        let password = this.cookieService.get('stextile_password')

        if (id != '') {
            let client = await this.fireBaseClientService.getClient(id)
            while (client.email.includes('okie')) {
                console.log(client)
                client = await this.fireBaseClientService.getClient(id) //// la funzione va chiamata 2 volte perchè se no ritorna il cliente associato al cookie 'id' probabilmente perchè poco prima firebase aveva ritornato quel valore
                await this.delay(100)
            }


            await this.fireBaseClientService.addClient(client)

            this.globalVariableService.currentLoggedUserId = client.email
            document.getElementById("logged").textContent = client.email.split('-',).join('.').split('_',).join('@');



            client.products = client.products.filter((value, index, self) =>
                index === self.findIndex((t) => (t.place === value.place && t.name === value.name))
            )
            await this.fireBaseClientService.addClient(client)

            document.getElementById('badge').textContent = String(client.products.length - 1)



        }


    }


    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async spinner_delay() {
        this.openComponentService.spinner = true
        while (this.variable_to_wait === undefined) {
            await this.delay(400)
            console.log(this.variable_to_wait)
        }
        this.openComponentService.spinner = false
    }
}
