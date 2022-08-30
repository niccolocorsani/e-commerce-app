import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {OpenComponentsService} from "./services/open-components/open-components.service";
import {NavigationEnd, NavigationExtras, Router} from "@angular/router";
import {MailServiceService} from "./services/mail-notification-service/mail-service.service";
import {PushNotificationServiceService} from "./services/mail-notification-service/push-notification-service.service";
import {IonContent} from "@ionic/angular";
import {GlobalVariablesService} from "./services/utility-services/global-variables.service";
import {FirebaseClientResponse} from "./services/response/firebase-client-response";
import {InitializeCurrentClientService} from "./services/utility-services/initialize-current-client.service";
import {Title} from "@angular/platform-browser";


declare let gtag: Function;

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {


    private client = new FirebaseClientResponse();
    mouseOverCarrello = false;
    smallDevice = false;
    private scrWidth: number;


    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
        this.scrWidth = window.innerWidth;
        if (this.scrWidth < 550) {
            this.smallDevice = false
        } else this.smallDevice = true

    }

    constructor(private openComponentsService: OpenComponentsService, private router: Router, private mailService: MailServiceService, private pushNotificationService: PushNotificationServiceService, private globalVariableService: GlobalVariablesService, private initializeCurrentClient: InitializeCurrentClientService, private titleService: Title) {
        this.getScreenSize();
        this.globalVariableService.smallDevice = this.smallDevice


        document.addEventListener('click', e => {
            let element = <HTMLElement>e.target
            for (let i = 0; i < 5; i++) {
                if (element.id != null) {
                    console.log(String(element.id))
                    gtag('event', String(element.id), {event_label: String(element.id)});
                    break
                }
                if (element.textContent != null) {
                    gtag('event', String(element.textContent), {event_label: String(element.textContent)});
                    break
                }
                if (element.hasChildNodes() == true)
                    element = <HTMLElement>element.firstChild
                else break
            }
        });


        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.titleService.setTitle(event.urlAfterRedirects.replace('/', ''))
                let urlVisitato = event.urlAfterRedirects
                gtag('event', urlVisitato, {event_label: event.urlAfterRedirects});
                // alert('url: '+ event.urlAfterRedirects )
            }
        })

    }

    async ngOnInit() {
        console.log('appComponent')
        await this.initializeCurrentClient.initialize_client()
        this.client = this.globalVariableService.client
    }


    returnHome() {
        this.spinner_delay()
        this.router.navigate(['/client']).then(page => {
            window.location.reload();
        }); //// To trigger the refresh of the page even if in the same page  https://stackoverflow.com/questions/39613093/angular2-router-navigate-to-the-current-page-with-different-parameters
    }


    navigateToLogin() {
        this.spinner_delay()
        this.router.navigate(['/login']).then(page => {
            window.location.reload();
        });
    }


    navigateToCarrello() {
        this.spinner_delay()
        this.router.navigate(['/carrello']).then(page => {
            window.location.reload();
        });
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

    myOverFunction() {
        this.mouseOverCarrello = true
    }


    myOutFunction() {
        this.mouseOverCarrello = false
    }
}
