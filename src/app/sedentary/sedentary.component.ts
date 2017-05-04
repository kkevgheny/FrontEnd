import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FitServiceService } from '../fit-service.service';

@Component({
  selector: 'app-sedentary',
  templateUrl: './sedentary.component.html',
  styleUrls: ['./sedentary.component.css']
})
export class SedentaryComponent implements OnInit {
  sedentaryUsers: Array<any> = [];
  constructor(public fService: FitServiceService, public router: Router) {

  }

  ngOnInit() {
    this.fService.getSedentaryUsers().subscribe(users => {
      this.sedentaryUsers = users;
    });
  }

  select(patient){
    this.fService.selectedPatient = patient;
    this.router.navigate(['profile']);
  }

}
