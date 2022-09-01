import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MyCookieService} from "../../services/my-cookies-service/my-cookie.service";
import {GlobalVariablesService} from "../../services/utility-services/global-variables.service";
import {FireBaseRequestClientService} from "../../services/firebase/fire-base-request-client.service";
import {FirebaseClientResponse} from "../../services/response/firebase-client-response";
import {FireBaseRequestOrderService} from "../../services/firebase/fire-base-request-order.service";
import {OrderResponse} from "../../services/response/order-response";
import {MailServiceService} from "../../services/mail-notification-service/mail-service.service";
import {FireBaseRequestProductService} from "../../services/firebase/fire-base-request-product.service";
import {InitializeCurrentClientService} from "../../services/utility-services/initialize-current-client.service";
import {Router} from "@angular/router";


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
    private order = new OrderResponse()

    constructor(private myCookieService: MyCookieService, private globalVariableService: GlobalVariablesService, private fireBaseClientService: FireBaseRequestClientService, private fireBaseOrderService: FireBaseRequestOrderService, private firebaseProductRequestService: FireBaseRequestProductService, private mailService: MailServiceService, private initializeClientService: InitializeCurrentClientService, private router: Router) {
    }

    async ngOnInit() {


        await this.initializeClientService.initialize_client()
        this.client = this.globalVariableService.client

        paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: this.totalOrders.description,
                                amount: {
                                    currency_code: 'EUR',
                                    value: 0.01
                                }
                            }
                        ]
                    });
                },
                onApprove: async (data, actions) => {

                    const order = await actions.order.capture();
                    this.paidFor = true;

                    this.order.id = this.client.email
                    this.order.products = this.client.products
                    this.order.client = this.client
                    await this.fireBaseOrderService.addOrder(this.order)
                    await this.fireBaseOrderService.delay(400)
                    this.mailService.sendMail('Le confermiamo che è avvenuto il pagamento con importo: ', this.client.email.split('-',).join('.').split('_',).join('@'))

                    ////TODO mettere caso di cookie che manda email a cookie

                    Array.prototype.forEach.call(this.client.products, product => {
                        this.firebaseProductRequestService.deleteProduct(product.name)
                    })

                    await this.fireBaseClientService.addClient(this.client)


                    this.router.navigate(['/confirm-payment'])

                },
                onError: err => {
                    // TODO da cambiare quando torna paypal
                    this.router.navigate(['/confirm-payment'])
                }
            })
            .render(this.paypalElement.nativeElement);

    }


}
