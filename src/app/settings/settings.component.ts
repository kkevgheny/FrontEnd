import { Component, OnInit } from '@angular/core';
import { FitServiceService } from '../fit-service.service';

declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  period: string = '';
  cron_period: string = '';
  hmin: Number = 0;
  hmax: Number = 0;
  calories: Number = 0;
  distance: number = 0;
  steps: Number = 0;

  constructor(public fService: FitServiceService) { }

  ngOnInit() {
    this.fService.getLimits().subscribe(limit => {
      this.hmin = limit.hmin;
      this.hmax = limit.hmax;
      this.calories = limit.calories;
      this.steps = limit.steps;
      this.distance = limit.distance;
      this.period = limit.period;
      this.cron_period = limit.CRON_FETCH_PERIOD;
      $('#p').dropdown('set selected', limit.period);
      $('#crP').dropdown('set selected', limit.CRON_FETCH_PERIOD);
    });
  }
  updatePeriod(){
    $('#period').addClass('loading');
    this.fService.updatePeriod(this.period, this.cron_period).subscribe(() =>{
      $('#period').removeClass('loading');
    });
  }
  updateLimits(){
    $('#limits').addClass('loading');
    this.fService.updateLimits(this.calories, this.steps, this.distance, this.hmin, this.hmax).subscribe(() => {
      $('#limits').removeClass('loading');
    });
  }

}
