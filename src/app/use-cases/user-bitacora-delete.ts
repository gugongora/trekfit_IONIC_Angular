import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { StorageService } from 'src/managers/StorageService'; // Importar StorageService

@Injectable({
  providedIn: 'root',
})
export class UserBitacoraDeleteUseCase {

  constructor(
    private db: AngularFireDatabase,
    private storageService: StorageService  // Usamos StorageService para obtener el UID del usuario
  ) {}

  // Borrar una bitácora dada su ID
  async deleteBitacora(id: string): Promise<{ success: boolean; message: string }> {
    try {
      // Obtener el usuario actual desde StorageService
      const currentUser = await this.storageService.get('user');
      const uid = currentUser?.uid;

      if (!uid) {
        // Si no hay un usuario logueado, retornar un error
        return { success: false, message: 'Usuario no autenticado' };
      }

      // Referencia a la bitácora específica del usuario
      const bitacoraRef = this.db.list(`/users/${uid}/bitacoras`).remove(id);

      // Esperar a que Firebase complete la eliminación
      await bitacoraRef;

      // Mensaje de éxito si la eliminación fue exitosa
      return {
        success: true,
        message: `Bitácora con ID: ${id} eliminada con éxito.`,
      };
    } catch (error: any) {
      console.error('Error al eliminar la bitácora:', error);
      return { success: false, message: 'Ocurrió un error al intentar eliminar la bitácora' };
    }
  }
}
