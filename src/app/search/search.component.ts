import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FitServiceService } from '../fit-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  notFound: boolean = false;
  isSearching: boolean = false;
  searchResults: Array<any> = [];

  constructor(public fitService: FitServiceService, public router: Router) { }

  ngOnInit() {
  }


  search(name: string){
    if(name.length > 2){
      this.isSearching = true;
      this.notFound = false;
      this.searchResults = [];
      this.fitService.search(name).subscribe(patients => {
        this.searchResults = patients;
        this.isSearching = false;
        if(!patients.length)
          this.notFound = true;
      });
    }
  }

  select(patient){
    this.fitService.selectedPatient = patient;
    this.router.navigate(['profile']);
  }

}
