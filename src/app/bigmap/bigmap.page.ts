import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet'; 

@Component({
  selector: 'app-bigmap',
  templateUrl: './bigmap.page.html',
  styleUrls: ['./bigmap.page.scss'],
})
export class BigmapPage implements OnInit {

  map: L.Map | undefined;
  userLocation: L.Marker | undefined; 
  email: string = '';

  constructor(private route: ActivatedRoute) {}


  ngOnInit() {
    this.route.queryParams.subscribe( params => {
      this.email = params['email'] || '';
    }),
    this.loadMap();
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
