import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from 'src/managers/StorageService';

@Injectable({
  providedIn: 'root',
})
export class UserBitacoraService {

  constructor(private db: AngularFireDatabase, storageService: StorageService) {}

  // Obtener las bitácoras con su id
  getBitacoras(): Observable<any[]> {
    return this.db.list('/users/').snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ 
          id: c.payload.key,  // La clave de Firebase (id de la bitácora)
          ...c.payload.val() as object  // El resto de los datos de la bitácora
        }))
      )
    );
  }

  // Guardar una nueva bitácora
  async performBitacoraSave(
    fecha: string,
    latitud: number,
    longitud: number,
    descripcion: string,
    photoURL: string
  ): Promise<{ success: boolean; message: string }> {
    try {

      // Creamos el objeto de la bitácora con los datos
      const bitacoraData = {
        fecha: fecha,
        latitud: latitud,
        longitud: longitud,
        descripcion: descripcion,
        foto: photoURL
      };

      // Usamos push() para crear un nuevo ID automáticamente
      const newBitacoraRef = this.db.list('/bitacora').push(bitacoraData);

      // Después de guardar la bitácora, obtenemos el ID generado por Firebase
      const newId = newBitacoraRef.key;

      // Si el ID se ha generado correctamente, devuelve el mensaje de éxito
      return {
        success: true,
        message: `Bitácora registrada con éxito. ID: ${newId}`,
      };
    } catch (error: any) {
      let errorMessage = 'Ocurrió un error al registrar la bitácora';
      return { success: false, message: errorMessage };
    }
  }
}
