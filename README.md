


# Overview

- **Academic Year**: 2021-2022
- **Project Title**: Client consultant interaction application
- **Students**: Niccolò Corsani
- **CFUs**: 9

Il progetto prevede lo sviluppo di un applicativo Ecommerce in grado di gestire automaticamente vari aspetti della compra vendita, di pubblicità dei prodotti e di gestione degli aspetti commerciali legati agli acquisti

# Tecniche e strumenti

The main tools and techniques we will employ are:

- **Angular 2+**: For front-end implementation \[1\].
- **Ionic Bootstrap Angular Material**: For the support of the front-end implementation \[2\].
- **Firebase**: For back-end implementation \[3\].
- **Google Cloud Services**: For cross-platform development \[4\].
- **Capacitor Android**: For cross-platform development \[5\].


...


# Simulazione del progetto

Di seguito è possibile osservare alcune simulazioni di scenari tipici e flussi di eventi che un utente può eseguire



![123](https://user-images.githubusercontent.com/79635059/153195959-f6761ac7-0aa6-4ac5-a26d-159ac1c8c9b7.gif)


Some Consultant features:



![123](https://user-images.githubusercontent.com/79635059/153251350-3c412134-565f-4d8b-8b87-22009bf377f1.gif)


Flow to schedule a notification:



![prova](https://user-images.githubusercontent.com/79635059/153254230-93f51ab0-f132-4d5a-91f5-7b6a259f39e1.gif)




# Istruzioni per testare il sistema

Il sistema si trova distribuito al link di seguito:
https://spring-ship-344311.firebaseapp.com/folder/Inbox

Tuttavia se è necessario usuffruire di tutte le features che offre il sistema è necessario fare l'installazione del sistema in locale. Ciò è dovuto al fatto che il sistema si appoggia a prodotti di terze parti ad esempio "Google Login" o "Google maps" che risultano registrati solo sotto il dominio di "localhost".
Per installare e testare il software fare il clone del progetto ed eseguire il comando:

```
 npm i --legacy-peer-deps
 ```
Successivamente eseguire il comando:
```
ionic serve
```
Aprire adesso il browser alla pagina http://localhost:8100/client


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






