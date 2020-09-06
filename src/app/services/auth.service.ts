// import { Injectable } from '@angular/core';
// import {AngularFireAuth} from '@angular/fire/auth';
// import { User } from '../classes/user.class';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   public isLogged: any = false;
//   constructor(public afAuth: AngularFireAuth) {
//     afAuth.authState.subscribe(user => (this.isLogged = user));
//    }


//    //Login
//    async onLogin(user:User){
//      try{
//        return await this.afAuth.auth.signInWithEmailAndPassword(user.correo,user.contrasena);
//      }
//      catch(err)
//      {
//       throw err.code;
//     }
//   }

//    //Register
//    async onRegister (user:User){
//      try{
//       return await this.afAuth.auth.createUserWithEmailAndPassword(user.correo,user.contrasena);
//      }
//      catch(err)
//      {
//        console.log('Error on register',err);
//      }
//    }
// }
