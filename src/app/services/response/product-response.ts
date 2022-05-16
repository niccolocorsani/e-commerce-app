export class ProductResponse {


    id: string;
    description: string;
    name: string;
    price: number
    img_name_ref: string


    constructor(data?: any) {
        this.id = data ? data.id : null;
        this.description = data ? data.description : null;
        this.name = data ? data.name : null;
        this.price = data ? data.price : null;
        this.img_name_ref = data ? data.img_name_ref : null;

    }
}
