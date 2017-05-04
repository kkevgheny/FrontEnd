import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FitServiceService } from '../fit-service.service';

declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  phone: string = '';
  email: string = '';
  operations: string ='';

  isImporting: boolean = false;

  importBtn: string = 'Import History';

  formToUpdate: {
    phone: string, email: string, operations: string
  } = { phone: '', email: '', operations: '' };
  fileGenerated: boolean = false;
  fileURL: string = '';
  START: string = '';
  END: string = '';
  patientData: Array<any> = [];
  excelData: Array<any> = [];
  patient: any = null;

  constructor(public fitService: FitServiceService) {}

  ngOnInit() {
    var weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    this.START = weekAgo.toISOString().substring(0, 10);
    this.getData();
    $('#dateRangeStart').calendar({
      type: 'date',
      onChange: (date, text, mode) => {
        this.START = date.toISOString().substring(0, 10);
        this.getData();
      }
    });
    $('#dateRangeEnd').calendar({
      type: 'date',
      onChange: (date, text, mode) => {
        this.END = date.toISOString().substring(0, 10);
        this.getData();
      }
    });
    this.patient = this.fitService.selectedPatient;
    this.email = this.formToUpdate.email = this.fitService.selectedPatient.email;
    this.phone = this.formToUpdate.phone = this.fitService.selectedPatient.phone;
    this.operations = this.formToUpdate.operations = this.fitService.selectedPatient.operations;
    
  }

  getData(){
    this.fitService.getPatientData(this.START, this.END).subscribe(data => {
      this.patientData = [];
      this.fitService.getLimits().subscribe(limits => {
        this.excelData = data;   
        if(data.length){
          data.forEach(day => {
            var err: any = {};
            if(day.calories < limits.calories)
              err.calories = {err: true, limit: limits.calories};
            if(day.steps < limits.steps)
              err.steps = {err: true, steps: limits.steps};
            if(day.distance * 1000 < limits.distance)
              err.distance = {err: true, distance: limits.distance};
            if(day.heart < limits.hmin || day.heart > limits.hmax)
              err.heart = {err: true};
            this.patientData.push({
              day: day, err: err
            });
          });
        }
      });
    });
  }

  generateExcel(){
    $('#generatebtn').addClass('loading');
    this.fitService.generateExcel(this.excelData).subscribe(res => {
      this.fileURL = '/api' + res.downLoadURL;
      this.fileGenerated = true;
      $('#generatebtn').removeClass('loading');
    });
  }


  openModal(){
    $('.ui.modal').modal('show');
  }
  updateProfile(){
    $('#saveBtn').addClass('loading');
    this.phone = this.formToUpdate.phone;
    this.email = this.formToUpdate.email;
    this.operations = this.formToUpdate.operations;
    this.fitService.updateProfile(this.formToUpdate.phone, this.formToUpdate.email, this.formToUpdate.operations).subscribe(res => {
      $('.ui.modal').modal('hide');
      $('#saveBtn').removeClass('loading');
    });
  }
  cancelUpd(){
    $('.ui.modal').modal('hide');
  }

  importHistory(){
    if(!this.isImporting){
      this.importBtn = 'Importing history...';
      this.isImporting = true;
      this.fitService.importHistory().subscribe(res =>{
        console.log(res);
        this.isImporting = false;
        this.importBtn = 'Import History';
        this.getData();
      });
    }
  }

  deleteData(){
    this.fitService.removePatientData().subscribe(() => {
      this.getData();
    });
  }

}
