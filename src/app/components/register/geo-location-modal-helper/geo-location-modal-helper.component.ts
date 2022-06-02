import {Component, OnInit} from '@angular/core';
import {FireBaseRequestClientService} from "../../../services/firebase/fire-base-request-client.service";
import {AsyncWaitAnimationService} from "../../../services/async-wait-animation/async-wait-animation.service";
import {ModalController} from "@ionic/angular";
import {AlertIonicService} from "../../../services/alert-popup-ionic/alert-ionic.service";

@Component({
    selector: 'app-geo-location-modal-helper',
    templateUrl: './geo-location-modal-helper.component.html',
    styleUrls: ['./geo-location-modal-helper.component.scss'],
})
export class GeoLocationModalHelperComponent implements OnInit {

    ///documentation for google maps at: https://angular-maps.com/
    /// is important to set the version of the dependency at "@types/googlemaps": "^3.36.4", because the leatest version doesn't work with @agm

    title = 'My first AGM project';
    lat = 44.77925;
    lng = 11.24626;  // Florence coordinates
    address: any;
    client
    city: any;
    cap: any;
    street: any;

    options

    constructor(private fireBaseRequestClient: FireBaseRequestClientService, private animationService: AsyncWaitAnimationService, public modalController: ModalController, private ionicAlert: AlertIonicService) {
        this.options = {
            enableHighAccuracy: false,
            timeout: 5000,
        };

        setTimeout(() => {
            this.animationService.replaceWithWaitingAnimation("map");
        }, 10); // necessary for google maps to load correctly

        this.getLocation()

    }


    async ngOnInit() {



    }


    async getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
            }, null, this.options);
            this.getAddressFromCoordinates();
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }


    getAddressFromCoordinates() {

        if (navigator.geolocation) {
            let geocoder = new google.maps.Geocoder();
            let latlng = new google.maps.LatLng(this.lat, this.lng);
            let request = {'location': latlng};
            geocoder.geocode(request, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK) {
                    let result = results[0];
                    let rsltAdrComponent = result.address_components;
                    if (result != null) {

                        this.address = rsltAdrComponent;
                        console.log(this.address)
                        this.city = this.address[2].long_name;
                        this.street = this.address[1].long_name;
                        this.cap = this.address[7].long_name;
                        this.ionicAlert.presentAlert("La tua posizione: " + this.city + " " + this.street + " " + this.cap,'','')
                        this.modalController.dismiss({'city':this.city,'cap':this.cap,'street':this.street});

                    } else {
                        alert('No address available!');
                    }
                }
            });
        }
    }


    confermaPosizione() {

        this.getLocation()


    }
}
