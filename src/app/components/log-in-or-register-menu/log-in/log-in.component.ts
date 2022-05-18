import {Component, OnInit} from '@angular/core';
import {RequestConsultantServiceService} from "../../../services/request/request-consultant-service.service";
import {RequestClientServiceService} from "../../../services/request/request-client-service.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
})
export class LogInComponent {

  eMail = 'E-mail';
  password= 'Password'


  constructor() {
  }





  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
