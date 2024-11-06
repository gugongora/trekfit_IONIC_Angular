import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { StorageService } from 'src/managers/StorageService';
import { CancelAlertService } from 'src/managers/CancelAlertService';
import { UserLogoutUseCase } from '../use-cases/user-logout.user-case';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user: any;

  email: string = '';
  map: L.Map | any;
  userLocation: L.Marker | undefined; 
  apiKey = '46f9fc3f1dcadc3d855d0ea270311b2a';
  apiUrl = 'https://maps.open-street.com/api/route/'; // URL de la API de rutas

  constructor(private router: Router,
              private storageservice: StorageService,
            private cancelAlertService: CancelAlertService,
          private logoutUseCase: UserLogoutUseCase) {}

  async ngOnInit() {
    this.loadMap();
    this.loadData();
  }

  async ionViewDidEnter() {
    this.user = await this.storageservice.get('user');
    if (!this.user) {
      console.log('No se encontraron datos del usuario.');
    }
  }
  
  goToBigMap() {
    this.router.navigate(['/bigmap']);
  }
  goTobitacora(){
    this.router.navigate(['/bitacora']);
  }
  goToMemories(){
    this.router.navigate(['/memories'])
  }

  async loadData() {
    const userEmail = await this.storageservice.get('user');
    this.email = userEmail.email;
  }

  async onSignOutButtonPressed() {
    this.cancelAlertService.showAlert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      async () => {
        this.logoutUseCase.performLogout();
        this.router.navigate(['/splash']);
      },
      () => { }
    );
  }

  async onUpdateButtonPressed(){

  

  }

  loadMap() {
    const defaultIcon = L.icon({
      iconUrl: 'assets/img/leaflet/marker-icon.png',
      iconRetinaUrl: 'assets/img/leaflet/marker-icon-2x.png',
      shadowUrl: 'assets/img/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  
    // Verificar si el mapa ya está inicializado para evitar volver a cargarlo
    if (this.map) {
      return;  // Si ya existe un mapa, no hacemos nada
    }
  
    // Verifica si el navegador tiene soporte para geolocalización
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          // Crea el mapa solo si no ha sido creado ya
          this.map = L.map('map').setView([latitude, longitude], 17);
  
          // Cargar el mapa de OpenStreetMap
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(this.map);
  
          // Coloca un marcador en la ubicación del usuario
          this.userLocation = L.marker([latitude, longitude], { icon: defaultIcon })
            .addTo(this.map)
            .bindPopup('Tu ubicación actual')
            .openPopup();
        },
        (error) => {
          // Manejo de errores en la obtención de la ubicación
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert('Permiso de geolocalización denegado.');
              break;
            case error.POSITION_UNAVAILABLE:
              alert('La ubicación no está disponible.');
              break;
            case error.TIMEOUT:
              alert('La solicitud para obtener la ubicación ha caducado.');
              break;
            default:
              alert('Error desconocido al obtener la ubicación.');
              break;
          }
        }
      );
    } else {
      alert('Geolocalización no soportada por el navegador');
    }
  }
}