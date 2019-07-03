import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private registrationForm: FormGroup;
  private loginForm: FormGroup;
  public registrationMessage: string;

  constructor(private userService: UserServiceService,
              public snackbar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      regUname: new FormControl(),
      regPass: new FormControl(),
      regPassConf: new FormControl(),
      regEmail: new FormControl()
    });

    this.loginForm = new FormGroup({
      logEmail: new FormControl(),
      logPass: new FormControl()
    });
  }

  onSubmitRegistration(){
    const newUser = this.registrationForm.value;
    const pass = newUser.regPass;
    const passConf = newUser.regPassConf;
    const email = newUser.regEmail;
    const uname = newUser.regUname;

    if(pass === passConf && email && uname){
      this.userService.createNewUser(newUser.regEmail, newUser.regPass, newUser.regUname).then(
        response => {
          if(response.isSuccess){
            this.router.navigate(['main/home']);
            this.snackbar.open(response.message,"",{duration: 4000});
          }
          else{
            this.snackbar.open(response.message,"",{duration: 4000});
          }
        }
      );
    }
    else{
      this.snackbar.open("error... Make sure passwords match and all fields are filled in", "", { duration: 4000} )
    }
    

  }

  onSubmitLogin(){
    const newUser = this.loginForm.value;
    const email = newUser.logEmail;
    const pass = newUser.logPass;

    if(email && pass){
      this.userService.login(email, pass).then(
        response => {
          if(response.isSuccess){
            this.router.navigate(['main/watchlist']);
            this.snackbar.open(response.message,"",{duration: 4000});
          }
          else{
            this.snackbar.open(response.message);
          }
        }
      );
    }
    else{
      this.snackbar.open("please enter valid Email and password...", "", { duration: 4000} )
    }
  }
}
