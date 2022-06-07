import {Component, OnInit} from '@angular/core';
import {OpenComponentsService} from "../../services/open-components/open-components.service";

@Component({
    selector: 'app-business-consultant',
    templateUrl: './business-consultant.component.html',
})
export class BusinessConsultantComponent implements OnInit {


    openProducts = true
    openOrders = false;


    ngOnInit(): void {
        document.getElementById("card-image").style.display = "none";
    }

    constructor(private openComponentsService: OpenComponentsService) {
    }


    openProdotti() {
        this.openProducts = true
        this.openOrders = false

    }

    openOrdini() {
        this.openProducts = false
        this.openOrders = true
    }
}
