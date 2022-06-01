import {Component, OnInit} from '@angular/core';
import {OpenComponentsService} from "../../services/open-components/open-components.service";
import Stepper from "bs-stepper";

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {

    constructor(private openComponentsService: OpenComponentsService) {
    }


    ngOnInit(): void {
    }

}
