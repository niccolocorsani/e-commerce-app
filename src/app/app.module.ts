import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {AppComponent} from './app.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {RegisterComponent} from './components/register/register.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';
import {NgCalendarModule} from 'ionic2-calendar';
import {ClientComponent} from "./layout/client/client.component";
import {BusinessConsultantComponent} from "./layout/business-consultant/business-consultant.component";
import {ShowProductsComponent} from "./components/show-products/show-products.component";
import {AgmCoreModule} from "@agm/core";
import {SocialSharingComponent} from "./components/social-sharing/social-sharing.component";
import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider} from 'angularx-social-login';
import {SocialLogInComponent} from "./components/social-log-in/social-log-in.component";
import {SocialRegisterComponent} from "./components/social-register/social-register.component";
import {TooltipsModule} from "ionic-tooltips";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {environment, environmentGoogleAnalytics, firebaseConfig} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {MyLibModule} from "new-material-design-experiments/dist/my-lib";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {
    ConsultantECommerceFeaturesComponent
} from "./components/consultant-e-commerce-features/consultant-e-commerce-features.component";
import {CarrelloComponent} from "./components/carrello/carrello.component";
import {
    SpinnerMaterialComponentComponent
} from "./components/spinner-material-component/spinner-material-component.component";
import {PaymentsComponent} from "./components/payments/payments.component";
import {CheckOutComponent} from "./components/confirm-order/check-out.component";
import {
    GeoLocationModalHelperComponent
} from "./components/register/geo-location-modal-helper/geo-location-modal-helper.component";
import {
    ConsultantFeatureSeeOrdersComponent
} from "./components/consultant-feature-see-orders/consultant-feature-see-orders.component";
import {CookiesComponent} from "./components/cookies/cookies.component";
import {GlobalErrorHandlerService} from "./services/global-error-handler/global-error-handler.service";
import {
    ConfirmRegistrationComponent
} from "./components/confirm-pages/confirm-registration/confirm-registration.component";
import {ConfirmPaymentComponent} from "./components/confirm-pages/confirm-payment/confirm-payment.component";
import {ContattaciComponent} from "./static-pages/contattaci/contattaci.component";
import {CookiePolicyComponent} from "./static-pages/cookie-policy/cookie-policy.component";
import {PrivacyPolicyComponent} from "./static-pages/privacy-policy/privacy-policy.component";
import {RimborsiComponent} from "./static-pages/rimborsi/rimborsi.component";
import {TerminiAcquistoComponent} from "./static-pages/termini-acquisto/termini-acquisto.component";


@NgModule({
    declarations: [
        AppComponent,
        LogInComponent,
        RegisterComponent,
        ClientComponent,
        BusinessConsultantComponent,
        ShowProductsComponent,
        SocialSharingComponent,
        SocialLogInComponent,
        SocialRegisterComponent,
        ConsultantECommerceFeaturesComponent,
        CarrelloComponent,
        SpinnerMaterialComponentComponent,
        PaymentsComponent,
        CheckOutComponent,
        GeoLocationModalHelperComponent,
        ConsultantFeatureSeeOrdersComponent,
        CookiesComponent,
        ConfirmRegistrationComponent,
        ConfirmPaymentComponent,

    ],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(),
        HttpClientModule, SocialLoginModule, TooltipsModule.forRoot(), BrowserAnimationsModule,

        //https://github.com/angular/angularfire/blob/master/docs/ionic/cli.md
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule, // imports firebase/database, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCAUya-I9pe7stgs6QZqLNRxRKeBWTT6dQ'
        }),
        // https://medium.com/letsboot/translate-angular-4-apps-with-ngx-translate-83302fb6c10d
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }), MyLibModule, AngularFireStorageModule, MyLibModule, MyLibModule,
        RouterModule.forRoot([
            {path: 'carrello', component: CarrelloComponent},
            {path: 'client', component: ClientComponent},
            {path: 'login', component: LogInComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'checkout', component: CheckOutComponent},
            {path: 'consultant123123-number123', component: BusinessConsultantComponent},
            {path: 'payments', component: PaymentsComponent},
            {path: 'confirm-registration', component: ConfirmRegistrationComponent},
            {path: 'contattaci', component: ContattaciComponent},
            {path: 'cookie-policy', component: CookiePolicyComponent},
            {path: 'privacy-policy', component: PrivacyPolicyComponent},
            {path: 'rimborsi', component: RimborsiComponent},
            {path: 'termini-acquisto', component: TerminiAcquistoComponent},
            {path: 'confirm-payment', component: ConfirmPaymentComponent},
            {path: '', redirectTo: '/client', pathMatch: 'full'},
        ]),
    ],
    // https://www.youtube.com/watch?v=FLHi2pc8gX0 spiegazione LocalNotifications
    providers: [
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy,},
        LocalNotifications,
        AppComponent,
        {provide: ErrorHandler, useClass: GlobalErrorHandlerService},
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            '262434699082-bnq5dgk6bdrb8g95vs56u82800s1at3e.apps.googleusercontent.com'
                        )
                    },
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider('1543052669422518')
                    }
                ]
            } as SocialAuthServiceConfig,
        },
    ],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

