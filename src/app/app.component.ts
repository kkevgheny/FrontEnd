import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: any = null;
  
  constructor(public af: AngularFire, public router: Router){}

  ngOnInit(){
    this.af.auth.subscribe(user => {
      if(user){
        this.user = user;
      }
      else{
        this.user = null;
        this.router.navigate(['auth']);
      }
    });


  }

  logout(){
    this.af.auth.logout().then(() => {
      this.router.navigate(['']);
    });
  }
}
