import {FirebaseProductResponse} from "./firebase-product-response";
import {FirebaseClientResponse} from "./firebase-client-response";

export class OrderResponse {


    id: string;
    product: FirebaseProductResponse;
    client: FirebaseClientResponse



    constructor(data?: any) {
        this.id = data ? data.id : null;
        this.product = data ? data.product : null;
        this.client = data ? data.client : null;
    }

}
