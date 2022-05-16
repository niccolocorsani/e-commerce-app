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
        {title: 'Account', url: '/folder/Inbox', icon: 'cafe'},
        {title: 'Calendar', url: '/folder/Trash', icon: 'calendar'},
    ];


    openMenu() {
        if (this.openComponentsService.openDialogMenu === false) {
            this.openComponentsService.openDialogMenu = true;
        } else {
            this.openComponentsService.openDialogVarAccount = false;
            this.openComponentsService.openDialogCalendar = false;
            this.openComponentsService.openDialogMaps = false;


        }
    }

    openDialog(title: any) {
        if (title === 'Account') {
            if (window.innerHeight < 700) this.openComponentsService.openDialogMenu = false;
            this.openComponentsService.openDialogVarAccount = true;
            this.openComponentsService.openDialogMaps = true;
            this.openComponentsService.openDialogCalendar = false;

            return;
        }


        if (title === 'Calendar') {
            if (window.innerHeight < 700) this.openComponentsService.openDialogMenu = false;
            this.openComponentsService.openDialogCalendar = true;
            this.openComponentsService.openDialogVarAccount = false;
            this.openComponentsService.openDialogMaps = false;

        }
    }



}
