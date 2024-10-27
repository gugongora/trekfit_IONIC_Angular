import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AngularFireDatabase } from '@angular/fire/compat/database';





@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.page.html',
  styleUrls: ['./bitacora.page.scss'],
})
export class BitacoraPage implements OnInit {


  descripcion: string = "";
  currentDate: string = "";
  latitude: number | null = null;
  longitude: number | null = null;
  capturedPhoto: string | any; // Para almacenar la imagen tomada
  

  constructor(private db: AngularFireDatabase) { 
    this.getCurrentDate();
    this.getCurrentPosition();
  }

  ngOnInit() {  
  }

  onSaveButtonPressed(){


  }

  getCurrentDate() {
    const today = new Date();
    this.currentDate = today.toLocaleDateString(); // Puedes personalizar el formato
  }
  getCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        },
        (error) => {
          console.log('Error getting location', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // Guardar como URL de datos para mostrarla
        source: CameraSource.Camera, // Abrir directamente la cámara
      });

      this.capturedPhoto = image.dataUrl; // Guardar la imagen tomada
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }


}
