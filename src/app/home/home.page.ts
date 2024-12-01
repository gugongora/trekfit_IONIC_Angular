import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MapService } from '../use-cases/map-cases/mapService';
import { CancelAlertService } from 'src/managers/CancelAlertService';
import { UserLogoutUseCase } from '../use-cases/user-logout.user-case';
import { StorageService } from 'src/managers/StorageService';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  user: any;
  email: string = '';
  map: any;
  userLocation: any;
  apiKey = '46f9fc3f1dcadc3d855d0ea270311b2a';
  apiUrl = 'https://maps.open-street.com/api/route/'; // URL de la API de rutas
  isFabVisible: boolean = false; // Para controlar la visibilidad del botón flotante

  constructor(
    private router: Router,
    private cancelAlertService: CancelAlertService,
    private logoutUseCase: UserLogoutUseCase,
    private mapService: MapService,  // Inyectamos el MapService
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.loadMapa();
    this.loadData();
  }

  ngOnDestroy() {
    // Llamamos a destroyMap() cuando el componente se destruya
    this.mapService.destroyMap();
  }

  async loadData() {
    const userEmail = await this.storage.get('user');
    this.user = await this.storage.get('user');
    this.email = userEmail.email;
  }

  async ionViewDidEnter() {
    this.user = await this.storage.get('user');
    
    if (this.user) {
      console.log('Email del usuario:', this.user?.email); // Verificar que el email esté presente
    } else {
      console.log('No se encontraron datos del usuario.');
    }
  }

  goToBigMap() {
    this.router.navigate(['/bigmap']);
  }

  goTobitacora() {
    this.router.navigate(['/bitacora']);
  }

  goToMemories() {
    this.router.navigate(['/memories']);
  }

  async loadMapa() {
    try {
      // Obtener la ubicación del usuario
      const position = await this.mapService.getUserLocation();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Asegúrate de destruir el mapa existente antes de crear uno nuevo
      if (this.map) {
        this.mapService.destroyMap();
      }

      // Usar el servicio de mapa para cargar el mapa
      this.map = this.mapService.initializeMap('map', latitude, longitude);
    } catch (error) {
      console.error('Error al cargar la geolocalización:', error);
      alert(error || 'Hubo un problema al cargar los datos.');
    }
  }

  async onSignOutButtonPressed() {
    this.cancelAlertService.showAlert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      async () => {
        this.logoutUseCase.performLogout();
        this.router.navigate(['/splash']);
      },
      () => {}
    );
  }

  scrollToTop() {
    document.getElementById('main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    const scrollTop = event.target.scrollTop;
    this.isFabVisible = scrollTop > 100; // Aparecer cuando el scroll sea mayor a 100px
  }
}
