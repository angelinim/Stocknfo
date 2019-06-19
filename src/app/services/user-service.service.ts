import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

interface User{
  userName: String;
  userId: String;
  userEmail: String;
  watchlist?: [];
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  currentUser: User;

  constructor(
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore
  ) { }

  createNewUser(email: string, password: string){
    const userCredential = this.afAuth.auth.createUserWithEmailAndPassword(email, password).catch(
      err=> console.log("ERROR: "+ err.message)
    );

    
  }

  updateUserData(cred){
    //TODO add user information using user.uid to add to firestore
  }
}
