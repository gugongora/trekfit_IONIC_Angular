import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserBitacoraUpdateService {

  constructor(private db: AngularFireDatabase) {}


async updateBitacora(
    id: string,
    fecha: string,
    latitud: number,
    longitud: number,
    descripcion: string,
    photoURL: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Creamos el objeto con los datos a actualizar
      const updatedBitacoraData = {
        fecha: fecha,
        latitud: latitud,
        longitud: longitud,
        descripcion: descripcion,
        foto: photoURL
      };

      // Usamos el método update() de Firebase para actualizar los datos de la bitácora
      await this.db.list('/bitacora').update(id, updatedBitacoraData);

      return {
        success: true,
        message: `Bitácora con ID: ${id} actualizada con éxito.`,
      };
    } catch (error: any) {
      let errorMessage = 'Ocurrió un error al actualizar la bitácora';
      return { success: false, message: errorMessage };
    }
  }
}