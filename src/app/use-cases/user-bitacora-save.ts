import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from 'src/managers/StorageService'; // Asegúrate de que StorageService esté correctamente importado

@Injectable({
  providedIn: 'root',
})
export class UserBitacoraService {
  constructor(
    private db: AngularFireDatabase,
    private storageService: StorageService // Usamos StorageService para obtener el UID
  ) {}

  // Obtener las bitácoras de un usuario específico
  getBitacoras(usuarioId: string): Observable<any[]> {
    return this.db
      .list(`/users/${usuarioId}/bitacoras`)
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({
            id: c.payload.key,
            ...c.payload.val() as object,
          }))
        )
      );
  }

  // Guardar una nueva bitácora para el usuario logueado
  async performBitacoraSave(
    fecha: string,
    latitud: number,
    longitud: number,
    descripcion: string,
    photoURL: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Obtener el usuario actual desde Ionic Storage
      const currentUser = await this.storageService.get('user');
      const uid = currentUser?.uid; // Obtener el UID del usuario

      if (!uid) {
        // Si no se encuentra el UID, significa que no hay usuario autenticado
        return { success: false, message: 'Usuario no autenticado' };
      }

      // Crear el objeto de la bitácora
      const bitacoraData = {
        fecha,
        latitud,
        longitud,
        descripcion,
        foto: photoURL,
      };

      // Guardar la bitácora bajo la ruta del usuario
      const newBitacoraRef = this.db
        .list(`/users/${uid}/bitacoras`)
        .push(bitacoraData);

      // Obtener el ID generado por Firebase
      const newId = newBitacoraRef.key;

      return {
        success: true,
        message: `Bitácora registrada con éxito. ID: ${newId}`,
      };
    } catch (error: any) {
      console.error('Error al guardar la bitácora: ', error);
      return { success: false, message: 'Ocurrió un error al registrar la bitácora' };
    }
  }
}
