import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/compat/database";
import {FirebaseClientResponse} from "../response/firebase-client-response";
import {OpenComponentsService} from "../open-components/open-components.service";
import {variable} from "@angular/compiler/src/output/output_ast";

@Injectable({
    providedIn: 'root'
})
export class FireBaseRequestClientService {


    variable_to_wait: any


    clientRef: AngularFireObject<any>;
    clientsRef: AngularFireList<any>;
    clients = []
    last_client = ''

    myObserver = {
        next: (value: any) => this.variable_to_wait = value,
        error: (err: any) => alert('Observer got an error: ' + err + '..'),
    };

    constructor(private db: AngularFireDatabase, private openComponentService: OpenComponentsService) {
    }

////CRUD
    public async getClients() {
        this.db.list('/clients').valueChanges().subscribe(this.myObserver);
        await this.spinner_delay()
        return this.variable_to_wait

    }


    public async getClient(client_key: string) {
        this.db.object('clients/' + client_key).valueChanges().subscribe(this.myObserver);
        await this.spinner_delay()
        return this.variable_to_wait
    }


    public async addClient(client: FirebaseClientResponse) {
        console.log(client.email)
        this.db.object('clients/' + client.email).update(client)
    }


    public deleteClient(client_key: string) {
        this.db.object('clients/' + client_key).remove();
        this.spinner_delay()
    }

////CRUD


    //other methods
    public async get_last_client_name() {
        this.db.list('/clients').snapshotChanges().subscribe(val => (this.variable_to_wait = val[val.length - 1].key))
        await this.spinner_delay()
    }




//other methods





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
