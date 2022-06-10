export class FirebaseProductResponse {


    id: string;
    description: string;
    name: string;
    price: number
    img_name_ref: string
    type: string
    peso: number
    //// questi dati qua sotto sono utili se il cliente non ha fatto il log-in
    street = ''
    cap = ''
    city = ''



    constructor(data?: any) {
        this.id = data ? data.id : null;
        this.description = data ? data.description : null;
        this.name = data ? data.name : null;
        this.price = data ? data.price : null;
        this.img_name_ref = data ? data.img_name_ref : null;
        this.type = data ? data.type : null;
        this.peso = data ? data.peso : null;
        this.street = data ? data.street : null;
        this.cap = data ? data.cap : null;
        this.city = data ? data.city : null;
    }
}
