import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenComponentsService {



  openDialogVarAccount = false;
  openDialogVarShowUsers = false;
  openDialogNotification = false;
  openDialogCalendar = false;
  openDialogMenu = true;
  openDialogMaps = false;


  constructor() {

  }
}
