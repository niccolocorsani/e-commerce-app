import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MyCookieServiceService} from "../../services/my-cookies-service/my-cookie-service.service";
import {GlobalVariablesService} from "../../services/utility-services/global-variables.service";
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../services/response/firebase-client-response";


declare var paypal

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html'
})
export class PaymentsComponent implements OnInit {

//// account venditore è corsani.niccolo.94@gmaIL.COM
//// https://www.youtube.com/watch?v=AtZGoueL4Vs


    @ViewChild('paypal', {static: true}) paypalElement: ElementRef;

    totalOrders = {
        price: 100,
        description: 'Ordini ',
        img: []
    };

    paidFor = false;
    private client = new FirebaseClientResponse();

    constructor(private myCookieService: MyCookieServiceService, private globalVariableService: GlobalVariablesService, private fireBaseClientService: FireBaseRequestClientService) {
    }

    async ngOnInit() {


        //// TODO ributtare questo pattern come inizializzazione di ogni componente
        await this.myCookieService.initCookie()
        await this.myCookieService.initCookieCredential()
        let id = this.globalVariableService.currentLoggedUserId
        this.client = await this.fireBaseClientService.getClient(id)
        await this.fireBaseClientService.delay(500)
        if (this.client == undefined) {
            this.client = await this.fireBaseClientService.getClient(id)
            await this.fireBaseClientService.delay(1000)
        }
        if (this.client == undefined) {
            this.client = await this.fireBaseClientService.getClient(id)
            await this.fireBaseClientService.delay(1000)
        }
        if (this.client == undefined) {
            this.client = await this.fireBaseClientService.getClient(id)
            await this.fireBaseClientService.delay(1000)
        }
        alert(this.client.email)
        //// TODO ributtare questo pattern come inizializzazione di ogni componente


        paypal
            .Buttons({
                createOrder: (data, actions) => {
                    alert('create order')
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: this.totalOrders.description,
                                amount: {
                                    currency_code: 'EUR',
                                    value: 0.02
                                }
                            }
                        ]
                    });
                },
                onApprove: async (data, actions) => {
                    alert('on approve')
                    const order = await actions.order.capture();
                    this.paidFor = true;
                    console.log(order);
                    this.client.products.splice(1)
                    console.log(this.client)
                    await this.fireBaseClientService.addClient(this.client)
                },
                onError: err => {
                    console.log(err);
                }
            })
            .render(this.paypalElement.nativeElement);
    }


}
