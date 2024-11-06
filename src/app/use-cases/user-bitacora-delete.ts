import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root',
})
export class UserBitacoraDeleteUseCase {

  constructor(
    private db: AngularFireDatabase
  ) {}



// Borrar una bitácora dada su ID
async deleteBitacora(id: string): Promise<{ success: boolean; message: string }> {
    try {
      // Referencia a la bitácora a borrar
      const bitacoraRef = this.db.list('/bitacora').remove(id);

      // Esperar a que Firebase complete la eliminación
      await bitacoraRef;

      // Mensaje de éxito si la eliminación fue exitosa
      return {
        success: true,
        message: `Bitácora con ID: ${id} eliminada con éxito.`,
      };
    } catch (error: any) {
      let errorMessage = 'Ocurrió un error al intentar eliminar la bitácora';
      return { success: false, message: errorMessage };
    }
  }
}