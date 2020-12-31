import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChartType, Column } from 'angular-google-charts';
import { GetSessionParams } from './models/get-session-params.model';

import { SessionsService } from './services/sessions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private readonly sessionsService: SessionsService,
    private readonly fb: FormBuilder,
  ) {}

  title = 'Active Sessions';
  type = ChartType.ColumnChart;

  data: [Date, number][];
  columns: Column[] = [
    { label: 'Time', type: 'date' },
    { label: 'Sessions', type: 'number' },
  ];

  options = {
    curveType: 'function',
  };

  loading = false;
  error: string;

  form = this.fb.group({
    company: [''],
    user: [''],
    interval: [''],
    start: [''],
    end: [''],
  });

  onLoad(): void {
    this.loading = true;
    this.error = null;
    this.form.disable();

    const { company, user, interval, start, end } = this.form.getRawValue();
    const params = new GetSessionParams();

    if (company) params.setCompany(company);
    if (user) params.setUser(user);
    if (interval) params.setInterval(interval);
    if (start) params.setDateStart(new Date(start));
    if (end) params.setDateEnd(new Date(end));

    this.sessionsService.get(params).subscribe((data) => {
      this.data = data;
      this.loading = false;
      this.form.enable();
    }, (error) => {
      this.error = JSON.stringify(error, null, 2);
      this.loading = false;
      this.form.enable();
    });
  }

}
