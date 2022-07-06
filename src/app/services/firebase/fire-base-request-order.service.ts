import { Injectable } from '@angular/core';
import {OrderResponse} from "../response/order-response";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/compat/database";
import {OpenComponentsService} from "../open-components/open-components.service";

@Injectable({
  providedIn: 'root'
})
export class FireBaseRequestOrderService {


  variable_to_wait: any


  orderRef: AngularFireObject<any>;
  ordersRef: AngularFireList<any>;
  orders = []
  last_order = ''

  myObserver = {
    next: (value: any) => this.variable_to_wait = value,
    error: (err: any) => console.log('Observer got an error: ' + err + '..'),
  };
  
  
  
  
  constructor(private db: AngularFireDatabase, private openComponentService: OpenComponentsService) { }


  public async getOrders() {
    this.db.list('/orders').valueChanges().subscribe(this.myObserver);
    await this.spinner_delay()
    return this.variable_to_wait

  }


  public async getOrder(order_key: string) {
    await this.delay(100) //// Questo cosino qua mi risolve alcuni problemi, controllare poi se mettendo questo cosino qui anche nelle altre chiamate rest api non cambia il comportamento dell'applicazione
    this.db.object('orders/' + order_key).valueChanges()
        .subscribe(this.myObserver);
    await this.spinner_delay()
    return this.variable_to_wait
  }


  public async addOrder(order:OrderResponse) {
    this.variable_to_wait = this.db.object('orders/' + order.id).update(order)
    await this.spinner_delay()

  }


  public async deleteOrder(order_key: string) {
    this.variable_to_wait = this.db.object('orders/' + order_key).remove();
    await this.spinner_delay()
  }


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  async spinner_delay() {
    this.openComponentService.spinner = true
    while (this.variable_to_wait === undefined) {
      await this.delay(400)
    }
    this.openComponentService.spinner = false
  }



}
