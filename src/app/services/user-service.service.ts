import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User, DBresponse } from 'src/app/interfaces/stock-information'

import { Observable, of } from 'rxjs';
import { switchMap, share, take, map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  currentUser$: Observable<User>;
  public dbInteractionInformation: DBresponse;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private zone: NgZone) {

      this.currentUser$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if(user){
            console.log("logged in")
            return this.afs.doc<User>('users/'+user.uid).valueChanges();
          }
          else{
            console.log("logged out")
            return of (null);
          }
        })
      );

  }

  async createNewUser(email: string, password: string, userName: string){

    await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      cred => {
        //console.log(cred.user.uid)
        const data = {
          userName: userName,
          userId: cred.user.uid,
          userEmail: email,
          watchlist: ["vz", "msft"]
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
    
  }

  login(email: string, password: string){

    this.zone.runOutsideAngular(async () =>{
      await this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(
        () =>{
          this.zone.run(() => this.router.navigate(['main/watchlist']));
        }
      ).catch(
        err => {
          console.log(err.message);
        }
      );
    });


  }

  //takes a string new stock symbol and returns a database response
  async addToWatchlist(newStockSymbol: string): Promise<DBresponse>{
    var uid: string;

    //gets the current user's id to navigate to their specific
    //user document in the user collerction in firebase
    await this.afAuth.user.subscribe(x => uid = x.uid);
    
    this.afs.collection('users').doc(uid).update({"watchlist": firebase.firestore.FieldValue.arrayUnion(newStockSymbol)}).catch(
      err =>{ //error handling if the array union fails
        this.dbInteractionInformation ={
          isSuccess: false,
          message: err.message
        }
        return this.dbInteractionInformation;
      }
    );

    return this.dbInteractionInformation ={ isSuccess: true, message: "added to watchlist"};
  }

  async removeFromWatchlist(symbolToRemove: string){
    var uid: string;

    await this.afAuth.user.subscribe(x => uid = x.uid);

    this.afs.collection('users').doc(uid).update({"watchlist": firebase.firestore.FieldValue.arrayRemove(symbolToRemove)}).catch(
      err => {
        this.dbInteractionInformation ={
          isSuccess: false,
          message: err.message
        }
        return this.dbInteractionInformation;
      }
    );

    return this.dbInteractionInformation ={ isSuccess: true, message: "removed from watchlist"};
  }

  async logout(){
    await this.afAuth.auth.signOut();
    this.router.navigate(['main/login']);
    this.currentUser$.subscribe(me=>console.log(me));
  }
}
