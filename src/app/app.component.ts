import {Component} from '@angular/core';
import {FireBaseRequestProductsService} from "./services/request/fire-base-request-products.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {



  pageClient = false;
  pageConsultant = false;
  chosePage = true;
  userLogged: string;


  constructor(private fireBaseService: FireBaseRequestProductsService) {
  }

  async openCliente() {

    this.pageConsultant = false;
    this.chosePage = false;
    this.pageClient = true;

  }
  async openConsultant() {
    this.pageClient = false;
    this.chosePage = false;
    this.pageConsultant = true;

  }


  fireBase() {
    this.fireBaseService.getProducts()
  }
}
