import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/interfaces/stock-information'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private currentUser: User;

  constructor(
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore
  ) { }

  async createNewUser(email: string, password: string, userName: string){

    var isSuccess = false;

    await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      cred => {
        //console.log(cred.user.uid)
        this.currentUser = {
          userName: userName,
          userId: cred.user.uid,
          userEmail: email,
          watchlist: ["VZ", "MSFT"]
        }
        this.afs.doc('users/'+cred.user.uid).set(this.currentUser);
        isSuccess = true;
      }
    ).catch(
      err => {
        return err.message
      }
    )

    return isSuccess;
    //await console.log(userCredential);
    
  }

  async login(email: string, password: string){

    var loginSuccess: boolean = true;

    await this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(
      err => {
        console.log(err.message);
        loginSuccess = false;
      }
    );

    return loginSuccess;
  }
}
