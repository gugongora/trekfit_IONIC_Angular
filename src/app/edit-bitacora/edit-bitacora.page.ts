import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Para acceder al ID de la URL
import { UserBitacoraService } from '../use-cases/user-bitacora-save';
import { UserBitacoraUpdateService } from '../use-cases/user-bitacora-update';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private userBitacoraService: UserBitacoraUpdateService,
    private userbitacora : UserBitacoraService,
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el ID de la bitácora de los parámetros de la URL
    this.activatedRoute.queryParams.subscribe(params => {
      this.bitacoraId = params['id'];
      this.loadBitacoraData(this.bitacoraId);
    });
  }

  // Cargar los datos de la bitácora a editar
  loadBitacoraData(id: string) {
    // Aquí deberías recuperar la bitácora de la base de datos usando el ID
    // Ejemplo de cómo podrías cargar la bitácora:
    this.userbitacora.getBitacoras().subscribe(bitacoras => {
      const bitacora = bitacoras.find(b => b.id === id);
      if (bitacora) {
        this.fecha = bitacora.fecha;
        this.latitud = bitacora.latitud;
        this.longitud = bitacora.longitud;
        this.descripcion = bitacora.descripcion;
        this.photoURL = bitacora.foto;
      }
    });
  }

  // Guardar los cambios de la bitácora
  saveChanges() {
    this.userBitacoraService.updateBitacora(
      this.bitacoraId,
      this.fecha,
      this.latitud,
      this.longitud,
      this.descripcion,
      this.photoURL
    ).then(result => {
      alert(result.message);  // Mostrar el mensaje de éxito o error
      this.router.navigate(['/memories']);  // Volver a la lista de bitácoras
    });
  }
}
