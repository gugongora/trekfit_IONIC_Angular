import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})

export class SessionManager {

    private readonly temporaryUserName: string = 'hola';
    private readonly temporaryPass: string = 'hola';
    private isLoggedIn: boolean = false;  // Variable para controlar el estado de login
    
    performLogin(user: string, password: string): boolean {
        if(user == this.temporaryUserName && password == this.temporaryPass) {
            this.isLoggedIn = true;
            return true;
        } else {
            return false;
        }  
    }



    performLogout(): void {
        this.isLoggedIn = false; // Invalidar la sesión
        // Aquí puedes limpiar cualquier otro dato de sesión o redirigir a la pantalla de login
        console.log('Usuario deslogueado');
    }

    isUserLoggedIn(): boolean {
        return this.isLoggedIn; // Método para verificar el estado de login
    }


        



}