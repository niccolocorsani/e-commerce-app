


# Overview

- **Academic Year**: 2021-2022
- **Project Title**: Client consultant interaction application
- **Students**: Niccolò Corsani
- **CFUs**: 9

The Project concerns the development of a web application for the management, saving and manipulation of different types of data useful for the interaction between generic customers and consultants. In particular, the functions made available by the application are those of: saving data that identify a customer and a consultant, booking an appointment between them and displaying the consultants' position on a map.

# Tools and Techniques

The main tools and techniques we will employ are:

- **Angular**: For front-end implementation \[1\].
- **Ionic**: For the support of the front-end implementation \[2\].
- **Spring-Boot**: For back-end implementation \[3\].
- **MySQL**: For the persistence of data and query manipulation \[4\].
- **Docker**: For the deploy of the back-end \[5\].
- **Capacitor Android**: For cross-platform development \[6\].


...


# Simulation of the project

Below is the final report, as well as some animated gifs to illustrate some examples of possible interactions with the GUI.
Some Client features:



![123](https://user-images.githubusercontent.com/79635059/153195959-f6761ac7-0aa6-4ac5-a26d-159ac1c8c9b7.gif)


Some Consultant features:



![123](https://user-images.githubusercontent.com/79635059/153251350-3c412134-565f-4d8b-8b87-22009bf377f1.gif)


Flow to schedule a notification:



![prova](https://user-images.githubusercontent.com/79635059/153254230-93f51ab0-f132-4d5a-91f5-7b6a259f39e1.gif)




# Instructions to execute system




To run the Front-end do the project clone and then run the command:

```
 npm i --legacy-peer-deps
 ```
 to install the dependencies.

Since there is a reference to the Google API and the domain registered in google-dev-console is http://localhost:8100, it is important to connect to that address making sure that the port is actually 8100. With the command 
```
ionic serve
```
the connection will be oriented to that port by default.
To get the services in the back-end it is necessary to initialize two containers through Docker. The two containers (Spring-app and MySQL engine) can be initialized by running the command from terminal: 
```
docker-compose up
```

inside the project where there is the target file "docker-compose.yml".

As mentioned earlier the project has been partially developed as an Android app, to do this see the script "ionic-to-andorid.sh".
There is a possibility to download the apk directly from the smartphone. Such apk can be found at the path "front-end-hci/android/app/build/outputs/apk/release/"
of this repository

Last note about push-notifications: in fact it is necessary, in order to receive these notifications, to specify in the operating system the consent to receive push notifications. In particular, it will be necessary to give consent to the Chrome application.

# Project Documents

Final report: [report.pdf](https://github.com/niccolocorsani/front-end-hci/files/8044499/Client-Consultant-App-Bagdanov.pdf)





# Bibliography

1.	Geolocation: https://angular-maps.com/
2.	Rest API: https://angular.io/guide/http,
https://medium.com/letsboot/translate-angular-4-apps-with-ngx-translate-83302fb6c10d
4.	Push-Notification service OneSignal: https://onesignal.com/blog/how-to-integrate-push-notifications-in-angular/
5.	Social Authentication:  https://www.npmjs.com/package/angularx-social-login
6.	Social sharing content: https://stackblitz.com/edit/social-sharing?file=src%2Fapp%2Fshare-button%2Fshare-button.component.html
7.	Tooltip: https://github.com/zyra/ionic-tooltips






