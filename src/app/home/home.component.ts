import { Component, OnInit } from '@angular/core';
import { FitServiceService } from '../fit-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sedentaryUsers: any = 0;
  errors: any = 0;

  usersCount: Number = 0;


  constructor(public fService: FitServiceService) { }

  ngOnInit() {

    this.fService.getUserErrors().subscribe(errors => {
      this.errors = errors;
      //console.log(errors);
    });
    this.fService.getSedentaryUsers().subscribe(users => {
      this.sedentaryUsers = users;
    });
    this.fService.listAllUsers().subscribe(users => {
      this.usersCount = users.length;
    });
  }

}
