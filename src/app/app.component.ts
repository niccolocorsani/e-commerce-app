import {Component, OnInit, ViewChild} from '@angular/core';
import {OpenComponentsService} from "./services/open-components/open-components.service";
import {NavigationEnd, NavigationExtras, Router} from "@angular/router";
import {MailServiceService} from "./services/mail-notification-service/mail-service.service";
import {PushNotificationServiceService} from "./services/mail-notification-service/push-notification-service.service";
import {IonContent} from "@ionic/angular";
import {GlobalVariablesService} from "./services/utility-services/global-variables.service";
import {FirebaseClientResponse} from "./services/response/firebase-client-response";
import {InitializeCurrentClientService} from "./services/utility-services/initialize-current-client.service";


declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit{


  private client = new FirebaseClientResponse();
  mouseOverCarrello = false;

  constructor(private openComponentsService: OpenComponentsService,private router: Router,private mailService: MailServiceService, private pushNotificationService : PushNotificationServiceService, private globalVariableService : GlobalVariablesService, private initializeCurrentClient: InitializeCurrentClientService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-NHJ6YKVEFT', { page_path: event.urlAfterRedirects });
        alert('url: '+ event.urlAfterRedirects )
      }
    })

  }

  async ngOnInit() {


    await this.initializeCurrentClient.initialize_client()
    this.client = this.globalVariableService.client

  }


  returnHome() {
    this.spinner_delay()
    this.router.navigate(['/client']).then(page => { window.location.reload(); }); //// To trigger the refresh of the page even if in the same page  https://stackoverflow.com/questions/39613093/angular2-router-navigate-to-the-current-page-with-different-parameters
  }


  navigateToLogin() {
    this.spinner_delay()
    this.router.navigate(['/login']).then(page => { window.location.reload(); });
  }


  navigateToCarrello() {
    this.spinner_delay()
    this.router.navigate(['/carrello']).then(page => { window.location.reload(); });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  async spinner_delay() {
    this.openComponentsService.spinner = true
      await this.delay(800)
    this.openComponentsService.spinner = false
  }


  navigateToConfirm() {

    this.router.navigate(['/confirm-registration']).then(page => {
      window.location.reload();
    });
  }

  myOverFunction(){
    this.mouseOverCarrello = true
  }


  myOutFunction() {
    this.mouseOverCarrello = false
  }
}
