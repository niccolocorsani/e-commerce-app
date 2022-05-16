import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class PushNotificationServiceService {


    private url = 'https://onesignal.com/api/v1/notifications';

    header = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Basic MjJlOWZjOGMtZjhhOC00OThkLWE1ODctNzQ3N2QxMDFlOGY4"
    });

    myObserver = {
        next: (value: any) => console.log(value),
        error: (err: any) => alert('Observer got an error: ' + err + '..'),
    };

    constructor(public http: HttpClient) {
    }


    public async postNotificationWithPriority(pushId: string, year: string, month: string, day: string, hour: string, minute: string, priority: string) {

        if(priority === "1") this.postNotificationAtSpecificTime(pushId,year, month ,day ,hour, minute);

        var other_hour : number = +hour;
        other_hour = other_hour - 1;

        if(priority === "2"){
            this.postNotificationAtSpecificTime(pushId,year, month ,day ,hour, minute);
            this.postNotificationAtSpecificTime(pushId,year, month ,day ,other_hour.toString(), minute);
        }
        if(priority === "3"){
            this.postNotificationAtSpecificTime(pushId,year, month ,day ,hour, minute);
            this.postNotificationAtSpecificTime(pushId,year, month ,day ,other_hour.toString(), minute);
            other_hour = other_hour - 1;
            this.postNotificationAtSpecificTime(pushId,year, month ,day ,other_hour.toString(), minute);
        }


    }

    public async postNotificationAtSpecificTime(pushId: string, year: string, month: string, day: string, hour: string, minute: string) {

        const requestOptions = {headers: this.header};


        this.http.post<Object>(this.url, {
            "app_id": "206e4ddb-a9f7-4d03-a059-ae34ed5cdf00",
            "include_player_ids": [pushId],
            "contents": {
                "en": "Sampple Push Message"
            },
            "send_after": year + "-" + month + "-" + day + " " + hour + ":" + minute + ":00 GMT+0100"  //// For italy time
        }, requestOptions)
            .subscribe(this.myObserver);
    }


    public async postNotification(pushId: string) {

        const requestOptions = {headers: this.header};

        alert(pushId)

        this.http.post<Object>(this.url, {
            "app_id": "206e4ddb-a9f7-4d03-a059-ae34ed5cdf00",
            "include_player_ids": [pushId],
            "contents": {
                "en": "Sampple Push Message"
            },
        }, requestOptions)
            .subscribe(this.myObserver);
    }

}
