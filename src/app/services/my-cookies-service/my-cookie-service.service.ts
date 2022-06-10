import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {FireBaseRequestClientService} from "../firebase/fire-base-request-client.service";
import {GlobalVariablesService} from "../utility-services/global-variables.service";

@Injectable({
  providedIn: 'root'
})
export class MyCookieServiceService {

  constructor(private cookieService: CookieService,private fireBaseClientService: FireBaseRequestClientService, private globalVariableService: GlobalVariablesService) {
  }


  async initCookie() {
    let cookie = this.cookieService.get('id')
    console.log(cookie)
    if (cookie != '') {
      this.globalVariableService.hideCookieCard = true
      let client = await this.fireBaseClientService.getClient(cookie)
      await this.fireBaseClientService.delay(500)
      this.globalVariableService.currentLoggedUserId = cookie

      let prods = client.products.filter((value, index, self) => index === self.findIndex((t) => (t.place === value.place && t.name === value.name)))
      console.log(prods)
      if (prods.length != 1)
        document.getElementById('badge').textContent = String(prods.length - 1)

    } else {
    }
  }
}
