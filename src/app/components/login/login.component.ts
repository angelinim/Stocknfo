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

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      regUname: new FormControl(),
      regPass: new FormControl(),
      regPassConf: new FormControl(),
      regEmail: new FormControl()
    });

    this.loginForm = new FormGroup({
      logUname: new FormControl(),
      logPass: new FormControl()
    });
  }

  onSubmitRegistration(){
    const newUser = this.registrationForm.value;
    const pass = newUser.regPass;
    const passConf = newUser.regPassConf;
    const email = newUser.regEmail;

    console.log(newUser);

    if(pass === passConf && email){
      this.userService.createNewUser(newUser.regEmail, newUser.regPass);
    }
    else{
      alert("error");
    }
    

  }

  onSubmitLogin(){
    console.log(this.loginForm);
  }
}
