import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import firebaseConfig from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import {MyServiceService} from './services/my-service.service';
import {LogOutComponent} from './auth/log-out/log-out.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { PopoverComponent } from './popover/popover.component'

//angular-devkit was changes from
//    //"@angular-devkit/build-angular": "~0.803.20",
//"@angular-devkit/build-angular": "~0.1000.0",
//npm i @angular-devkit/build-angular@0.803.20


@NgModule({
	declarations: [AppComponent, HeaderMenuComponent,LogOutComponent, PopoverComponent],
	entryComponents: [PopoverComponent],
	imports: [BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		AngularFireModule.initializeApp(firebaseConfig.firebase),
		AngularFireAuthModule,
		AngularFireDatabaseModule,
		MatProgressSpinnerModule,
		BrowserAnimationsModule],
		
	providers: [
		Gyroscope,
		StatusBar,
		SplashScreen,
		AngularFirestore,
		MyServiceService,
		DeviceOrientation,
		Flashlight,
		Vibration,
		NativeAudio,
		DeviceMotion,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }