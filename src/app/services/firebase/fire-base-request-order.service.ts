import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/compat/database";
import {OrderResponse} from "../response/order-response";
import {OpenComponentsService} from "../open-components/open-components.service";

@Injectable({
    providedIn: 'root'
})
export class FireBaseRequestOrderService {

    orderRef: AngularFireObject<any>;
    ordersRef: AngularFireList<any>;
    orders = []
    last_order = ''
    variable_to_wait: any;


    constructor(private db: AngularFireDatabase, private openComponentService: OpenComponentsService) {
    }

////CRUD
    public async getOrders() {
        this.spinner_delay()
      this.variable_to_wait = await this.db.list('/orders').valueChanges().subscribe(value => {
        (console.log(value))
        this.orders = value
      });
    }


    public async getOrder(order_key: string) {

        this.spinner_delay()
      this.variable_to_wait = await this.db.object('orders/' + order_key).valueChanges().subscribe(value => (console.log(value)));
    }


    public async addOrder(order: OrderResponse, order_key: string) {
        this.spinner_delay()
      this.variable_to_wait = await this.db.object('orders/' + order_key).update(order)
    }


    public deleteOrder(order_key: string) {
        this.db.object('orders/' + order_key).remove();
    }

////CRUD


    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async spinner_delay() {
        this.openComponentService.spinner = true
        while (this.variable_to_wait === undefined) {
            console.log(this.variable_to_wait)
            await this.delay(1000)
        }
        this.openComponentService.spinner = false
    }
}
