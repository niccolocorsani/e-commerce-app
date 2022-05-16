import {Component, OnInit} from '@angular/core';
import {OneSignal} from 'onesignal-ngx';
import {
    PushNotificationServiceService
} from "../../services/push-notification-service/push-notification-service.service";
import {RequestConsultantServiceService} from "../../services/request/request-consultant-service.service";
import {RequestClientServiceService} from "../../services/request/request-client-service.service";
import {ConsultantResponse} from "../../services/response/consultant-response";

@Component({
    selector: 'app-push-notification',
    templateUrl: './push-notification.component.html',
})
export class PushNotificationComponent implements OnInit {


    // https://www.youtube.com/watch?v=31ozmzVv-KI
    // needs to allow push-notifiaction of chrome on the personal computer

    title = 'OneSignal-Angular';
    userId;
    consultant;
    client;
    showView = false;
    priority = "1";

    constructor(private oneSignal: OneSignal, private pushNotificationService: PushNotificationServiceService, private consultantService: RequestConsultantServiceService, private clientService: RequestClientServiceService) {
        this.oneSignal.init({
            appId: "206e4ddb-a9f7-4d03-a059-ae34ed5cdf00",
        });
        this.oneSignal.setEmail("jobel2290@gmail.com")
    }

    ngOnInit() {
    }


    updateUserInformation() {

        this.showView = true;
        this.consultant = new ConsultantResponse();
        this.client = new ConsultantResponse();

        if (document.getElementById("header").textContent === "Consultant portal" || document.getElementById("header").textContent === "Client portal") {
            alert("You should log-in before");
        } else this.oneSignal.getUserId((userId) => {
            if (document.getElementById("header").textContent.includes("Consultant")) {
                this.consultant = this.consultantService.getSynchronousConsultantByUserName(document.getElementById("header").textContent.split(" ")[4]);
                this.consultant.pushId = userId;
                this.consultantService.putConsultant(this.consultant);

            }
            if (document.getElementById("header").textContent.includes("Client")) {
                this.client = this.clientService.getSynchronousClientByUserName(document.getElementById("header").textContent.split(" ")[4]);
                this.client.pushId = userId;
                this.clientService.putClient(this.client);
            }
            this.userId = userId;
        });

    }


    schedulePushNotification() {
        let info = document.getElementById("push-notification").textContent.split(" ");
        this.pushNotificationService.postNotificationWithPriority(this.client.pushId, info[3], info[4], info[5], info[6], info[7], this.priority);
    }


    radioGroupChange(event: any) {
        this.priority = event.detail.value;
    }
}



