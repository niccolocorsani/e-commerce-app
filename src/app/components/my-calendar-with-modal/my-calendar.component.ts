import {Component, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from "ionic2-calendar";
import {AlertController, ModalController} from "@ionic/angular";
import {CalModalPage} from "./cal-modal/cal-modal.page";
import {formatDate} from "@angular/common";
import {RequestConsultantServiceService} from "../../services/request/request-consultant-service.service";
import {RequestClientServiceService} from "../../services/request/request-client-service.service";

@Component({
  selector: 'app-my-calendar',
  templateUrl: './my-calendar.component.html',
})
export class MyCalendarComponent implements OnInit {

  eventSource = [];
  viewTitle: string;
  selectedDate: Date;
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };

  constructor(
    private consultantService: RequestConsultantServiceService,
    private clientService: RequestClientServiceService,
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController,
  ) {
  }

  ngOnInit() {
    // https://levelup.gitconnected.com/5-ways-to-share-data-between-angular-components-d656a7eb7f96
    this.consultantService.currentMessage.subscribe(events => (this.eventSource = events)); //<= To retrive user appointments when my-calendar component is opened
    this.clientService.currentMessage.subscribe(events => (this.eventSource = events)); //<= To retrive user appointments when my-calendar component is opened
  }

  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });

    if (document.getElementById("header").textContent === "Consultant portal" || document.getElementById("header").textContent === "Client portal") {
      alert("You should log-in before choosing an appointment")
      return;
    }
    if (document.getElementById("home-menu").textContent === "Home") {
      alert("You should chose a consultant before choosing an appointment")
      return;
    }


    await modal.present();
    modal.onDidDismiss().then((result) => {

      if (result.data && result.data.event) {
        let event = result.data.event;
        let start = event.startTime;
        let end = event.endTime;
        event.startTime = new Date(
          Date.UTC(
            start.getUTCFullYear(),
            start.getUTCMonth(),
            start.getUTCDate(),
            start.getUTCHours(),
            start.getUTCMinutes()
          )
        );
        event.endTime = new Date(
          Date.UTC(
            end.getUTCFullYear(),
            end.getUTCMonth(),
            end.getUTCDate(),
            end.getUTCHours(),
            end.getUTCMinutes()
          )
        );
        alert('Aggiunto evento con orario: ' + event.startTime + ' ' + event.endTime + '..')
        this.eventSource.push(event);
        this.myCal.loadEvents();
      }
    });
  }


  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK'],
    });
    alert.present();
  }

  ////Questa funzione ritorna gli appuntamenti dell'utente attualmente loggato
  getMyAppointments() {

    let userName = document.getElementById("header").textContent.split(" ")[4]

    if (document.getElementById("header").textContent.includes("Client")) {

      if (userName != null) {
        let client = this.clientService.getSynchronousClientByUserName(userName);
        this.clientService.getClientAppointments(client.id)
      } else alert("You should log-in to retrive your appointments")
    } else {
      if (userName != null) {
        let consultant = this.consultantService.getSynchronousConsultantByUserName(userName);
        this.consultantService.getConsultantAppointments(consultant.id)
      } else alert("You should log-in to retrive your appointments")
    }
  }
}
