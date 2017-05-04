import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FitServiceService {

  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });
  API_URL = 'http://fitness-watcher.webify.tech/api';

  selectedPatient: any = {};

  constructor(public http: Http) { }

  listAllUsers(){
    return this.http.get(this.API_URL + '/listAllUsers').map(res => res.json());
  }

  search(patientName: string){
    return this.http.post(this.API_URL + '/searchByName', { name: patientName }, this.options).map(res => res.json());
  }

  getPatientData(start: string, end: string){
    return this.http.post(this.API_URL + '/userData/' + this.selectedPatient.fitbitID, {start: start, end: end}, this.options).map(res => res.json());
  }

  generateExcel(data){
    return this.http.post(this.API_URL + '/generate' , {
       name: this.selectedPatient.name, fitbitID: this.selectedPatient.fitbitID, data: data
    }, this.options).map(res => res.json());
  }

  updateProfile(phone, email, operations){
    return this.http.post(this.API_URL + '/updateProfile', {
      phone: phone, email: email, operations: operations, fitbitID: this.selectedPatient.fitbitID
    }, this.options).map(res => res.json());
  }

  getCronStatus(){
    return this.http.get(this.API_URL + '/CRON_STATUS').map(res => res.json());
  }

  updateLimits(calories, steps, distance, hmin, hmax){
    return this.http.post(this.API_URL + '/modifyLimits', {
      calories: calories, steps: steps, distance: distance, hmin: hmin, hmax: hmax
    }, this.options).map(res => res.json());
  }
  getLimits(){
    return this.http.get(this.API_URL + '/getLimits').map(res => res.json());
  }

  importHistory(){
    return this.http.post(this.API_URL + '/importHistory', {
      fitbitID: this.selectedPatient.fitbitID
    }, this.options).map(res => res.json());
  }

  updatePeriod(period, cron_period){
    return this.http.post(this.API_URL + '/setPeriod', {
      period: period, cron_p: cron_period
    }, this.options).map(res => res.json());
  }

  removePatientData(){
    return this.http.get(this.API_URL + '/danger/deleteData/' + this.selectedPatient.fitbitID).map(res => res.json());
  }

  getUserErrors(){
    return this.http.get(this.API_URL + '/UserErrors').map(res => res.json());
  }
  getSedentaryUsers(){
    return this.http.get(this.API_URL + '/SedentaryUsers').map(res => res.json());
  }

}
