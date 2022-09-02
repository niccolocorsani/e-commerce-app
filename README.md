


# Overview

- **Academic Year**: 2021-2022
- **Project Title**: Client consultant interaction application
- **Students**: Niccolò Corsani
- **CFUs**: 9

The project involves the development of an Ecommerce application capable of automatically managing various aspects of buying and selling, product advertising and management of commercial aspects related to purchases.

# Tecniche e strumenti

The main tools and techniques we will employ are:

- **Angular 2+**: For front-end implementation \[1\].
- **Ionic, Bootstrap, Angular Material**: For the support of the front-end implementation \[2\].
- **Firebase**: For back-end implementation \[3\].
- **Google Cloud Services**: For cross-platform development \[4\].
- **Capacitor Android**: For cross-platform development \[5\].
- **Python for some back-end functionality**: For some BackEnd functionality  \[6\].



...




# Some Demo and Gif

Buy product without registration


![info-software-tesi](https://user-images.githubusercontent.com/79635059/187912161-ebaefe57-90fd-4a9a-b2ac-de9166d9301f.gif)


New registration

![info-software-tesi](https://user-images.githubusercontent.com/79635059/187915092-4ae718a4-76c9-4081-9ac7-16743aa86af7.gif)

Add Product

to access the consultant's features, navigate to the following address: http://localhost:8100/consultant123123-number123

![info-software-tesi](https://user-images.githubusercontent.com/79635059/187937069-8aa1f4d3-e31e-4a4a-bd4a-d196ccc69a99.gif)

Check orders
<img width="1727" alt="Schermata 2022-09-01 alle 16 21 22" src="https://user-images.githubusercontent.com/79635059/187937589-8a14704c-794d-44dd-897b-c3218c57c690.png">

Consultant features for android.
This type of view works in the same way as the view shown above.
To see the implementation of the Android project see: https://github.com/niccolocorsani/CMS-android-angular

<div>
<img width="395" alt="Schermata 2022-09-01 alle 16 32 05" src="https://user-images.githubusercontent.com/79635059/187944301-150af750-3512-4dfa-9eb3-a539d6efd3cf.png">
<img width="394" alt="Schermata 2022-09-01 alle 16 32 18" src="https://user-images.githubusercontent.com/79635059/187944312-863d072f-0808-4dae-b7d0-9992f40b8136.png">
</div>



# Comments

The application was developed on two different platforms. In particular, the functionality of adding products for sale has been developed in both the web and the Android mobile platform. The choice to develop this functionality on a Mobile platform is due to the best management of any security problems.
The following image summarizes the deployment of the application:

<img width="464" alt="Schermata 2022-09-02 alle 13 07 58" src="https://user-images.githubusercontent.com/79635059/188126872-23f6e1ab-cbb8-4a8c-8dcb-de75e9b3449b.png">


# Instructions for testing the system


The system is distributed at the link below: https://spring-ship-344311.web.app/client

However, you must use all the features that the system offers you need to do the system installation locally. This is due to the fact that the system relies on third-party products such as "Google Login" or "Google maps" which are registered only under the domain of "localhost". To install and test the software, clone the project and run the command:

```
 npm i --legacy-peer-deps
 ```
Then run the command:
```
ionic serve
```
Now open your browser at http://localhost:8100/client

Remember to consent to push notifications to the browser at the operating system level in order to use them on the system.

As for the android system, it is possible to download the .apk file in the repository directly from the phone. Once the application has been installed, it can be run.



# Project Documents
Final report:


[Human computer interaction report.pdf](https://github.com/niccolocorsani/e-textile/files/9480779/Human.computer.interaction.report.pdf)



# Some other technical details

For the implementation of the email service, a system based on the SMTP protocol, Python and an Email provider (mailersend) has been implemented.
In this way it was possible to obtain a prototype of the Email service for free.
Some features of angular material have been encapsulated within a library so that they can be used in multiple projects, offering specific APIs for their construction. These features had been deployed at https://www.npmjs.com/package/angular-material-things-experiments


# Bibliography

1.	Geolocation: https://angular-maps.com/
2.	https://material.angular.io/
3. https://medium.com/letsboot/translate-angular-4-apps-with-ngx-translate-83302fb6c10d
4. https://capacitorjs.com/docs/android
5.	Push-Notification service OneSignal: https://onesignal.com/blog/how-to-integrate-push-notifications-in-angular/
6.	Social Authentication:  https://www.npmjs.com/package/angularx-social-login
7.	Social sharing content: https://stackblitz.com/edit/social-sharing?file=src%2Fapp%2Fshare-button%2Fshare-button.component.html
8.	Python Email SMTP service: https://realpython.com/python-send-email/








