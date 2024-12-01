import { Injectable } from '@angular/core'

import firebase from 'firebase/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@Injectable({
    providedIn: 'root',
})

export class SessionManager {

    constructor(public fireAuth: AngularFireAuth){}



    async registerUserWith(email: string, password: string) : Promise<any> {
        return await this.fireAuth.createUserWithEmailAndPassword(email, password)
    }
    
    async loginWith(email: string, password:string) : Promise<any> {
        return await this.fireAuth.signInWithEmailAndPassword(email, password)
    }


    async resetPassword(email: string) {
        return await this.fireAuth.sendPasswordResetEmail(email)
    }

    async getProfile() {
        return await this.fireAuth.currentUser
    }

    async signOut() {
        return await this.fireAuth.signOut()
    }





}