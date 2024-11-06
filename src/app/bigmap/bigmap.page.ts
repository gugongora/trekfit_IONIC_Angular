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
  latitud: number = 0;
  longitud: number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Suscribirse a los queryParams para obtener las latitud y longitud
    this.route.queryParams.subscribe(params => {
      this.latitud = params['lat'];  // Recibe la latitud desde los queryParams
      this.longitud = params['lon'];  // Recibe la longitud desde los queryParams
    });
    
    // Cargar el mapa después de recibir los parámetros
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
    
    // Asegurarse de que latitud y longitud son válidos
    if (this.latitud && this.longitud) {
      // Crear el mapa y centrarlo en las coordenadas pasadas como parámetros
      this.map = L.map('map').setView([this.latitud, this.longitud], 17);
    
      // Cargar el mapa de OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    
      // Colocar un marcador en la ubicación recibida
      this.userLocation = L.marker([this.latitud, this.longitud], { icon: defaultIcon })
        .addTo(this.map)
        .bindPopup('Ubicación de la bitácora')
        .openPopup();
    } else {
      // Si no se recibió latitud y longitud, mostrar mensaje o usar geolocalización como fallback
      alert('No se recibió información de ubicación');
    }
  }



}