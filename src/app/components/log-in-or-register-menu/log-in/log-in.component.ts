import {Component, OnInit} from '@angular/core';
import {RequestConsultantServiceService} from "../../../services/request/request-consultant-service.service";
import {RequestClientServiceService} from "../../../services/request/request-client-service.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
})
export class LogInComponent {


  private element: any;
  name = 'name';
  userName = 'username';
  eMail = 'email';
  childInput: string ;

  addInputToVariable(newItem: string) {
    this.childInput = newItem;
  }

  constructor(private consulantService: RequestConsultantServiceService, private clientService: RequestClientServiceService) {
  }



  async submitToServerLogIn() {
    if (document.getElementById("header").textContent === "Consultant portal") {
      for (this.element of this.consulantService.getSynchronousConsultants()) {
        if (this.element.userName === this.childInput) {
          alert("User " + this.childInput + " found..");
          document.getElementById("header").textContent = document.getElementById("header").textContent + " logged : "+this.childInput;
          return;
        }
      }
      alert("Consultant not found..");
    }
    else   {
      for (this.element of this.clientService.getSynchronousClients()) {
        if (this.element.userName === this.childInput) {
          alert("User " + this.childInput + " found..");
          document.getElementById("header").textContent = document.getElementById("header").textContent + " logged user: "+this.childInput;
          return;
        }
      }
      alert("Client not found..");
    }
  }


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
