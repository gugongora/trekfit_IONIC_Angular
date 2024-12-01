import { Component, OnInit } from '@angular/core';
import { UserBitacoraService } from '../use-cases/user-bitacora-save';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserBitacoraDeleteUseCase } from '../use-cases/user-bitacora-delete';
import { StorageService } from 'src/managers/StorageService';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.page.html',
  styleUrls: ['./memories.page.scss'],
})
export class MemoriesPage implements OnInit {

  bitacoras$: Observable<any[]> = new Observable<any[]>();  // Observable para las bitácoras
  latitud: number = 0;
  longitud: number = 0;

  constructor(
    private userBitacoraUseCase: UserBitacoraService,
    private router: Router,
    private navController: NavController,
    private userdelete: UserBitacoraDeleteUseCase,
    private storageService: StorageService // Usamos StorageService para obtener el UID
  ) { }

  ngOnInit() {
    // Obtener el UID del usuario desde el StorageService
    this.loadUserBitacoras();
  }

  // Método para cargar las bitácoras del usuario
  async loadUserBitacoras() {
    const currentUser = await this.storageService.get('user'); // Obtener usuario actual desde Ionic Storage
    const uid = currentUser?.uid; // Obtener el UID del usuario

    if (uid) {
      // Si se obtiene el UID, pasamos el UID a getBitacoras para cargar las bitácoras
      this.bitacoras$ = this.userBitacoraUseCase.getBitacoras(uid);
    } else {
      // Si no se encuentra el UID, manejar el error (por ejemplo, redirigir a login o mostrar un mensaje)
      console.error('Usuario no autenticado');
      this.router.navigate(['/login']);
    }
  }

  goToBitacoraDetalle(latitud: number, longitud: number) {
    this.navController.navigateForward('/bigmap', {
      queryParams: {
        lat: latitud,
        lon: longitud
      }
    });
  }

  // Eliminar una bitácora
  async deleteBitacora(id: string) {
    const result = await this.userdelete.deleteBitacora(id);
    alert(result.message);  // Mostrar mensaje de éxito o error
    if (result.success) {
      // Recargar las bitácoras para reflejar el cambio
      this.loadUserBitacoras();  // Recargar las bitácoras después de eliminar
    }
  }

  // Redirigir a la página de edición de bitácora con el ID
  editBitacora(id: string) {
    this.router.navigate(['/edit-bitacora'], { queryParams: { id } });
  }

}
