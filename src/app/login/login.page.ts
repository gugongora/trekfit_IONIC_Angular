import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionManager } from 'src/managers/SessionManager';
import { StorageService } from 'src/managers/StorageService';
import { UserLoginUseCase } from '../use-cases/user-login.use-case';
import { CancelAlertService } from 'src/managers/CancelAlertService';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router, 
    private sessionManager: SessionManager,
    private storageService: StorageService,
    private userlogin: UserLoginUseCase,
    private alert: CancelAlertService
  ) { }

    email: string = '';
    user: string = '';
    password: string = '';

  ngOnInit() { }

  async onLoginButtonPressed() {
    const result = await this.userlogin.performLogin(this.email, this.password);

    if (result.success) {
      this.alert.showAlert(
        'Login exitoso',
        'Has iniciado sesión correctamente.',
        () => {
          this.router.navigate(['/splash']); // Navegar a 'splash' cuando el usuario presiona "Aceptar"
        }
      );
    } else {
      this.alert.showAlert(
        'Error',
        result.message,
        () => {
          // Se puede agregar alguna lógica aquí si es necesario
        }
      );
    }
  }

  onRegisterButtonPressed() {
    this.router.navigate(['/registro']);
  }

}
 