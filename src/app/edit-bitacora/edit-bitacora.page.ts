import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database'; // Importar AngularFireDatabase
import { StorageService } from 'src/managers/StorageService'; // Importar StorageService
import { UserBitacoraUpdateService } from '../use-cases/user-bitacora-update';

// Definir la interfaz Bitacora
interface Bitacora {
  fecha: string;
  latitud: number;
  longitud: number;
  descripcion: string;
  foto?: string;
}

@Component({
  selector: 'app-edit-bitacora',
  templateUrl: './edit-bitacora.page.html',
  styleUrls: ['./edit-bitacora.page.scss']
})
export class EditBitacoraPage implements OnInit {
  bitacoraId: string = '';
  fecha: string = '';
  latitud: number = 0;
  longitud: number = 0;
  descripcion: string = '';
  photoURL: string = '';
  uid: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private db: AngularFireDatabase,  // Inyectar AngularFireDatabase
    private storageService: StorageService,  // Para acceder al UID
    private router: Router,
    private update: UserBitacoraUpdateService
  ) {}

  ngOnInit() {
    // Obtener el ID de la bitácora de los parámetros de la URL
    this.activatedRoute.queryParams.subscribe(params => {
      this.bitacoraId = params['id'];
      this.loadBitacoraData(this.bitacoraId);
    });
  }

  // Cargar los datos de la bitácora a editar
  async loadBitacoraData(id: string) {
    const currentUser = await this.storageService.get('user');
    this.uid = currentUser?.uid;

    if (this.uid) {
      // Obtener la referencia de la bitácora
      const bitacoraRef = this.db.object(`/users/${this.uid}/bitacoras/${id}`);
      bitacoraRef.snapshotChanges().subscribe(snapshot => {
        const bitacora = snapshot.payload.val() as Bitacora; // Aplicar el tipo Bitacora
        if (bitacora) {
          this.fecha = bitacora.fecha;
          this.latitud = bitacora.latitud;
          this.longitud = bitacora.longitud;
          this.descripcion = bitacora.descripcion;
          this.photoURL = bitacora.foto || ''; // Si no tiene foto, se asigna una cadena vacía
        }
      });
    } else {
      console.error('No hay usuario logueado');
    }
  }

  // Guardar los cambios de la bitácora
  saveChanges() {
    if (!this.uid) {
      alert('No se puede guardar los cambios, no hay usuario logueado');
      return;
    }

    // Aquí llamamos al servicio de actualización para guardar los cambios
    this.update.updateBitacora(
      this.bitacoraId,
      this.fecha,
      this.latitud,
      this.longitud,
      this.descripcion,
      this.photoURL
    ).then(result => {
      alert(result.message);  // Mostrar el mensaje de éxito o error
      if (result.success) {
        this.router.navigate(['/memories']);  // Volver a la lista de bitácoras
      }
    });
  }
}
