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
        document.getElementById("card-image").style.display = "none";

    }

    public appPages = [
        {title: 'Account', url: '/folder/Inbox', icon: 'cafe'},
        {title: 'Show Products', url: '/folder/Outbox', icon: 'man'},
        {title: 'Calendar', url: '/folder/Trash', icon: 'calendar'},
    ];


    openMenu() {


        if (this.openComponentsService.openDialogMenu === false) {
            this.openComponentsService.openDialogMenu = true;
        } else {
            this.openComponentsService.openDialogVarAccount = false;
            this.openComponentsService.openDialogVarShowUsers = false;
            this.openComponentsService.openDialogCalendar = false;
            this.openComponentsService.openDialogVarNewAccount = false;


        }
    }

    openDialog(title: any) {

        if (title === 'Account') {
            if (window.innerHeight < 700) this.openComponentsService.openDialogMenu = false;
            this.openComponentsService.openDialogVarAccount = true;
            this.openComponentsService.openDialogVarShowUsers = false;
            this.openComponentsService.openDialogCalendar = false;
            this.openComponentsService.openCarrello = false;
            this.openComponentsService.openDialogVarNewAccount = false;


            return;
        }
        if (title === 'Show Products') {
            if (window.innerHeight < 700) this.openComponentsService.openDialogMenu = false;
            this.openComponentsService.openDialogVarShowUsers = true;
            this.openComponentsService.openDialogVarAccount = false;
            this.openComponentsService.openDialogCalendar = false;
            this.openComponentsService.openCarrello = false;
            this.openComponentsService.openDialogVarNewAccount = false;


            return;
        }
        if (title === 'Calendar') {

            if (window.innerHeight < 700) this.openComponentsService.openDialogMenu = false;
            this.openComponentsService.openDialogCalendar = true;
            this.openComponentsService.openDialogVarShowUsers = false;
            this.openComponentsService.openDialogVarAccount = false;
            this.openComponentsService.openCarrello = false;
            this.openComponentsService.openDialogVarNewAccount = false;


        }

        if (title === 'Carrello') {

            if (window.innerHeight < 700) this.openComponentsService.openDialogMenu = false;
            this.openComponentsService.openDialogCalendar = false;
            this.openComponentsService.openDialogVarShowUsers = false;
            this.openComponentsService.openDialogVarAccount = false;
            this.openComponentsService.openCarrello = true;
            this.openComponentsService.openDialogVarNewAccount = false;
        }
    }


}
