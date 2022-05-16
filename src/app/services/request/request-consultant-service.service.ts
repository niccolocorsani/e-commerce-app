import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {ConsultantResponse} from "../response/consultant-response";

@Injectable({
    providedIn: 'root'
})
export class RequestConsultantServiceService {


    private url = 'http://localhost:8080/spring-app';
    public editDataDetails: any = [];
    private events = new BehaviorSubject(this.editDataDetails);
    currentMessage = this.events.asObservable();

    constructor(public http: HttpClient) {
    }

    myObserver = {
        next: (value: any) => console.log(value),
        error: (err: any) => alert('Observer got an error: ' + err.error + " " + err.response)
    };

    ////writing method async, reading method sync

    public async getConsultantAppointments(id: any) {
        let consultant = this.getSynchronousConsultantById(id);
        let appointments = this.getSynchronousAllAppointments();
        let consultantAppointments = [];

        appointments.forEach(element => {
            if (element.consultant.id === id) {
                consultantAppointments.push(element);
            }
        })

        let events = [];

        consultantAppointments.forEach(element => {
            let appointment = element;
            let startTime;
            let endTime;

            let splitDate = appointment.date.split("-");
            let splitStartTime = appointment.startTime.split(":");
            let splitEndTime = appointment.endTime.split(":");


            startTime = new Date(
                splitDate[0],
                splitDate[1] - 1,
                splitDate[2],
                splitStartTime[0],
                splitStartTime[1],
                splitStartTime[2],
            );

            endTime = new Date(
                splitDate[0],
                splitDate[1] - 1,
                splitDate[2],
                splitEndTime[0],
                splitEndTime[1],
                splitEndTime[2],
            );

            events.push({
                title: 'Event - ' + 1,
                startTime: startTime,
                endTime: endTime,
                allDay: false,
            });
        });



        this.events.next(events)
    }

    public async putConsultant(consultant: ConsultantResponse) {
        let latlng = document.getElementById("consultantLatLng").textContent;
        let positionInformation = document.getElementById("consultant_city_street_cap").textContent;

        consultant.lat = Number(latlng.split(",")[0]);
        consultant.lng = Number(latlng.split(",")[1]);
        consultant.city = positionInformation.split(",")[0]
        consultant.street = positionInformation.split(",")[1]
        consultant.cap = positionInformation.split(",")[2]


        this.http.put<ConsultantResponse>(this.url + '/consultant/putConsultant', consultant).pipe(
            catchError(this.handleError)
        ).subscribe(this.myObserver);
    }

    public async getAsyncConsultants(){
        this.http.get<ConsultantResponse[]>(this.url + '/consultant/putConsultant').pipe(
            catchError(this.handleError)
        ).subscribe(this.myObserver);

    }

    public getSynchronousAllAppointments(): any {

        var request = new XMLHttpRequest();
        var myObj = [];
        request.open('GET', this.url + "/appointment/api/appointments", false);  // `false` makes the request synchronous
        request.onload = () => {
            let serverResponse = request.responseText;
            myObj = JSON.parse(serverResponse);
        };
        try {
            request.send(null); // The null parameter indicates that no body content is needed for the GET request.
        }
        catch(e){
            alert("Problem to contact back-end")
        }
        if (request.status === 200) {
            console.log(request.responseText);
        }
        return myObj;
    }

    public getSynchronousConsultantById(id: any): any {
        var request = new XMLHttpRequest();
        var myObj;
        request.open('GET', this.url + "/consultant/" + id, false);  // `false` makes the request synchronous
        request.onload = () => {
            let serverResponse = request.responseText;
            myObj = JSON.parse(serverResponse);
        };
        try {
            request.send(null); // The null parameter indicates that no body content is needed for the GET request.
        }
        catch(e){
            alert("problem to contact back-end")
        }
        if (request.status === 200) {
            console.log(request.responseText);
        }
        return myObj;
    }

    public getSynchronousConsultants(): any {
        var request = new XMLHttpRequest();
        var myObj;
        request.open('GET', this.url + "/consultant/api/consultants", false);  // `false` makes the request synchronous
        request.onload = () => {
            let serverResponse = request.responseText;
            myObj = JSON.parse(serverResponse);
        };
        try {
            request.send(null); // The null parameter indicates that no body content is needed for the GET request.
        }
        catch(e){
            alert("Problem to contact back-end")
        }
        if (request.status === 200) {
            console.log(request.responseText);
        }
        return myObj;
    }

    public getSynchronousConsultantByUserName(userName: any) {
        let consultant = new ConsultantResponse();
        this.getSynchronousConsultants().forEach(element => {
            if (element.userName === userName) {
                consultant = element;
            }
        })
        return consultant;

    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A consultant-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            'Something bad happened; please try again later.');
    }

}
