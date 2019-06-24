import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User, DBresponse } from 'src/app/interfaces/stock-information'

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  currentUser$: Observable<User>;
  public dbInteractionInformation: DBresponse;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

      this.currentUser$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if(user){
            return this.afs.doc<User>('users/'+user.uid).valueChanges();
          }
          else{
            return of (null);
          }
        })
      );


    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    }

  async createNewUser(email: string, password: string, userName: string){

    await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      cred => {
        //console.log(cred.user.uid)
        const data = {
          userName: userName,
          userId: cred.user.uid,
          userEmail: email,
          watchlist: ["VZ", "MSFT"]
        }
        
        this.afs.doc('users/'+cred.user.uid).set(data);
        this.dbInteractionInformation ={
          isSuccess: true,
          message: "account created successfully"
        }
      }
    ).catch(
      err => {
        this.dbInteractionInformation ={
          isSuccess: false,
          message: err.message
        }
        
      }
    )

    console.log(this.currentUser$);
    return this.dbInteractionInformation;
    //await console.log(userCredential);
    
  }

  async login(email: string, password: string){

    await this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      cred =>{
        this.currentUser$ = this.afs.doc<User>('users/'+cred.user.uid).valueChanges();
        this.dbInteractionInformation ={
          isSuccess: true,
          message: "Log in Successful... Welcome Back"
        }
      }
    ).catch(
      err => {
        console.log(err.message);
        this.dbInteractionInformation ={
          isSuccess: false,
          message: err.message
        }
      }
    );
    return this.dbInteractionInformation;
  }


  async logout(){
    await this.afAuth.auth.signOut();
    this.router.navigate(['main/login']);
    this.currentUser$.subscribe(me=>console.log(me));
  }
}
