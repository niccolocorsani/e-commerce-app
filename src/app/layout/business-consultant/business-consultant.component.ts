import {Component, OnInit} from '@angular/core';
import {OpenComponentsService} from "../../services/open-components/open-components.service";

@Component({
    selector: 'app-business-consultant',
    templateUrl: './business-consultant.component.html',
})
export class BusinessConsultantComponent  implements  OnInit{


    baseUrl = '/folder/Trash' ;

    ngOnInit(): void {
        document.getElementById("card-image").style.display="none";
    }

    constructor(private openComponentsService: OpenComponentsService) {
    }


    public appPages = [
        {title: 'Aggiungi prodotti', url: '/folder/Inbox', icon: 'cafe'},
        {title: 'Calendar', url: '/folder/Trash', icon: 'calendar'},
        {title: 'prodotti', url: '/first-component', icon: 'calendar'},

    ];


    openMenu() {
        if (this.openComponentsService.openDialogMenu === false) {
            this.openComponentsService.openDialogMenu = true;
        } else {
            this.openComponentsService.openAggiungiProdotti = false;


        }
    }

    openDialog(title: any) {
        if (title === 'Aggiungi prodotti') {
            if (window.innerHeight < 700) this.openComponentsService.openDialogMenu = false;
            this.openComponentsService.openAggiungiProdotti = true;

            return;
        }


        if (title === 'Calendar') {
            if (window.innerHeight < 700) this.openComponentsService.openDialogMenu = false;
            this.openComponentsService.openAggiungiProdotti = false;

        }
    }



}
