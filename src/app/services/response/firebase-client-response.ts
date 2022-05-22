export class FirebaseClientResponse {



    name: string;
    email: string;
    surname: string
    street: string;
    cap: string
    password: string


    constructor(data?: any) {
        this.name = data ? data.name : null;
        this.surname = data ? data.surname : null;
        this.cap = data ? data.cap : null;
        this.password = data ? data.password : null;
        this.street = data ? data.street : null;
        this.email = data ? data.email : null;

    }
}
