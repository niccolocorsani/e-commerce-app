export class ConsultantResponse {

    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    appointments: any;
    description: string;
    email: string;
    lat: any;
    lng: any;
    street: string;
    city: string;
    cap: string;
    pushId : string;
    phoneNumber: any;


    constructor(data?: any) {
        this.id = data ? data.id : null;
        this.firstName = data ? data.firstName : null;
        this.lastName = data ? data.lastName : null;
        this.userName = data ? data.userName : null;
        this.appointments = data ? data.appointments : null;
        this.description = data ? data.description : null;
        this.email = data ? data.email : null;
        this.lat = data ? data.lat : null;
        this.lng = data ? data.lng : null;
        this.street = data ? data.street : null;
        this.city = data ? data.city : null;
        this.cap = data ? data.cap : null;
        this.pushId = data ? data.pushId : null;
        this.phoneNumber = data ? data.phoneNumber : null;
    }
}
