import { Component, OnInit } from '@angular/core';
import { UserBitacoraService } from '../use-cases/user-bitacora-save';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserBitacoraDeleteUseCase } from '../use-cases/user-bitacora-delete';

@Component({
  selector: 'app-memories',
  templateUrl: './memories.page.html',
  styleUrls: ['./memories.page.scss'],
})
export class MemoriesPage implements OnInit {

  bitacoras$: Observable<any[]> = new Observable<any[]>(); // O puedes usar [] si prefieres un array vacío
  latitud: number = 0;
  longitud: number = 0;

  constructor(private userBitacoraUseCase: UserBitacoraService, private router: Router, private navController: NavController, private userdelete: UserBitacoraDeleteUseCase) { }

  ngOnInit() {
    this.bitacoras$ = this.userBitacoraUseCase.getBitacoras();

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
      this.userBitacoraUseCase.getBitacoras();
    }
  }


      // Redirigir a la página de edición de bitácora con el ID
  editBitacora(id: string) {
    this.router.navigate(['/edit-bitacora'], { queryParams: { id } });
  }

}
