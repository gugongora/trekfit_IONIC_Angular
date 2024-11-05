import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class UserBitacoraUseCase {

  constructor(
    private db: AngularFireDatabase
  ) {}

  async performBitacoraSave(fecha: string, latitud: number, longitud: number, descripcion: string, photoURL: string ): Promise<{ success: boolean; message: string }> {
    try {

        const id2 = 1;

        // Crear objeto con los datos de la bitacora
        const bitacoraData = {
          id: id2,
          fecha: fecha,
          latitud: latitud,
          longitud: longitud,
          descripcion: descripcion,
          foto: photoURL
        };

        // Guarda la información del usuario en Realtime Database
        await this.db.object(`/users/${id2}`).set(bitacoraData);
      

      // Devuelve true si fue exitoso, con un mensaje
      return { success: true, message: "Usuario registrado con éxito" };

    } catch (error: any) {
      // Manejo de errores basado en el código de Firebase
      let errorMessage = 'Ocurrió un error al registrar el usuario';

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Este correo electrónico ya está en uso. Por favor, utiliza otro o inicia sesión.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'La dirección de correo electrónico no es válida.';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es muy débil.';
          break;
        default:
          errorMessage += ': ' + error.message;
          break;
      }

      // Devuelve false si hubo un error, junto con el mensaje de error
      return { success: false, message: errorMessage };
    }
  }
}
