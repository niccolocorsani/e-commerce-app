import {Component, ViewChild} from '@angular/core';
import {OpenComponentsService} from "./services/open-components/open-components.service";
import {Router} from "@angular/router";
import {MailServiceService} from "./services/mail-notification-service/mail-service.service";
import {PushNotificationServiceService} from "./services/mail-notification-service/push-notification-service.service";
import {IonContent} from "@ionic/angular";
import {GlobalVariablesService} from "./services/utility-services/global-variables.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {



  constructor(private openComponentsService: OpenComponentsService,private router: Router,private mailService: MailServiceService, private pushNotificationService : PushNotificationServiceService, private globalVariableService : GlobalVariablesService) {
  }

  returnHome() {
    this.spinner_delay()
    this.router.navigate(['/client'])
  }


  navigateToLogin() {
    this.spinner_delay()
    this.router.navigate(['/login'])
  }


  navigateToCarrello() {
    this.spinner_delay()
    this.pushNotificationService.createPushNotification('oooooo')
    this.router.navigate(['/carrello'])
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  async spinner_delay() {
    this.openComponentsService.spinner = true
      await this.delay(800)
    this.openComponentsService.spinner = false
  }


}
