import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {


  currentLoggedUserId = ''
  hideCookieCard = false
  client : any


  constructor() { }

}
