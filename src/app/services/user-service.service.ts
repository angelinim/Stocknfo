import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/interfaces/stock-information'

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  currentUser: User;

  constructor(
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore
  ) { }

  createNewUser(email: string, password: string, userName: string){
    
    
    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      cred => {
        //console.log(cred.user.uid)
        this.currentUser = {
          userName: userName,
          userId: cred.user.uid,
          userEmail: email,
          watchlist: ["VZ", "MSFT"]
        }
        this.afs.doc('users/'+cred.user.uid).set(this.currentUser);
      }
    ).catch(
      err => {
        return err.message
      }
    )

    //await console.log(userCredential);
    
  }
}
