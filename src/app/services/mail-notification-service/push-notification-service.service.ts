import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {OneSignal} from "onesignal-ngx";


@Injectable({
    providedIn: 'root'
})
export class PushNotificationServiceService {

    // per renderlo disponibile anche online: https://app.onesignal.com/apps/206e4ddb-a9f7-4d03-a059-ae34ed5cdf00/settings/webpush/configure

    private url = 'https://onesignal.com/api/v1/notifications';

    header = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Basic MjJlOWZjOGMtZjhhOC00OThkLWE1ODctNzQ3N2QxMDFlOGY4"
    });

    myObserver = {
        next: (value: any) => console.log(value),
        error: (err: any) => alert('Observer got an error: ' + err + '..'),
    };

    constructor(public http: HttpClient, private oneSignal: OneSignal) {
        this.oneSignal.init({
            appId: "206e4ddb-a9f7-4d03-a059-ae34ed5cdf00",
        });
        this.oneSignal.setEmail("jobel2290@gmail.com")
    }


    public async postNotificationAtSpecificTime(year: string, month: string, day: string, hour: string, minute: string) {

        const requestOptions = {headers: this.header};
        this.oneSignal.getUserId((userId) => {

            this.http.post<Object>(this.url, {
                "app_id": "206e4ddb-a9f7-4d03-a059-ae34ed5cdf00",
                "include_player_ids": [userId],
                "contents": {
                    "en": "Sampple Push Message"
                },
                "send_after": year + "-" + month + "-" + day + " " + hour + ":" + minute + ":00 GMT+0100"  //// For italy time
            }, requestOptions)
                .subscribe(this.myObserver);
        })
    }


    createPushNotification(message: string) {
        this.oneSignal.getUserId((userId) => {
            const requestOptions = {headers: this.header};
            this.http.post<Object>(this.url, {
                "app_id": "206e4ddb-a9f7-4d03-a059-ae34ed5cdf00",
                "include_player_ids": [userId],
                url:'https://mail.google.com/mail/u/0/#inbox',
                "contents": {
                    "en": message
                },
            }, requestOptions)
                .subscribe(this.myObserver);
        })
    }
}
