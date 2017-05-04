import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  errorMsg: String = '';
  err: boolean = false;
  email: string = 'kkevgheny@gmail.com';
  password: string = 'Iamtheone1';


  constructor(public af: AngularFire, public router: Router) { }

  ngOnInit() {
  }


  login(){
    this.af.auth.login({
      email: this.email, password: this.password
    },{
      provider: AuthProviders.Password,
      method: AuthMethods.Password
    }).then(res => {
      this.err = false;
      this.router.navigate(['']);
    }).catch(err => {
      this.errorMsg = err.message;
      this.err = true;
    });
  }
}
