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

    client

    clientRef: AngularFireObject<any>;
    clientsRef: AngularFireList<any>;
    clients = []
    last_client = ''


    constructor(private db: AngularFireDatabase, private openComponentService: OpenComponentsService) {
    }

////CRUD
    public async getClients() {
        this.spinner_delay()
        this.variable_to_wait = this.db.list('/clients').valueChanges().subscribe(value => (this.variable_to_wait = value));
    }


    public getClient(client_key: string) {
        this.spinner_delay()
        this.db.object('clients/' + client_key).valueChanges().subscribe(value => (this.variable_to_wait = value));
    }


    public async addClient(client: FirebaseClientResponse) {
        await this.get_last_client_name();
        try {
            this.db.object('clients/' + client.email).update(client)
        } catch (e) {
            console.log(e.message);//conversion to Error type
        }
    }


    public deleteClient(client_key: string) {
        this.db.object('clients/' + client_key).remove();
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
