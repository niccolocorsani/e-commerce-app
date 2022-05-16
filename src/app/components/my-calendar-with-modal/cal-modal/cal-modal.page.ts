import {Component, AfterViewInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {RequestClientServiceService} from "../../../services/request/request-client-service.service";
import {RequestConsultantServiceService} from "../../../services/request/request-consultant-service.service";

@Component({
    selector: 'app-cal-modal',
    templateUrl: './cal-modal.page.html',
})
export class CalModalPage implements AfterViewInit {


    viewTitle: string;
    selectedDate: string;
    modalReady = false;
    date: any;

    calendar = {
        mode: 'month',
        currentDate: new Date()
    };

    event = {
        title: '',
        desc: '',
        startTime: null,
        endTime: null,
        allDay: false
    };


    constructor(private modalCtrl: ModalController, private clientService: RequestClientServiceService, private consultantService: RequestConsultantServiceService) {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.modalReady = true;
        }, 0);
    }


    async saveEvent() {

        var inputValueStart;
        inputValueStart = (<HTMLInputElement>document.getElementById('start')).value;
        let hourStart = inputValueStart.split(':')[0];
        let minuteStart = inputValueStart.split(':')[1];
        this.event.startTime.setHours(hourStart);
        this.event.startTime.setMinutes(minuteStart);
        var inputValueEnd;
        inputValueEnd = (<HTMLInputElement>document.getElementById('end')).value;
        let hourEnd = inputValueEnd.split(':')[0]
        let minuteEnd = inputValueEnd.split(':')[1]
        this.event.endTime.setHours(hourEnd);
        this.event.endTime.setMinutes(minuteEnd);
        this.modalCtrl.dismiss({event: this.event});
        let month = this.event.startTime.toString().split(" ")[1];

        if (month === "Jan") month = "01";
        if (month === "Feb") month = "02";
        if (month === "Mar") month = "03";
        if (month === "Apr") month = "04";
        if (month === "May") month = "05";
        if (month === "Jun") month = "06";
        if (month === "Jul") month = "07";
        if (month === "Aug") month = "08";
        if (month === "Sep") month = "09";
        if (month === "Oct") month = "10";
        if (month === "Nov") month = "11";
        if (month === "Dec") month = "12";


        let day = this.event.startTime.toString().split(" ")[2];
        let year = this.event.startTime.toString().split(" ")[3];


        let userName = document.getElementById("header").textContent.split(" ")[4];
        let client = this.clientService.getSynchronousClientByUserName(userName);
        let consultantId = document.getElementById("home-menu").textContent.split(" ")[0];
        let consultant = this.consultantService.getSynchronousConsultantById(consultantId);


        this.clientService.updateAppoitnment({
            "date": year + "-" + month + "-" + day,
            "startTime": hourStart + ":" + minuteStart + ":" + "00",
            "endTime": hourEnd + ":" + minuteEnd + ":" + "00",
            "client": client,
            "consultant": consultant
        });

        document.getElementById("push-notification").textContent = "Last scheduled appointment: " + year + " " + month + " " + day + " " + hourStart + " " + minuteStart
    }

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    close() {
        this.modalCtrl.dismiss();
    }

    onTimeSelected(ev) {
        this.event.startTime = new Date(ev.selectedTime);
        this.event.endTime = new Date(ev.selectedTime);
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


}
