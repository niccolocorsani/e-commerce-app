import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";




@Injectable({
    providedIn: 'root'
})
export class MailServiceService {





    /*       url = "https://api.sendgrid.com/v3/send"

           header = new HttpHeaders({
               "Content-Type": "application/json",
               "Authorization": "Bearer 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"
           });

           myObserver = {
               next: (value: any) => console.log(value),
               error: (err: any) => alert('Observer got an error: ' + err + '..'),
           };

           constructor(public http: HttpClient) {
           }

           public async sendMail(mail: string) {

               const requestOptions = {headers: this.header};
               this.http.post<Object>(this.url, {
                       "personalizations": [{
                           "to": [{
                               "email": "jobel2290@gmail.com",
                               "name": "John Doe"
                           }], "subject": "Hello, World!"
                       }],
                       "content": [{"type": "text/plain", "value": "Heya!"}],
                       "from": {"email": "sam.smith@example.com", "name": "Sam Smith"},
                       "reply_to": {"email": "sam.smith@example.com", "name": "Sam Smith"}
                   }
                   , requestOptions)
                   .subscribe(this.myObserver);
           }*/

}
