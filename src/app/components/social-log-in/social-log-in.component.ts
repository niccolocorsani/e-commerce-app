import {Component, OnInit} from '@angular/core';
import {SocialAuthService, SocialUser} from "angularx-social-login";
import {FacebookLoginProvider, GoogleLoginProvider} from "angularx-social-login";
import {RequestClientServiceService} from "../../services/request/request-client-service.service";
import {RequestConsultantServiceService} from "../../services/request/request-consultant-service.service";


@Component({
    selector: 'app-social-log-in',
    templateUrl: './social-log-in.component.html',
})
export class SocialLogInComponent implements OnInit {

    user = new SocialUser();

    constructor(private authService: SocialAuthService, private clientService: RequestClientServiceService, private consultantService: RequestConsultantServiceService) {
    }

    ngOnInit(): void {
        this.authService.authState.subscribe((user) => {
            this.user = user;
        });
    }

    async logInWithFB() {
        await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
        let userName = this.user.name.split(" ")[0] + "_" + this.user.name.split(" ")[1];
        this.checkIfUserPresentOnDB(userName)
    }

    async logInWithGoogle() {
        await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
        let userName = this.user.name.split(" ")[0] + "_" + this.user.name.split(" ")[1];
        this.checkIfUserPresentOnDB(userName)
    }


    checkIfUserPresentOnDB(userName: string) {
        if (document.getElementById("header").textContent === "Consultant portal") {
            for (let element of this.consultantService.getSynchronousConsultants()) {
                if (element.userName === userName) {
                    alert("User " + userName + " found..");
                    document.getElementById("header").textContent = document.getElementById("header").textContent
                        + " logged user: " + userName;
                    alert("ooooo")
                    document.getElementById("user-image").setAttribute("src",this.user.photoUrl);
                    document.getElementById("card-image").style.display="";
                    return;
                }
            }
            alert("Consultant not found..");
        } else {
            for (let element of this.clientService.getSynchronousClients()) {
                if (element.userName === userName) {
                    alert("User " + userName + " found..");
                    document.getElementById("header").textContent = document.getElementById("header").textContent
                        + " logged user: " + userName;
                    document.getElementById("user-image").setAttribute("src",this.user.photoUrl);
                    document.getElementById("card-image").style.display="";

                    return;
                }
            }
            alert("Client not found..");
        }
    }
}
