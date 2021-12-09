import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { DeviceOrientation } from '@ionic-native/device-orientation/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

	constructor(
		public alertController: AlertController,
		private gyroscope: Gyroscope,
		private deviceOrientation: DeviceOrientation,
		private flashlight: Flashlight,
		private vibration: Vibration,
		private nativeAudio: NativeAudio,
		private deviceMotion: DeviceMotion) { }

	checked = false;

	switched(event) {
		console.log(!this.checked);
		/*Al cambiar la posición, a izquierda o a derecha, emitirá un sonido distinto para cada lado.*/
		/*● Al ponerlo vertical, se encenderá la luz (por 5 segundos) y emitirá un sonido durante ese período.
		/*● Al ponerlo horizontal, vibrará (por 5 segundos) y emitirá un sonido durante ese período.*/
		/*Para desactivar la alarma se pedirá una contraseña que deberá coincidir con la contraseña utilizada en el
		ingreso.*/
		this.presentSwal();
	}

	presentSwal(){
		
		var passWord;
		Swal.fire({
			title: 'Super Contraseña',
			input: 'password',
			inputAttributes: {
			  autocapitalize: 'off'
			},
			showCancelButton: true,
			cancelButtonText: 'Soy el ladron',
			confirmButtonText: 'Confirmar',
			showLoaderOnConfirm: true,
			preConfirm: (login) => {

				console.log(login);

				passWord = true;

				if (login != "123456") {
					this.checked = !this.checked;
				}
				
				if(this.checked)
					this.isActivated = true;
				else	
					this.isActivated = false;
			},
			preDeny: (login)=>{
				this.checked = !this.checked;
			},
			allowOutsideClick: () => !Swal.isLoading()
		  }).then((result) => {

			if(!passWord){
				this.checked = !this.checked;
			}
			/*if (result.isConfirmed) {
			  Swal.fire({
				title: `${result.value.login}'s avatar`,
				imageUrl: result.value.avatar_url
			  })
			}*/
		  })

	}

	options: GyroscopeOptions = {
		frequency: 1000
	};

	options2 = { frequency: 1000 };

	watch: any;
	trueHead;
	magneticHead;
	accelaration;

	isPhoneMoved = false;
	previousState = "arriba";


	accelerationX;
	accelerationY;
	accelerationZ;

	ngOnInit() {


		//N : 340 ~ 80   - 0
		//D:  81 ~ 180   - 90
		//S: 276         - 180 
		//I: 296         - 270


		//empieza derecho
		//desde arriba hacia izquierda o derecha un sonido
		//verticalmente se enciende la luz por 5 segundos y emite sonido
		//horizontalmente, vibra por 5 segundos y emite un sonido.

		var initial = false;
		var initialHead;

		var arribaDesde;
		var arribaHasta;

		var abajoDesde;
		var abajoHasta;

		var izquierdaDesde;
		var izquierdaHasta;

		var derechaDesde;
		var derechaHasta;

		this.deviceOrientation.watchHeading().subscribe((heading) => {
			this.trueHead = heading.trueHeading;
			
			console.log(this.trueHead);

			/*if(!initial){
				initial = true;
				initialHead = heading.trueHeading;
				
				arribaHasta = initialHead + 45;
				
				var arribaDesdeAux = initialHead - 45;
				arribaDesdeAux = Math.abs(arribaDesdeAux);
				arribaDesde -= arribaDesdeAux;
				
				derechaDesde = arribaHasta

			}*/

			

			if ((heading.trueHeading >= 330 || heading.trueHeading <= 60) && this.checked && this.isActivated) {
				
				if(this.previousState != "arriba"){

					/*if(this.isPhoneMoved == true) {
						this.flashlight.switchOn();
						this.playSound("robo3");
					}*/
					//North
					//luz + sonido
					this.previousState = "arriba";
				}
				//this.previousState = "arriba";
			}
			else if (heading.trueHeading > 60 && heading.trueHeading <= 100 && this.checked && this.isActivated) {
				this.isPhoneMoved = true;
				//derecha
				//if(this.previousState != "derecha"){

					if (this.previousState != "derecha") {
						this.playSound("robo2");
						//this.vibrate(5000);
						//vibrar por 5 segundos y emitir sonido
					}
	
					

					//derecha
					//sonido
				//}
				
				this.previousState = "derecha";
			}
			else if (heading.trueHeading >= 135 && heading.trueHeading <= 225 && this.checked && this.isActivated) {
				this.isPhoneMoved = true;
				//Abajo
				/*if(this.previousState != "abajo"){
					if (this.isPhoneMoved) {

						this.flashlight.switchOn();
						this.playSound("robo4");
					}
					//Abajo
					//luz + sonido
				}*/

				//this.previousState = "abajo";
			}
			else if (heading.trueHeading > 250 && heading.trueHeading < 300 && this.checked && this.isActivated) {

				if(this.previousState != "izquierda"){
					
					this.isPhoneMoved = true;
					if (this.previousState != "arriba") {
						this.playSound("robo1");
						//this.vibrate(5000);
						//vibrar por 5 segundos y emitir sonido
					}
					

					//Izquierda
					//sonido\
				}
				this.previousState = "izquierda";
			}

			this.magneticHead = heading.magneticHeading;
		});


		// Watch device acceleration
		var currentState = "";
		var subscription = this.deviceMotion.watchAcceleration(this.options2).subscribe((acceleration: DeviceMotionAccelerationData) => {


			if(this.checked){
				if(acceleration.y >= 8 && acceleration.y <= 10) {
					
					if(currentState != "vertical"){
						this.flashlight.switchOn();
						this.playSound("robo3");
					}

					currentState = "vertical";
				}

				if(acceleration.x <= -9 && acceleration.x >= -11)
				{
					if(currentState != "horizontal"){
						this.vibrate(5000);
						this.playSound("robo4");
					}
					currentState = "horizontal";
				}
			}

			/*
			x: -2.051910400390625
			y: 0.9230194091796875
			z: 9.444992065429688
			*/

			/*
			Acceleration {x: -0.4477996826171875, y: -0.8359222412109375, z: 9.69000244140625, timestamp: 1633536814479}
			Acceleration {x: -0.460968017578125, y: -0.8411102294921875, z: 9.6951904296875, timestamp: 1633536894448}

			Vertical
				Acceleration {x: -0.4837188720703125, y: 9.476303100585938, z: 0.8689727783203125, timestamp: 1633536914479}
					Acceleration {x: -0.614990234375, y: 9.536163330078125, z: -1.30975341796875, timestamp: 1633537004484}
			
			Horizontal
			Acceleration {x: -10.001861572265625, y: 0.510009765625, z: 0.530975341796875, timestamp: 1633536934473}
			Acceleration {x: -10.154693603515625, y: 0.504425048828125, z: -0.447845458984375, timestamp: 1633536974497}
			*/
			this.accelerationX = acceleration.x;
			this.accelerationY = acceleration.y;
			this.accelerationZ = acceleration.z;

			this.accelaration = acceleration;
			console.log(acceleration);
		});
  
		

		/*this.gyroscope.getCurrent(this.options)
			.then((orientation: GyroscopeOrientation) => {
				console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
				this.x = orientation.x;
				this.y = orientation.y;
				this.z = orientation.z;
			})
			.catch();

		this.gyroscope.watch(this.options)
			.subscribe((orientation: GyroscopeOrientation) => {
				console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
				this.x2 = orientation.x;
				this.y2 = o rientation.y;
				this.z2 = orientation.z;
			});*/

	}


	firstPath = "assets/audio/";
	extension = ".aac"

	playSound(soundFile) {
		let random = Math.random().toString(36).substr(2, 9);
		this.nativeAudio.preloadSimple(random, this.firstPath + soundFile + this.extension).then(() => {
			this.nativeAudio.play(random, () => {

				this.nativeAudio.unload(random);
				if (this.flashlight.isSwitchedOn)
					this.flashlight.switchOff();
			});
		});
	}

	async vibrate(millis) {
		this.vibration.vibrate([millis]);
		//this.vibration.vibrate(millis);

		setTimeout(() => {
			this.vibration.vibrate(0);
		}, millis);
	}

	//z es la altura
	//x es de izquierda a derecha
	//y es de arriba a abajo

	//adelante:
	//x:0.0000

	//-0.0000152587890625 0.00164794921875 0.0010833740234375 1633367233773
	//0.00103759765625 -0.00048828125 0.0000152587890625 1633367244574

	//S -0.003509521484375 0.0053558349609375 -0.000213623046875 1633367358796
	//  -0.0003814697265625 0.000518798828125 -0.0012969970703125 1633367386404

	//  -0.0004119873046875 0.0001983642578125 0.00103759765625 1633367443477
	//   0.001708984375 -0.0019378662109375 -0.000030517578125 1633367485595


	//0008544921875 -0.0002899169921875 -0.0000762939453125 1633361817232
	//00213623046875 -0.0002899169921875 -0.0000762939453125 1633361787206
	//000152587890625 0.0007476806640625 -0.0011444091796875 1633361867238

	/*N -0.00006103515625 0.00042724609375 -0.0002288818359375 1633361584017
	/*W 001129150390625 -0.002777099609375 -0.0002288818359375 1633361697218
	  S 0042724609375 0.0000152587890625 -0.0001220703125 1633361727241
	  E 009307861328125 0.0048828125 -0.0000457763671875 1633361757223
	  */

	/*
	X	Represents the east-west direction (where east is positive).
	Y	Represents the north-south direction (where north is positive).
	Z	Represents the up-down direction, perpendicular to the ground (where up is positive).
 
   -0.0002899169921875 -0.0001983642578125 0.000030517578125 1633364081953
   -0.0002899169921875 -0.0001983642578125 0.000030517578125 1633364095572
 
	N:  0079345703125    -0.0009918212890625 -0.000274658203125 1633363826810
	  0.0000762939453125 -0.0003509521484375 -0.000152587890625 1633363848696
 
	D  0.000701904296875 0.001190185546875 0.00103759765625 1633363940917
	 -0.0003509521484375 0.0001220703125 -0.000030517578125 1633363925841
 
   S  -0.0004425048828125 -0.0011138916015625 -0.0001678466796875 1633363997833
	  -0.0004425048828125 -0.0000457763671875 -0.0001678466796875 1633364012660
 
   I  0.0006103515625 0.0010223388671875 -0.0001678466796875 1633364039707
	 -0.000213623046875 -0.0001220703125 -0.0001678466796875 1633364047971
 
 
 -0.021636962890625 0.001861572265625 -0.000335693359375 1633364798367
 
 
 
 
	*/
	//

	x;
	y;
	z;

	x2;
	y2;
	z2;









	async presentAlertPrompt() {
		const alert = await this.alertController.create({
			cssClass: 'my-custom-class',
			header: 'Contraseña',
			inputs: [
				{
					name: 'pass',
					type: 'password',
					placeholder: 'Super contraseña'
				}
			],
			buttons: [
				{
					text: 'Soy el ladron',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						this.checked = !this.checked;
						console.log('Confirm Cancel');

					if(this.checked)
						this.isActivated = true;
					else	
						this.isActivated = false;

					}
				}, {
					text: 'Ok',
					handler: (blah) => {
						console.log('Confirm Ok', blah);
						if (blah.pass != "123456") {
							this.checked = !this.checked;
						}
						
						if(this.checked)
							this.isActivated = true;
						else	
						this.isActivated = false;

					}
				}
			]
		});

		await alert.present();
	}


isActivated = false;


}
