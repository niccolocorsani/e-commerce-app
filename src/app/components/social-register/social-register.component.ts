import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {AlertIonicService} from "../../services/alert-popup-ionic/alert-ionic.service";


@Component({
    selector: 'app-social-register',
    templateUrl: './social-register.component.html',
})
export class SocialRegisterComponent implements OnInit {


    user = new SocialUser();


    constructor(private authService: SocialAuthService, private alertService: AlertIonicService) {
    }

    ngOnInit() {
        this.user.email = ''
        this.authService.authState.subscribe((user) => {
            this.user = user;
        });
    }



    async logInWithFB() {
        await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
        this.alertService.presentAlert('Ci sei quasi, inserisci nome, cognome, indirizzo e cap per completare', '', '')
    }

    async logInWithGoogle() {
        await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        this.alertService.presentAlert('Ci sei quasi, inserisci nome, cognome, indirizzo e cap per completare', '', '')

    }
}
