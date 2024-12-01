import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: L.Map | undefined;
  userLocation: L.Marker | undefined;

  constructor() { }

  // Método para inicializar el mapa y colocar el marcador de usuario
  initializeMap(mapElementId: string, userLatitude: number, userLongitude: number): L.Map {
    const defaultIcon = L.icon({
      iconUrl: 'assets/img/leaflet/marker-icon.png',
      iconRetinaUrl: 'assets/img/leaflet/marker-icon-2x.png',
      shadowUrl: 'assets/img/leaflet/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Crear el mapa
    this.map = L.map(mapElementId).setView([userLatitude, userLongitude], 17);

    // Cargar el mapa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Coloca el marcador de usuario en el mapa
    this.userLocation = L.marker([userLatitude, userLongitude], { icon: defaultIcon })
      .addTo(this.map)
      .bindPopup('Tu ubicación actual')
      .openPopup();

    return this.map;  // Retorna el mapa por si se necesita hacer algo más con él
  }

  // Método para destruir el mapa
  destroyMap() {
    if (this.map) {
      this.map.remove();  // Esto elimina el mapa y todos sus elementos
      this.map = undefined;  // Limpiar la referencia al mapa
      this.userLocation = undefined;  // Limpiar la referencia al marcador
    }
  }

  // Método para obtener la ubicación del usuario (usado en BigmapPage si no se pasan coordenadas)
  getUserLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject('Geolocalización no soportada');
      }
    });
  }
}
