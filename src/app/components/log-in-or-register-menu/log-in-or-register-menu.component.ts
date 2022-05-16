import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-log-in-or-register-menu',
  templateUrl: './log-in-or-register-menu.component.html',
})
export class LogInOrRegisterMenuComponent  {


  @Input() collapsedLogIn = false;
  @Input() collapsedRegister = false;
  @Output() close = new EventEmitter<any>();    ///// Può essere applicato solo al padre nel tag in cui è presente <app-log-in-or-register-menu>


  openRegisterDialog(): void {
    this.collapsedRegister = !this.collapsedRegister;
    this.close.emit();
  }

  openLogInDialog(): void {
    this.collapsedLogIn = !this.collapsedLogIn;
    this.close.emit();
  }

}
