import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-social-sharing',
    templateUrl: './social-sharing.component.html',
})
export class SocialSharingComponent  {

// https://stackblitz.com/edit/social-sharing?file=src%2Fapp%2Fshare-button%2Fshare-button.component.html

    type: string;
    shareUrl: string;
    navUrl: string;


    constructor() {
    }


    private createNavigationUrl(value: string) {
        let searchParams = new URLSearchParams();
        switch (value) {
            case 'facebook':
                searchParams.set('u', this.shareUrl);
                this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
                break;
            case 'twitter':
                searchParams.set('url', this.shareUrl);
                this.navUrl = 'https://twitter.com/share?' + searchParams;
                break;
        }
    }

    public share(event: any) {
        let value = event.currentTarget.getAttribute('value');
        this.shareUrl = "https://www.google.it/"
        this.createNavigationUrl(value);
        return window.open(this.navUrl, "_blank");
    }
}
