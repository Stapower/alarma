import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import {FirebaseAuth} from '../../class/firebase-auth';
import { Router } from  "@angular/router";
import { AuthServiceService } from '../../services/auth-service.service';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../popover/popover.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	
	constructor(public fireAuth : FirebaseAuth,
		private router: Router,
		public popoverController: PopoverController) {

		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
		this.darkMode = prefersDark.matches;
		document.body.classList.toggle('dark');
	 }
	darkMode: boolean = true;

	elegirUser(event){
		 this.presentPopover(event);
	}

	mails = ["tomas@gmail.com", "asd@gmail.com", "test123@gmail.com", "admin@gmail.com"];

	persons = [{mail:"tomas@gmail.com", pass:"123456"}];
	//{mail:"tomas@gmail.com", pass:"123456"}
	async CreatePopover(ev: any) {
		const pop = await this.popoverController.create({
		  component: PopoverComponent,
		  cssClass: 'my-custom-class',
		  event: ev,
		  translucent: true,
		  componentProps: {
			"person": "tomas",
		  }
		});
		return await pop.present();
	  }

	async presentPopover(ev: any) {
		const popover = await this.popoverController.create({
		  component: PopoverComponent,
		  cssClass: 'my-custom-class',
		  event: ev,
		  translucent: true
		});
		await popover.present();
		const { role } = await popover.onDidDismiss();
		console.log('onDidDismiss resolved with role', role);
	  }


	public user = {
		email: "admin@gmail.com",
		password: "123456"
	}

	ngOnInit() {
		this.loggingIn  = false;
	}
	loggingIn = false;
	logIn(event){
		console.info(this.user);
		localStorage.setItem("email", this.user.email);
		this.loggingIn = true;
		this.fireAuth.login(this.user).then(success =>{
			this.loggingIn = false;
			AuthServiceService.usuario.length = 0;
			AuthServiceService.usuario.push(this.user.email);
			this.router.navigate(['/tabs/tab1']);
			//this.router.navigate(['/component', this.user.email]);
			//localStorage.setItem("nombre", );
		}).catch(err=>{
			//this.router.navigate(['/tabs/tab1']);
		});
		
	}



	usuario(event){
		console.log(event);
		//alert(event.detail.value);
		this.user.email = event;
	}

}
