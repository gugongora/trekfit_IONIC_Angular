import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet'; 



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  email: string = '';
  map: L.Map | undefined;
  userLocation: L.Marker | undefined; 
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
    // Verifica si el navegador tiene soporte para geolocalización
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Crea el mapa y lo centra en la ubicación actual del usuario
        this.map = L.map('map').setView([latitude, longitude], 17);

        // Carga un mapa de OpenStreetMap (puedes usar otros proveedores de mapas)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        // Coloca un marcador en la ubicación del usuario
        this.userLocation = L.marker([latitude, longitude], { icon: defaultIcon})
          .addTo(this.map)
          .bindPopup('Tu ubicación actual')
          .openPopup();
      }, () => {
        alert('No se pudo obtener la ubicación');
      });
    } else {
      alert('Geolocalización no soportada por el navegador');
    }
  }

}
