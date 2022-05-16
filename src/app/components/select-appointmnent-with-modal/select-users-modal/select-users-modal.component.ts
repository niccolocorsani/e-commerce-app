import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {ConsultantResponse} from "../../../services/response/consultant-response";
import {RequestConsultantServiceService} from "../../../services/request/request-consultant-service.service";
import {OpenComponentsService} from "../../../services/open-components/open-components.service";

@Component({
    selector: 'app-select-users-modal',
    templateUrl: './select-users-modal.component.html',
})
export class SelectUsersModalComponent {

    public listElements: Array<ConsultantResponse> = [];
    public showUser: boolean;
    consultant = new ConsultantResponse();


    constructor(private consultantService: RequestConsultantServiceService, public modalCtrl: ModalController, private openComponentsService: OpenComponentsService) {
        this.showUser = false;
    }


    async retriveUsers() {
        if (this.showUser === false)
            this.showUser = true;
        else this.showUser = false;
        this.listElements = this.consultantService.getSynchronousConsultants();
    }


    async loadAppointments(id: string) {
        this.openComponentsService.openDialogCalendar = true;
        this.close();
        this.consultant = this.consultantService.getSynchronousConsultantById(id);
        document.getElementById("home-menu").textContent = this.consultant.id + " " + this.consultant.firstName + " " + this.consultant.lastName;
        alert("Loading appointments of consultant: " + this.consultant.firstName + " " + this.consultant.lastName)
        this.consultantService.getConsultantAppointments(this.consultant.id)

        let svg = document.createElement("div")
        svg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"  id ="arrow" viewBox="0 0 300 250" width="100" height="100" style="transform: rotate(45deg)"\n' +
            '>\n' +
            '\n' +
            '    <defs>\n' +
            '        <marker orient="auto" refY="0" refX="0" id="tri" style="overflow:visible">\n' +
            '            <path d="M 1.76,0 -0.56,1.36 V -1.36 Z" fill="royalblue"/>\n' +
            '        </marker>\n' +
            '    </defs>\n' +
            '    <path d="M 47,213 47,213 47,213 47,213"\n' +
            '          fill="none" stroke="royalblue" stroke-width="14"\n' +
            '          stroke-linejoin="round" marker-end="none">\n' +
            '        <animate attributeType="XML" attributeName="d"\n' +
            '                 begin="0s" dur="10s" fill="remove"\n' +
            '                 keyTimes="0;0.18;0.18;0.27;0.27;0.45;0.55;0.73;0.73;0.82;0.82;1"\n' +
            '                 values="M 47,213 47,213 47,213 47,213;\n' +
            '                     M 47,213 47,213 47,213 120,100;\n' +
            '                     M 47,213 120,100 120,100 120,100;\n' +
            '                     M 47,213 120,100 120,100 166,171;\n' +
            '                     M 47,213 120,100 166,171 166,171;\n' +
            '                     M 47,213 120,100 166,171 247,44;\n' +
            '                     M 47,213 120,100 166,171 247,44;\n' +
            '                     M 47,213 120,100 166,171 166,171;\n' +
            '                     M 47,213 120,100 120,100 166,171;\n' +
            '                     M 47,213 120,100 120,100 120,100;\n' +
            '                     M 47,213 47,213 47,213 120,100;\n' +
            '                     M 47,213 47,213 47,213 47,213"/>\n' +
            '        <set attributeType="CSS" attributeName="marker-end"\n' +
            '             begin="0s" dur="10s" to="url(#tri)"/>\n' +
            '    </path>\n' +
            '</svg>'

        document.getElementById("arrow").replaceWith(svg);

    }


    async close() {
        await this.modalCtrl.dismiss();
    }

}
