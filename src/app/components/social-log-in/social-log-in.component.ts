import {Component, OnInit} from '@angular/core';
import {SocialAuthService, SocialUser} from "angularx-social-login";
import {FacebookLoginProvider, GoogleLoginProvider} from "angularx-social-login";
import {AlertIonicService} from "../../services/alert-popup-ionic/alert-ionic.service";
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";


@Component({
    selector: 'app-social-log-in',
    templateUrl: './social-log-in.component.html',
})
export class SocialLogInComponent implements OnInit {

    user = new SocialUser();

    constructor(private authService: SocialAuthService, private fireBaseclientService: FireBaseRequestClientService, private alertService: AlertIonicService) {
    }

    ngOnInit(): void {
        this.authService.authState.subscribe((user) => {
            this.user = user;
        });
    }

    async logInWithFB() {
        await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
        this.checkIfUserPresentOnDB(this.user.email)
    }

    async logInWithGoogle() {
        await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        await this.checkIfUserPresentOnDB(this.user.email)

    }


    async checkIfUserPresentOnDB(mail: string) {
        let fireBaseMail = await this.fireBaseclientService.getClient(mail.split('.',).join('-').split('@',).join('_'))
        if (fireBaseMail != undefined) {
            await this.alertService.presentAlert('Login eseguito con successo', '', '')
            document.getElementById("logged").textContent = mail;
            this.setLoginCookie(mail,'not_needed')
            return;
        } else
            await this.alertService.presentAlert('Utente non trovato', '', '')
    }


    setLoginCookie(mail: string, password: string) {

        document.cookie = 'cookie_user='+mail+'; expires= 31 Dec 2023 23:59:59 GMT; Secure;'
        document.cookie = 'pass_cookie='+password+'; expires= 31 Dec 2023 23:59:59 GMT; Secure;'

    }
}
