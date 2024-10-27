import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/managers/StorageService';
import * as polyline from 'polyline';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  email: string = '';
  map: L.Map | any;
  userLocation: L.Marker | undefined; 
  apiKey = '46f9fc3f1dcadc3d855d0ea270311b2a';
  apiUrl = 'https://maps.open-street.com/api/route/'; // URL de la API de rutas

  constructor(private router: Router,
              private storageservice: StorageService,
              private http: HttpClient) {}

  async ngOnInit() {
    this.loadMap();
    this.loadData();
  }
  
  goToBigMap() {
    this.router.navigate(['/bigmap']);
  }
  goTobitacora(){
    this.router.navigate(['/bitacora']);
  }

  async loadData() {
    const userEmail = await this.storageservice.get('user');
    this.email = userEmail.email;
  }

  async performLogout() {
    await this.storageservice.clear();
    this.router.navigate(['/splash']); 
  }

  // Función para obtener la ruta desde la API
  getRoute(lat: number, lon: number, destLat: number, destLon: number) {
    const url = `${this.apiUrl}?origin=${lat},${lon}&destination=${destLat},${destLon}&mode=driving&key=${this.apiKey}`;

    this.http.get(url).subscribe((response: any) => {
      console.log(response); // Verificar la respuesta de la API
      if (response && response.polyline) {
        const decodedPolyline = this.decodePolyline(response.polyline);
        L.polyline(decodedPolyline, {   color: 'blue',   // Ajusta según el estilo deseado
          weight: 5,
          opacity: 0.7 }).addTo(this.map);
        this.map?.fitBounds(L.polyline(decodedPolyline).getBounds());
      } else {
        alert('No se pudo obtener la ruta.');
      }
    }, (error) => {
      console.error('Error al obtener la ruta:', error);
      alert('Error al cargar la ruta.');
    });
  }

  // Función para decodificar la polilínea
  decodePolyline(encoded: string): L.LatLngExpression[] {
    console.log(encoded); // Verifica si el string codificado es el esperado

    return polyline.decode(encoded).map((coords: number[]) => [coords[0], coords[1]]);
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

    if (this.map) {
      return;  // Si ya existe un mapa, no hacemos nada
    }

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

          // Coordenadas de Viña del Mar y Santiago
          const vinaLat = latitude; // Latitud de Viña del Mar
          const vinaLon = longitude; // Longitud de Viña del Mar
          const santiagoLat = -33.45694; // Latitud de Santiago
          const santiagoLon = -70.64827; // Longitud de Santiago

          // Llamada para obtener y mostrar la ruta desde Viña del Mar hasta Santiago
          this.getRoute(vinaLat, vinaLon, santiagoLat, santiagoLon);
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