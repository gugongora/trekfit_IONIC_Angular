import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { StorageService } from 'src/managers/StorageService'; // Asegúrate de importar StorageService

@Injectable({
  providedIn: 'root',
})
export class UserBitacoraUpdateService {

  constructor(
    private db: AngularFireDatabase,
    private storageService: StorageService  // Usamos StorageService para obtener el UID del usuario
  ) {}

  async updateBitacora(
    id: string,           // ID de la bitácora a actualizar
    fecha: string,        // Fecha de la bitácora
    latitud: number,      // Latitud
    longitud: number,     // Longitud
    descripcion: string,  // Descripción de la bitácora
    photoURL: string      // URL de la foto (si existe)
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Obtener el usuario actual desde StorageService
      const currentUser = await this.storageService.get('user');
      const uid = currentUser?.uid;

      if (!uid) {
        // Si no hay un usuario logueado, retornar un error
        return { success: false, message: 'Usuario no autenticado' };
      }

      // Crear el objeto de la bitácora con los nuevos datos
      const updatedBitacoraData = {
        fecha: fecha,
        latitud: latitud,
        longitud: longitud,
        descripcion: descripcion,
        foto: photoURL,
      };

      // Usar la referencia a la base de datos para actualizar la bitácora del usuario
      await this.db
        .list(`/users/${uid}/bitacoras`)  // Ruta del usuario y sus bitácoras
        .update(id, updatedBitacoraData); // Actualizar la bitácora con el ID correspondiente

      return {
        success: true,
        message: `Bitácora con ID: ${id} actualizada con éxito.`,
      };
    } catch (error: any) {
      console.error('Error al actualizar la bitácora:', error);
      return { success: false, message: 'Ocurrió un error al actualizar la bitácora' };
    }
  }
}
