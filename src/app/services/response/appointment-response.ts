import {ClientResponse} from "./client-response";
import {ConsultantResponse} from "./consultant-response";

export class AppointmentResponse {

  date: string;
  startTime: string;
  endTime: string;
  client: ClientResponse;
  consultant: ConsultantResponse;


  constructor(data?: any) {
    this.date = data ? data.date : null;
    this.startTime = data ? data.startTime : null;
    this.endTime = data ? data.endTime : null;
    this.client = data ? data.client : null;
    this.consultant = data ? data.consultant : null;
  }
}
