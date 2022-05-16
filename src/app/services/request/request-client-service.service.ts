import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {ClientResponse} from "../response/client-response";
import {AppointmentResponse} from "../response/appointment-response";

@Injectable({
  providedIn: 'root'
})
export class RequestClientServiceService {


  private url = 'http://localhost:8080/spring-app';
  public editDataDetails: any = [];
  private events = new BehaviorSubject(this.editDataDetails);
  currentMessage = this.events.asObservable();

  constructor(public http: HttpClient) {
  }

  myObserver = {
    next: (value: any) => console.log(value),
    error: (err: any) => alert('Observer got an error: ' + err + '..'),
  };

  ////writing method async, reading method sync

  public async putClient(client: ClientResponse) {
    this.http.put<ClientResponse>(this.url + '/client/putClient', client).pipe(
      catchError(this.handleError)
    ).subscribe(this.myObserver);
  }


  
  public async updateAppoitnment(appointment: AppointmentResponse){
    this.http.put<AppointmentResponse>(this.url + '/appointment/putAppointment', appointment).pipe(
      catchError(this.handleError)
    ).subscribe(this.myObserver);
  }

  public getClientAppointments(id: any) {
    let appointments = this.getSynchronousAllAppointments();
    let clientAppointments = [];
    appointments.forEach(element => {
      if (element.client.id === id) {
        clientAppointments.push(element);
      }
    })

    let events = [];
    clientAppointments.forEach(element => {
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
    }
    return myObj;
  }

  public getSynchronousClientById(id: any): any {
    var request = new XMLHttpRequest();
    var myObj;
    request.open('GET', this.url + "/client/" + id, false);  // `false` makes the request synchronous
    request.onload = () => {
      let serverResponse = request.responseText;
      myObj = JSON.parse(serverResponse);
    };
    try {
      request.send(null); // The null parameter indicates that no body content is needed for the GET request.
    }
    catch (e){
      alert("Problem to contact back-end")
    }
    if (request.status === 200) {
    }
    return myObj;
  }

  public getSynchronousClients(): any {
    var request = new XMLHttpRequest();
    var myObj;
    request.open('GET', this.url + "/client/api/clients", false);  // `false` makes the request synchronous
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
    }
    return myObj;
  }

  public getSynchronousClientByUserName(userName: any) {
    let client = new ClientResponse();
    this.getSynchronousClients().forEach(element => {
      if (element.userName === userName) {
        client = element;
      }
    })
    return client;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
      alert("Problem with back-end")
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      alert("Problem with back-end")

    }
    alert("Problem with back-end")
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
