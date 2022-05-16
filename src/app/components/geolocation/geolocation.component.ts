import {Component, OnInit} from '@angular/core';
import {RequestConsultantServiceService} from "../../services/request/request-consultant-service.service";
import {ConsultantResponse} from "../../services/response/consultant-response";
import {AsyncWaitAnimationService} from "../../services/async-wait-animation/async-wait-animation.service";


@Component({
    selector: 'app-geolocation',
    templateUrl: './geolocation.component.html',
    styleUrls: ['./geolocation.component.scss'],
})
export class GeolocationComponent implements OnInit {

    ///documentation for google maps at: https://angular-maps.com/
    /// is important to set the version of the dependency at "@types/googlemaps": "^3.36.4", because the leatest version doesn't work with @agm


    title = 'My first AGM project';
    lat = 44.77925;
    lng = 11.24626;  // Florence coordinates
    options: any;
    map: google.maps.Map;
    consultants: ConsultantResponse[];
    checkConsultantOnMap = false;
    address: any;
    hideGetPositionOptionForClient = true;
    openMap = false;


    constructor(private consultantService: RequestConsultantServiceService, private waitAnimationSerivce: AsyncWaitAnimationService) {
        this.options = {
            enableHighAccuracy: false,
            timeout: 5000,
        };
            this.consultants = this.consultantService.getSynchronousConsultants();

        setTimeout(() => {
            this.waitAnimationSerivce.replaceWithWaitingAnimation("map");
        }, 10); // necessary for google maps to load correctly
    }


    ngOnInit() {
        if (document.getElementById("header").textContent.includes("Client"))
            this.hideGetPositionOptionForClient = false;

        document.getElementById("consultantLatLng").style.display = "none";
        document.getElementById("consultant_city_street_cap").style.display = "none";

    }


    getLocation() {
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

    city: any;
    cap: any;
    street: any;

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
                        this.city = this.address[2].long_name;
                        this.street = this.address[1].long_name;
                        this.cap = this.address[7].long_name;
                        alert("Your position is: "+this.city+ " "+this.street+ " "+this.cap)

                    } else {
                        alert('No address available!');
                    }
                }
            });
        }
    }


    checkAllConsultant() {
        this.checkConsultantOnMap = true;
        this.openMap = true;
    }


}
