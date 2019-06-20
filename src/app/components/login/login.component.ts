import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private registrationForm: FormGroup;
  private loginForm: FormGroup;
  public registrationMessage: string;

  constructor(private userService: UserServiceService) { }

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
      if(this.userService.createNewUser(newUser.regEmail, newUser.regPass, newUser.regUname)){
        alert("account created successfully");
      }
      else{
        alert("error creating account");
      }
    }
    else{
      alert("error creating account");
    }
    

  }

  onSubmitLogin(){
    const newUser = this.loginForm.value;
    const email = newUser.logEmail;
    const pass = newUser.logPass;

    if(email && pass){
      if(this.userService.login(email, pass)){
        alert("login success")
      }
      else{
        alert("failed to log in")
      }
    }
    else{
      alert("please enter valid Email and password...")
    }
  }
}
