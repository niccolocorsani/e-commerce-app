import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';


declare var paypal

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html'})
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

    ngOnInit() {
        paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: this.totalOrders.description,
                                amount: {
                                    currency_code: 'EUR',
                                    value: this.totalOrders.price
                                }
                            }
                        ]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    this.paidFor = true;
                    console.log(order);
                },
                onError: err => {
                    console.log(err);
                }
            })
            .render(this.paypalElement.nativeElement);
    }


}
